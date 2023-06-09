import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
