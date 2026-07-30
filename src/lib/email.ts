import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const emailConfig = {
  from: process.env.CONTACT_EMAIL_FROM ?? "VeteLab <no-reply@vetelabsinop.com.br>",
  to: process.env.CONTACT_EMAIL_TO ?? "vetelabsinop@hotmail.com",
};

export function isEmailConfigured() {
  return Boolean(resend);
}
