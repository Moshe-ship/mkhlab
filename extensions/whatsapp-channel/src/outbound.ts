import type { WhatsAppAccount, WhatsAppSendResult } from "./types.js";

const GRAPH_API = "https://graph.facebook.com/v21.0";
const MAX_TEXT_LENGTH = 4096;

function truncate(text: string): string {
  if (text.length <= MAX_TEXT_LENGTH) return text;
  return text.slice(0, MAX_TEXT_LENGTH - 4) + "\n...";
}

export async function sendText(ctx: {
  cfg: WhatsAppAccount;
  to: string;
  text: string;
}): Promise<WhatsAppSendResult> {
  const { cfg, to, text } = ctx;
  const url = `${GRAPH_API}/${cfg.phoneNumberId}/messages`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: { body: truncate(text) },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        error: data.error?.message || `HTTP ${res.status}`,
      };
    }

    return {
      ok: true,
      messageId: data.messages?.[0]?.id,
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function sendMedia(ctx: {
  cfg: WhatsAppAccount;
  to: string;
  mediaUrl: string;
  mediaType?: "image" | "audio" | "document";
  caption?: string;
}): Promise<WhatsAppSendResult> {
  const { cfg, to, mediaUrl, mediaType = "image", caption } = ctx;
  const url = `${GRAPH_API}/${cfg.phoneNumberId}/messages`;

  const mediaPayload: Record<string, unknown> = { link: mediaUrl };
  if (caption) mediaPayload.caption = caption;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: mediaType,
        [mediaType]: mediaPayload,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { ok: false, error: data.error?.message || `HTTP ${res.status}` };
    }
    return { ok: true, messageId: data.messages?.[0]?.id };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
