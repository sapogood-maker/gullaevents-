import { DataSource } from 'typeorm';
import { env } from './env';
import { User } from '@models/User';
import { Event } from '@models/Event';
import { Ticket } from '@models/Ticket';
import { Wallet } from '@models/Wallet';
import { Transaction } from '@models/Transaction';
import { Product } from '@models/Product';
import { Order } from '@models/Order';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: env.DATABASE_URL,
  synchronize: env.NODE_ENV === 'development',
  logging: env.NODE_ENV === 'development',
  entities: [User, Event, Ticket, Wallet, Transaction, Product, Order],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});

export async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}
