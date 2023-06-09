import { Body, Controller, Logger, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { GetOrdersDto } from './dto/get-orders.dto';
import { ApiTags } from '@nestjs/swagger';
import ChangeOrderStatusDto from './dto/change-order-status.dto';

@Controller()
@ApiTags('orders')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Post('/orders')
  async getOrders(@Body() data: GetOrdersDto): Promise<any[]> {
    try {
      return await this.appService.getOrders(data);
    } catch (e) {
      this.logger.error('Error in getOrders method.', e, AppController.name);
      throw e;
    }
  }

  @Put('/orders/financial-status')
  async changeStatus(@Body() data: ChangeOrderStatusDto): Promise<any> {
    try {
      return await this.appService.changeStatus(data);
    } catch (e) {
      this.logger.error('Error in changeStatus method.', e, AppController.name);
      throw e;
    }
  }
}
