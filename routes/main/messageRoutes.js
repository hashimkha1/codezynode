// routes/messageRoutes.js
import express from 'express';
import { receiveWhatsAppWebhook } from '../../controllers/ messageController.js';

const router = express.Router();

// WhatsApp webhook endpoint
router.post('/whatsapp-webhook', receiveWhatsAppWebhook);

export default router;
