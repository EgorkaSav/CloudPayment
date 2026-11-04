# CloudPayments Integration Server

A small TypeScript/Express backend that creates orders and processes payments through the [CloudPayments](https://cloudpayments.ru) payment gateway. Built as a test assignment.

## Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/orders` | Creates an order and a payment in CloudPayments, returns the payment data |
| `POST` | `/callback` | Receives payment status notifications from CloudPayments and updates the order |

## Design

- **Controllers** (`src/controllers/`) handle HTTP requests: `OrderController`, `CallbackController`.
- **Service layer** (`src/services/`) behind an `IPaymentService` interface, so the payment provider can be swapped or mocked in tests; `CloudpaymentsService` is the CloudPayments implementation.
- **Models** (`src/models/`): `Order` and `Payment`, validated with class-validator / class-transformer.
- **Logging** with winston to `error.log` and `combined.log`.

## Tech stack

TypeScript, Node.js, Express 5, axios, class-validator, winston.

## Running locally

```bash
git clone https://github.com/EgorkaSav/CloudPayment.git
cd CloudPayment
npm install
npx tsc
node dist/server.js   # or the output path set in tsconfig.json
```

The server listens on `PORT` (default `3000`). The CloudPayments API URL is set in `src/services/CloudpaymentsService.ts`; add your own CloudPayments credentials (Public ID and API secret) before using it with real payments, and keep them out of the repository.
