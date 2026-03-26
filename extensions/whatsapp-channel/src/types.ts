/** WhatsApp Cloud API Types */

export interface WhatsAppAccount {
  enabled: boolean;
  phoneNumberId: string;
  accessToken: string;
  verifyToken: string;
  appSecret?: string;
  webhookPort?: number;
  dmPolicy?: "open" | "allowlist";
  allowFrom?: string[];
}

export interface WhatsAppIncomingMessage {
  from: string;
  id: string;
  timestamp: string;
  type: "text" | "image" | "audio" | "document" | "location" | "reaction";
  text?: { body: string };
  image?: { id: string; mime_type: string; caption?: string };
  audio?: { id: string; mime_type: string };
  location?: { latitude: number; longitude: number; name?: string };
}

export interface WhatsAppWebhookPayload {
  object: "whatsapp_business_account";
  entry: Array<{
    id: string;
    changes: Array<{
      field: "messages";
      value: {
        messaging_product: "whatsapp";
        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };
        messages?: WhatsAppIncomingMessage[];
        statuses?: Array<{
          id: string;
          status: "sent" | "delivered" | "read";
          timestamp: string;
        }>;
        contacts?: Array<{
          profile: { name: string };
          wa_id: string;
        }>;
      };
    }>;
  }>;
}

export interface WhatsAppSendResult {
  ok: boolean;
  messageId?: string;
  error?: string;
}
