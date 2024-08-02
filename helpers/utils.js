export function formatMoney(value) {
  const cleanedText = value.replace(/[^0-9]/g, "");
  return Number(cleanedText).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });
}
