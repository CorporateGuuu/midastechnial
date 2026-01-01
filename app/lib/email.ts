import { Resend } from "resend";

let resendInstance: Resend | null = null;

export const getResend = (): Resend | null => {
  if (!resendInstance) {
    if (process.env.RESEND_API_KEY) {
      resendInstance = new Resend(process.env.RESEND_API_KEY);
    } else {
      console.warn('RESEND_API_KEY missing - email sending disabled');
    }
  }
  return resendInstance;
};

export const resend = getResend();
