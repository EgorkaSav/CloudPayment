import express, { Application } from 'express';
import 'reflect-metadata';
import winston from 'winston';
import { CallbackController } from './controllers/CallbackController';
import { OrderController } from './controllers/OrderController';
import { CloudpaymentsService } from './services/CloudpaymentsService';

const app: Application = express();
app.use(express.json());

// Логирование
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Зависимости
const paymentService = new CloudpaymentsService();
const orderController = new OrderController(paymentService);
const callbackController = new CallbackController(paymentService);

// Эндпоинты
app.post('/orders', (req, res) => orderController.createOrder(req, res));
app.post('/callback', (req, res) => callbackController.handleCallback(req, res));

//сервер
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});