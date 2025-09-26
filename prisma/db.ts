import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient({
  // Increase the timeout to 10 seconds (10000 ms)
  // or a value that is appropriate for your application.
  log: ['query', 'info', 'warn', 'error'],
  transactionOptions: {
    maxWait: 10000,
    timeout: 10000, 
  }
});
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
