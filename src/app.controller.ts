import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetOrdersDto } from './dto/get-orders.dto';

@Controller()
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
}
