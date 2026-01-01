import { Resend } from 'resend';

let resendInstance: Resend | null = null;

export const getResendInstance = (): Resend | null => {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && apiKey !== 're_XXXXXXXXXXXXXXXXXXXXXXXX') {
      resendInstance = new Resend(apiKey);
    } else {
      console.warn('RESEND_API_KEY missing or invalid - email sending disabled');
    }
  }
  return resendInstance;
};

export const resend = getResendInstance();
