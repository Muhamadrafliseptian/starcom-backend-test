import { CustomerEntity } from 'src/customer/customer.entity';
import { ProductEntity } from 'src/product/product.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  EXPIRED = 'EXPIRED',
}

@Entity('tb_starcom_order')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id_order: number;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'id_customer' })
  customer: CustomerEntity;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'id_product' })
  product: ProductEntity;

  @Column({ type: 'int', default: 0 })
  quantity: bigint;

  @Column({ type: 'bigint' })
  total_price: bigint;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  order_date: Date;
}
