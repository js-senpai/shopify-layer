import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum OrderStatusEnum {
  AUTHORIZED = 'AUTHORIZED',
  EXPIRED = 'EXPIRED',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  PENDING = 'PENDING',
  REFUNDED = 'REFUNDED',
  VOIDED = 'VOIDED',
}

export default class ChangeOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ nullable: false, required: true, type: String })
  accountId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ nullable: false, required: true, type: String })
  orderId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ nullable: false, required: true, type: String })
  status: string;
}
