export function formatMoney(value) {
  const cleanedText = value.replace(/[^0-9.]/g, "");
  return Number(cleanedText).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
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

export function formatShortDate(date) {
  const dateObject = new Date(date);
  const formatedDate = dateObject.toLocaleString("es-CO", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
  });

  return formatedDate[0].toUpperCase() + formatedDate.slice(1);
}
