import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Ticket } from './Ticket';
import { Product } from './Product';
import { Order } from './Order';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  location: string;

  @Column({ type: 'timestamp' })
  eventDate: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  ticketPrice: number;

  @Column({ type: 'integer', default: 0 })
  totalTickets: number;

  @Column({ type: 'integer', default: 0 })
  soldTickets: number;

  @Column({ default: 'active', type: 'varchar' })
  status: 'draft' | 'active' | 'finished' | 'cancelled';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];

  @OneToMany(() => Product, (product) => product.event)
  products: Product[];

  @OneToMany(() => Order, (order) => order.event)
  orders: Order[];
}
