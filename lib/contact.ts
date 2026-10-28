/** wa.me link for a display number like "+91-8083019809", optionally prefilled. */
export function whatsappUrl(number: string, message?: string) {
  const base = `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** tel: link for a display number. */
export function telUrl(number: string) {
  return `tel:+${number.replace(/[^0-9]/g, "")}`;
}
