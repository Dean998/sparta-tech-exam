import { IsEnum, IsNumber, IsDate, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CommodityType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTradeDto {
  @ApiProperty({ enum: CommodityType, example: CommodityType.GOLD })
  @IsEnum(CommodityType)
  commodity: CommodityType;

  @ApiProperty({ example: 1850.5, minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 100, minimum: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: new Date() })
  @Type(() => Date)
  @IsDate()
  timestamp: Date;
}
