import { CustomerEntity } from 'src/customer/customer.entity';
import { ProductEntity } from 'src/product/product.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('tb_starcom_cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id_cart: number;

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  added_date: Date;
}
