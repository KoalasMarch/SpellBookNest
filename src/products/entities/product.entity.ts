import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Money } from '../../utils/money';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  @Exclude()
  priceSubunit: number;

  @Column()
  @Exclude()
  priceCurrency: string;

  @Expose()
  price() {
    return new Money(this.priceSubunit, this.priceCurrency);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Category, category => category.products)
  categories: Category[];
}
