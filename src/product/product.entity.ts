import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_starcom_product')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id_product: number;

    @Column({ type: 'varchar' })
    product_name: string;

    @Column({ type: 'varchar'})
    product_code: string;

    @Column({ type: 'longtext'})
    product_description: string;

    @Column({ type: 'int', default: 0 })
    product_qty: number;  

    @Column({ type: 'bigint' })
    product_price: bigint;
}
