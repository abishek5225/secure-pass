export function generatePassword(length = 20): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const all = upper + lower + digits + symbols;

  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  const password = Array.from(array, (byte) => all[byte % all.length]).join("");

  const hasUpper = [...password].some((c) => upper.includes(c));
  const hasLower = [...password].some((c) => lower.includes(c));
  const hasDigit = [...password].some((c) => digits.includes(c));
  const hasSymbol = [...password].some((c) => symbols.includes(c));

  if (!hasUpper || !hasLower || !hasDigit || !hasSymbol) {
    return generatePassword(length);
  }

  return password;
}
