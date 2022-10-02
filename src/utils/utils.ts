export const capitalize = (message: string) =>
  message
    .split(' ')
    .map(sub => sub.length > 0 ? sub.charAt(0) + sub.slice(1) : sub)
    .join(' ')
