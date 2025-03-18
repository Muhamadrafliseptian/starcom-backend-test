import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('tab_starcom_customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id_customer: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  phone_number: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  customer_code: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int' })
  age: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
