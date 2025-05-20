import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';
import { CommodityType } from '@prisma/client';

export class GetInsightsDto {
  @ApiProperty({
    required: false,
    description: 'Commodity type',
    enum: CommodityType,
    example: CommodityType.GOLD,
  })
  @IsOptional()
  @IsEnum(CommodityType)
  commodity?: CommodityType;
}
