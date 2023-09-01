import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn ,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[]
}