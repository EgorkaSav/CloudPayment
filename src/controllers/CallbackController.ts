import { Request, Response } from 'express';
import { IPaymentService } from '../services/IPaymentService';

export class CallbackController {
  constructor(private paymentService: IPaymentService) {}

  async handleCallback(req: Request, res: Response): Promise<void> {
    const callbackData = req.body;

    try {
      const payment = await this.paymentService.handleCallback(callbackData);
      res.status(200).json({ code: 0 }); 
    } catch (error) {
      res.status(500).json({ code: 1, message: 'Failed to process callback' });
    }
  }
}