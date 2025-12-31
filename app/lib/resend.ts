import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey && apiKey !== 're_XXXXXXXXXXXXXXXXXXXXXXXX' ? new Resend(apiKey) : null;
