import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: number) {
    return this.productsRepository.findOneByOrFail({ id });
  }

  async filterProducts(name: string, price_gte: number, price_lte: number) {
    const query = this.productsRepository.createQueryBuilder('product');
    
    if (name) {
      query.andWhere('product.name = :name', { name });  
    }
    
    if (price_gte) {
      query.andWhere('product.price >= :price_gte', { price_gte });
    }

    if (price_lte) {
      query.andWhere('product.price <= :price_lte', { price_lte });
    }

    return await query.getMany();
  }

  create(createProductDto: CreateProductDto) {
    return this.productsRepository.save(createProductDto);
  }

  update(product: Product, updateProductDto: UpdateProductDto) {
    return this.productsRepository.save({ ...product, ...updateProductDto });
  }

  remove(product: Product) {
    return this.productsRepository.delete(product.id);
  }
}
