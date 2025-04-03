import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { IPaymentService } from '../services/IPaymentService';

export class OrderController {
  constructor(private paymentService: IPaymentService) {}

  async createOrder(req: Request, res: Response): Promise<void> {
    const orderData = req.body;
    const order = new Order(orderData);
    Object.assign(order, orderData);

    const errors = await validate(order);
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    try {
      const paymentUrl = await this.paymentService.createPayment(order);
      res.status(201).json({ paymentUrl });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}