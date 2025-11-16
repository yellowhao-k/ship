// Placeholder Next.js API route for inquiry form submissions.
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, company, phone, country, desiredService, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Honeypot sample (if present websiteUrl should be empty)
  if (req.body.websiteUrl) {
    return res.status(200).json({ success: true }); // Silently accept spam
  }

  try {
    await prisma.inquiryLead.create({
      data: {
        name,
        email,
        company,
        phone,
        country,
        desiredService,
        message,
        source: 'inquiry-page'
      }
    });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to save lead' });
  }

  // TODO: Send notification email via provider (SendGrid/Resend)

  return res.status(200).json({ success: true });
}
