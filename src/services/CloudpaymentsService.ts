import axios from 'axios';
import { Order } from '../models/Order';
import { Payment } from '../models/Payment';
import { IPaymentService } from './IPaymentService';



interface CloudpaymentsResponse {
  Success: boolean;
  Message: string | null;
  Model: {
    Id: string;
    Number: number;
    Amount: number;
    Currency: string;
    CurrencyCode: number;
    Email: string;
    Phone: string;
    Description: string;
    RequireConfirmation: boolean;
    Url: string;
    CultureName: string;
    CreatedDate: string;
    CreatedDateIso: string;
    PaymentDate: string | null;
    PaymentDateIso: string | null;
    StatusCode: number;
    Status: string;
    InternalId: number;
  };
}


export class CloudpaymentsService implements IPaymentService {
  private readonly apiUrl = 'https://api.cloudpayments.ru/orders/create';
  async createPayment(order: Order): Promise<string> {
    try {
      const response = await axios.post<CloudpaymentsResponse>(
        this.apiUrl,
        {
          Number: order.id, 
          Amount: order.amount,
          email: order.email,
          Description: order.description,
          Email: order.email,
        },        
      );

      const data = response.data;
      if (data.Success && data.Model && data.Model.Url) {
        return data.Model.Url; 
      } else {
        throw new Error(data.Message || 'Failed to create order in Cloudpayments');
      }
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        console.error('Cloudpayments error:', (error as Error).message);
        throw new Error(`Cloudpayments API error: ${(error as Error).message}`);
      }
      throw error;
    }
  }

  async handleCallback(data: any): Promise<Payment> {
    return {
      id: data.id,
      status: data.status,
    }; // Дописать если платежа без авторизации
  }
}