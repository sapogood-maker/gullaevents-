import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Event } from './Event';
import { Product } from './Product';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  eventId: string;

  @Column()
  productId: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  amountPaid: number;

  @Column()
  paymentMethod: 'wallet' | 'credit_card' | 'pix';

  @Column({ default: 'completed', type: 'varchar' })
  status: 'pending' | 'completed' | 'failed' | 'refunded';

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Event, (event) => event.orders)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @ManyToOne(() => Product, (product) => product.orders)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
