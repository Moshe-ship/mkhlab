import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";

/**
 * مخلب Telegram Channel
 *
 * Unlike WhatsApp, Telegram has no restrictions on AI bots.
 * All 20+ مخلب skills are available via Telegram.
 *
 * Supports both webhook and long-polling modes.
 */

const TELEGRAM_API = "https://api.telegram.org/bot";

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: { id: number; first_name: string; language_code?: string };
    chat: { id: number; type: "private" | "group" | "supergroup" };
    text?: string;
    date: number;
  };
}

interface TelegramAccount {
  botToken: string;
  webhookUrl?: string;
  allowedUsers?: number[];
}

async function sendTelegramMessage(
  token: string,
  chatId: number,
  text: string
): Promise<boolean> {
  // Telegram max message length is 4096
  const chunks: string[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    chunks.push(remaining.slice(0, 4096));
    remaining = remaining.slice(4096);
  }

  for (const chunk of chunks) {
    const res = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: chunk,
        parse_mode: "Markdown",
      }),
    });
    if (!res.ok) return false;
  }
  return true;
}

const telegramChannel = {
  id: "mkhlab-telegram",

  meta: {
    id: "mkhlab-telegram",
    label: "Telegram (مخلب)",
    selectionLabel: "مخلب Telegram",
    docsPath: "channels/mkhlab-telegram",
    blurb: "All Arabic AI skills via Telegram bot — no restrictions.",
    aliases: ["tg", "telegram", "تلغرام", "تليغرام"],
    order: 101,
  },

  capabilities: {
    chatTypes: ["direct", "group"] as ("direct" | "group")[],
    media: {
      maxSizeBytes: 50 * 1024 * 1024, // 50MB
      supportedTypes: [
        "image/jpeg",
        "image/png",
        "audio/ogg",
        "audio/mp3",
        "application/pdf",
      ],
    },
    supports: {
      threads: true,
      reactions: true,
      edits: true,
      deletions: true,
      mentions: true,
      formatting: true, // Markdown
      voice: true,
      video: true,
    },
  },

  config: {
    listAccountIds(cfg: Record<string, unknown>): string[] {
      const channels = cfg.channels as Record<string, unknown> | undefined;
      if (!channels) return [];
      const tg = channels["mkhlab-telegram"] as
        | { accounts?: Record<string, unknown> }
        | undefined;
      if (!tg?.accounts) return [];
      return Object.keys(tg.accounts);
    },

    resolveAccount(
      cfg: Record<string, unknown>,
      accountId = "default"
    ): TelegramAccount {
      const channels = cfg.channels as Record<string, Record<string, unknown>>;
      const tg = channels?.["mkhlab-telegram"] as {
        accounts: Record<string, TelegramAccount>;
      };
      return tg.accounts[accountId];
    },
  },

  outbound: {
    deliveryMode: "direct" as const,
    textChunkLimit: 4096,

    async sendText(ctx: {
      cfg: TelegramAccount;
      to: string;
      text: string;
      accountId: string;
    }) {
      const ok = await sendTelegramMessage(
        ctx.cfg.botToken,
        parseInt(ctx.to),
        ctx.text
      );
      return { ok };
    },
  },

  gateway: {
    async start(
      account: { accountId: string; cfg: TelegramAccount },
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

      if (cfg.webhookUrl) {
        // Webhook mode — set up Express server
        const express = (await import("express")).default;
        const app = express();
        app.use(express.json());

        app.post("/telegram", (req, res) => {
          res.sendStatus(200);
          const update = req.body as TelegramUpdate;
          if (!update.message?.text) return;

          const userId = update.message.from.id;
          if (
            cfg.allowedUsers?.length &&
            !cfg.allowedUsers.includes(userId)
          ) {
            return;
          }

          onMessage({
            senderId: String(update.message.chat.id),
            text: update.message.text,
            messageId: String(update.message.message_id),
            channelId: "mkhlab-telegram",
          });
        });

        // Register webhook with Telegram
        await fetch(
          `${TELEGRAM_API}${cfg.botToken}/setWebhook`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: `${cfg.webhookUrl}/telegram` }),
          }
        );

        const server = app.listen(3002, () => {
          logger.info("مخلب Telegram webhook listening on port 3002");
          onReady();
        });

        await new Promise<void>((resolve) => {
          if (ctx.abortSignal.aborted) { resolve(); return; }
          ctx.abortSignal.addEventListener("abort", () => {
            server.close();
            resolve();
          }, { once: true });
        });
      } else {
        // Long-polling mode — no public URL needed
        logger.info("مخلب Telegram starting in polling mode");
        onReady();

        let offset = 0;
        while (!ctx.abortSignal.aborted) {
          try {
            const res = await fetch(
              `${TELEGRAM_API}${cfg.botToken}/getUpdates?offset=${offset}&timeout=30`,
              { signal: ctx.abortSignal }
            );
            const data = await res.json();

            for (const update of data.result || []) {
              offset = update.update_id + 1;
              if (!update.message?.text) continue;

              const userId = update.message.from.id;
              if (
                cfg.allowedUsers?.length &&
                !cfg.allowedUsers.includes(userId)
              ) {
                continue;
              }

              onMessage({
                senderId: String(update.message.chat.id),
                text: update.message.text,
                messageId: String(update.message.message_id),
                channelId: "mkhlab-telegram",
              });
            }
          } catch (err) {
            if (ctx.abortSignal.aborted) break;
            logger.error(`Polling error: ${err}`);
            await new Promise((r) => setTimeout(r, 5000));
          }
        }

        logger.info("مخلب Telegram channel shut down");
      }
    },
  },
};

export default definePluginEntry({
  id: "mkhlab-telegram",
  name: "مخلب Telegram Channel",
  register(api) {
    api.registerChannel({ plugin: telegramChannel });
  },
});
