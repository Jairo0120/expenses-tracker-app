export function formatMoney(value) {
  const cleanedText = value.replace(/[^0-9.]/g, "");
  return Number(cleanedText).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

/**
 * Digits only for money input. Locale-formatted amounts use "." as thousands
 * separator (es-CO); keeping dots in the string makes Number("12.345") === 12.345.
 */
export function parseMoneyInputText(text) {
  return text.replace(/\D/g, "");
}

/** Formatted COP for a controlled money TextInput; empty when nothing entered. */
export function formatMoneyInputDisplay(value) {
  if (value === "" || value === null || value === undefined) return "";
  const digits = String(value).replace(/\D/g, "");
  if (digits === "") return "";
  const n = Number(digits);
  if (!Number.isFinite(n)) return "";
  return n.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export function formatShortMoney(value) {
  const numberValue = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numberValue)) return "0";

  const sign = numberValue < 0 ? "-" : "";
  const abs = Math.abs(numberValue);

  let divisor = 1;
  let suffix = "";
  if (abs >= 1_000_000) {
    divisor = 1_000_000;
    suffix = "M";
  } else if (abs >= 1_000) {
    divisor = 1_000;
    suffix = "K";
  }

  const scaled = abs / divisor;
  const ceiled = Math.ceil(scaled * 100) / 100;

  const text = ceiled
    .toFixed(2)
    .replace(/\.?0+$/, "");

  return `${sign}${text}${suffix}`;
}

export function formatDate(date) {
  // The date is in ISO format, but it doesn't have the timezone
  // information. We add the "Z" to indicate that it's UTC.
  const dateObject = new Date(date + "Z");
  return dateObject.toLocaleString("es-CO", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatShortDate(date) {
  const dateObject = new Date(date);
  const formatedDate = dateObject.toLocaleString("es-CO", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
  });

  return formatedDate[0].toUpperCase() + formatedDate.slice(1);
}
