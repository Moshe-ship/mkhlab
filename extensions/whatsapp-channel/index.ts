import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import type { WhatsAppWebhookPayload, WhatsAppAccount } from "./src/types.js";
import { sendText, sendMedia } from "./src/outbound.js";
import {
  detectIntent,
  getHelpMessage,
  getGreetingMessage,
} from "./src/router.js";

/**
 * مخلب WhatsApp Channel Plugin
 *
 * Implements the OpenClaw ChannelPlugin interface for WhatsApp Cloud API.
 * Scoped service bot (per Meta's Jan 2026 policy):
 * - Prayer times, Hijri calendar, Quran search, Hadith, Translation
 *
 * NOT a general-purpose AI chatbot.
 */

let pluginRuntime: unknown = null;
export function setRuntime(runtime: unknown) {
  pluginRuntime = runtime;
}
export function getRuntime() {
  return pluginRuntime;
}

const whatsappChannel = {
  id: "mkhlab-whatsapp",

  meta: {
    id: "mkhlab-whatsapp",
    label: "WhatsApp (مخلب)",
    selectionLabel: "مخلب WhatsApp",
    docsPath: "channels/mkhlab-whatsapp",
    blurb:
      "Arabic AI skills via WhatsApp Business API — prayer times, Hijri calendar, Quran, translation.",
    aliases: ["wa", "whatsapp", "واتساب", "واتس"],
    order: 100,
  },

  capabilities: {
    chatTypes: ["direct"] as ("direct" | "group")[],
    media: {
      maxSizeBytes: 16 * 1024 * 1024, // 16MB
      supportedTypes: ["image/jpeg", "image/png", "audio/ogg", "audio/mp3"],
    },
    supports: {
      threads: false,
      reactions: true,
      edits: false,
      deletions: false,
      mentions: false,
      formatting: true, // WhatsApp supports *bold* _italic_ ~strike~
      voice: true,
      video: false,
    },
  },

  config: {
    listAccountIds(cfg: Record<string, unknown>): string[] {
      const channels = cfg.channels as Record<string, unknown> | undefined;
      if (!channels) return [];
      const wa = channels["mkhlab-whatsapp"] as
        | { accounts?: Record<string, unknown> }
        | undefined;
      if (!wa?.accounts) return [];
      return Object.keys(wa.accounts);
    },

    resolveAccount(
      cfg: Record<string, unknown>,
      accountId = "default"
    ): WhatsAppAccount {
      const channels = cfg.channels as Record<string, Record<string, unknown>>;
      const wa = channels?.["mkhlab-whatsapp"] as {
        accounts: Record<string, WhatsAppAccount>;
      };
      return wa.accounts[accountId];
    },
  },

  outbound: {
    deliveryMode: "direct" as const,
    textChunkLimit: 4096,

    async sendText(ctx: {
      cfg: WhatsAppAccount;
      to: string;
      text: string;
      accountId: string;
    }) {
      return sendText(ctx);
    },

    async sendMedia(ctx: {
      cfg: WhatsAppAccount;
      to: string;
      mediaUrl: string;
      accountId: string;
    }) {
      return sendMedia({ ...ctx, mediaType: "image" });
    },
  },

  gateway: {
    async start(
      account: { accountId: string; cfg: WhatsAppAccount },
      deps: {
        logger: { info: (msg: string) => void; error: (msg: string) => void };
        onReady: () => void;
        onMessage: (msg: {
          senderId: string;
          text: string;
          messageId: string;
          channelId: string;
        }) => void;
        ctx: { abortSignal: AbortSignal };
      }
    ) {
      const { cfg } = account;
      const { logger, onReady, onMessage, ctx } = deps;
      const port = cfg.webhookPort || 3001;

      // Dynamic import express to avoid bundling issues
      const express = (await import("express")).default;
      const app = express();
      app.use(express.json());

      // GET — Meta webhook verification
      app.get("/webhook", (req, res) => {
        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (mode === "subscribe" && token === cfg.verifyToken) {
          logger.info("Webhook verified");
          res.status(200).send(challenge);
        } else {
          res.sendStatus(403);
        }
      });

      // POST — incoming messages
      app.post("/webhook", (req, res) => {
        const payload = req.body as WhatsAppWebhookPayload;

        // Always respond 200 quickly (Meta requires <5s)
        res.sendStatus(200);

        if (payload.object !== "whatsapp_business_account") return;

        for (const entry of payload.entry) {
          for (const change of entry.changes) {
            const messages = change.value.messages;
            if (!messages) continue;

            for (const msg of messages) {
              if (msg.type !== "text" || !msg.text) continue;

              const intent = detectIntent(msg.text.body);

              // Handle greeting and help locally (no agent needed)
              if (intent === "greeting") {
                sendText({
                  cfg,
                  to: msg.from,
                  text: getGreetingMessage(),
                });
                continue;
              }

              if (intent === "help" || intent === "unknown") {
                sendText({
                  cfg,
                  to: msg.from,
                  text: getHelpMessage(),
                });
                continue;
              }

              // Route to OpenClaw agent for skill-backed intents
              onMessage({
                senderId: msg.from,
                text: msg.text.body,
                messageId: msg.id,
                channelId: "mkhlab-whatsapp",
              });
            }
          }
        }
      });

      // Health check
      app.get("/health", (_req, res) => {
        res.json({ status: "ok", channel: "مخلب WhatsApp", port });
      });

      const server = app.listen(port, () => {
        logger.info(`مخلب WhatsApp webhook listening on port ${port}`);
        onReady();
      });

      // CRITICAL: Keep promise pending until abort signal fires
      // If this resolves early, OpenClaw enters restart loop
      await new Promise<void>((resolve) => {
        if (ctx.abortSignal.aborted) {
          resolve();
          return;
        }
        ctx.abortSignal.addEventListener(
          "abort",
          () => {
            server.close();
            logger.info("مخلب WhatsApp channel shut down");
            resolve();
          },
          { once: true }
        );
      });
    },
  },
};

export default definePluginEntry({
  id: "mkhlab-whatsapp",
  name: "مخلب WhatsApp Channel",
  register(api) {
    setRuntime(api.runtime);
    api.registerChannel({ plugin: whatsappChannel });
  },
});
