import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Order {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  constructor(data: { id: string; amount: number; email: string; description: string }) {
    this.id = data.id;
    this.amount = data.amount;
    this.email = data.email;
    this.description = data.description;
  }
}