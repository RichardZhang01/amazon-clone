import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductDocument } from './product.schema';

// localhost:3000/products
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findAllProducts(): Promise<ProductDocument[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findProductById(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.findOne(id);
  }

  @Post()
  createProduct(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string,
  ): Promise<ProductDocument> {
    return this.productService.create(name, price, description);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string,
  ): Promise<ProductDocument> {
    return this.productService.update(id, name, price, description);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
