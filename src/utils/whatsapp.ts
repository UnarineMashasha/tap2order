export const openWhatsApp = (phone: string, message: string) => {
  const cleanedPhone = phone.replace(/\D/g, "");

  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/${cleanedPhone}?text=${encodedMessage}`, "_blank");
};
