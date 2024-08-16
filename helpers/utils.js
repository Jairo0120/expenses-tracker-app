export function formatMoney(value) {
  const cleanedText = value.replace(/[^0-9.]/g, "");
  return Number(cleanedText).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });
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
