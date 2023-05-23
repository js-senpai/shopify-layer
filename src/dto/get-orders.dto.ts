import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum OrderStatusEnum {
  open = 'open',
  closed = 'closed',
  cancelled = 'cancelled',
  any = 'any',
}

export class GetOrdersDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ nullable: false, required: true, type: String })
  accountId: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: false, required: false, type: String })
  attribution_app_id: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ nullable: false, required: false, type: Date })
  created_at_max: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ nullable: false, required: false, type: Date })
  created_at_min: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: false, required: false, type: String })
  fields: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: false, required: false, type: String })
  financial_status: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: false, required: false, type: String })
  fulfillment_status: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: false, required: false, type: String })
  ids: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ nullable: false, required: false, type: Number })
  limit: number;

  @IsOptional()
  @IsDate()
  @ApiProperty({ nullable: false, required: false, type: Date })
  processed_at_max: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ nullable: false, required: false, type: Date })
  processed_at_min: Date;

  @IsOptional()
  @IsInt()
  @ApiProperty({ nullable: false, required: false, type: Number })
  since_id: number;

  @IsOptional()
  @IsEnum(OrderStatusEnum)
  @ApiProperty({ nullable: false, required: false, type: String })
  status: OrderStatusEnum;

  @IsOptional()
  @IsDate()
  @ApiProperty({ nullable: false, required: false, type: Date })
  updated_at_max: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ nullable: false, required: false, type: Date })
  updated_at_min: Date;
}
