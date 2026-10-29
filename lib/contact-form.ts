export type ContactField = "name" | "email" | "message";
type ContactValues = Record<ContactField, string>;
type ContactErrors = Partial<Record<ContactField, string>>;

const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const emptyContactValues: ContactValues = { name: "", email: "", message: "" };

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter a valid email, like you@company.com.";
  const length = values.message.trim().length;
  if (length < MESSAGE_MIN) errors.message = `A little more, please (${MESSAGE_MIN - length} more characters).`;
  return errors;
}
