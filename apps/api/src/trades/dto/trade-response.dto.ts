import { CommodityType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TradeResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ enum: CommodityType, example: CommodityType.GOLD })
  commodity: CommodityType;

  @ApiProperty({ example: 1 })
  traderId: number;

  @ApiProperty({ example: 1850.5 })
  price: number;

  @ApiProperty({ example: 100 })
  quantity: number;

  @ApiProperty({ example: '2023-10-05T14:48:00.000Z' })
  timestamp: Date;
}
