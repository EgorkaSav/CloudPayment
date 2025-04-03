import { Order } from '../models/Order';
import { Payment } from '../models/Payment';

export interface IPaymentService {
  createPayment(order: Order): Promise<string>; 
  handleCallback(data: any): Promise<Payment>; 
}