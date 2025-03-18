import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('tab_starcom_admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id_admin: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  phone_number: string;
  
  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  admin_code: string;

  @Column({ type: 'varchar' })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
