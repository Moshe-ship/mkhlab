/**
 * Arabic intent router for WhatsApp.
 * Routes incoming messages to appropriate مخلب skills.
 *
 * Scoped per Meta's Jan 2026 policy — no general-purpose AI.
 */

export type SkillIntent =
  | "prayer"
  | "hijri"
  | "quran"
  | "hadith"
  | "translate"
  | "greeting"
  | "help"
  | "unknown";

export function detectIntent(text: string): SkillIntent {
  const t = text.trim();
  const lower = t.toLowerCase();

  // Greetings
  if (
    t.includes("السلام عليكم") ||
    t.includes("مرحبا") ||
    t.includes("أهلا") ||
    t.includes("اهلا") ||
    lower === "hi" ||
    lower === "hello"
  ) {
    return "greeting";
  }

  // Help
  if (
    t.includes("مساعدة") ||
    t.includes("ساعدني") ||
    lower === "help" ||
    lower === "menu" ||
    t === "؟"
  ) {
    return "help";
  }

  // Prayer times
  if (
    t.includes("صلاة") ||
    t.includes("صلاه") ||
    t.includes("أذان") ||
    t.includes("اذان") ||
    t.includes("فجر") ||
    t.includes("ظهر") ||
    t.includes("عصر") ||
    t.includes("مغرب") ||
    t.includes("عشاء") ||
    lower.includes("prayer") ||
    lower.includes("salah") ||
    lower.includes("athan")
  ) {
    return "prayer";
  }

  // Hijri calendar
  if (
    t.includes("هجري") ||
    t.includes("تاريخ") ||
    t.includes("رمضان") ||
    t.includes("عيد") ||
    t.includes("محرم") ||
    lower.includes("hijri") ||
    lower.includes("ramadan")
  ) {
    return "hijri";
  }

  // Quran
  if (
    t.includes("قرآن") ||
    t.includes("قران") ||
    t.includes("آية") ||
    t.includes("ايه") ||
    t.includes("سورة") ||
    t.includes("سوره") ||
    lower.includes("quran") ||
    lower.includes("surah") ||
    lower.includes("ayah")
  ) {
    return "quran";
  }

  // Hadith
  if (
    t.includes("حديث") ||
    t.includes("أحاديث") ||
    t.includes("البخاري") ||
    t.includes("مسلم") ||
    lower.includes("hadith")
  ) {
    return "hadith";
  }

  // Translation (explicit request or pure English)
  if (
    t.includes("ترجم") ||
    t.includes("ترجمة") ||
    lower.includes("translate") ||
    /^[a-zA-Z\s.,!?'"()-]+$/.test(t)
  ) {
    return "translate";
  }

  return "unknown";
}

export function getHelpMessage(): string {
  return (
    "🦅 *مخلب — مساعدك على واتساب*\n\n" +
    "أقدر أساعدك في:\n\n" +
    "🕌 *أوقات الصلاة*\n" +
    '   مثال: "أوقات الصلاة في الرياض"\n\n' +
    "📅 *التقويم الهجري*\n" +
    '   مثال: "التاريخ الهجري اليوم"\n\n' +
    "📖 *بحث القرآن*\n" +
    '   مثال: "آية الكرسي"\n\n' +
    "📜 *بحث الأحاديث*\n" +
    '   مثال: "حديث عن الصبر"\n\n' +
    "🔄 *ترجمة*\n" +
    '   مثال: "ترجم Hello World"\n\n' +
    "اكتب *مساعدة* لعرض هذه القائمة مرة ثانية."
  );
}

export function getGreetingMessage(): string {
  return "وعليكم السلام ورحمة الله وبركاته! 🦅\n\n" + getHelpMessage();
}
