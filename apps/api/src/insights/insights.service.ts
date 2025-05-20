import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetInsightsDto } from './dto';
import { BaseException } from '../common/exceptions/base.exception';
import { HttpStatus } from '@nestjs/common';
import { Prisma, CommodityType } from '@prisma/client';

@Injectable()
export class InsightsService {
  private readonly logger = new Logger(InsightsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getInsights(query: GetInsightsDto) {
    try {
      const tradesByCommodity = await this.prisma.trade.groupBy({
        by: ['commodity'],
        _count: {
          _all: true,
        },
        _sum: {
          quantity: true,
        },
        _avg: {
          price: true,
        },
      });

      const totalVolumeByCommodity: Record<string, number> = {};
      const averagePriceByCommodity: Record<string, number> = {};

      tradesByCommodity.forEach((trade) => {
        totalVolumeByCommodity[trade.commodity] = trade._sum?.quantity ?? 0;
        averagePriceByCommodity[trade.commodity] = trade._avg?.price ?? 0;
      });

      const topTraders = await this.prisma.trade.groupBy({
        by: ['traderId'],
        _sum: {
          quantity: true,
        },
        orderBy: {
          _sum: {
            quantity: 'desc',
          },
        },
        take: 10,
      });

      return {
        totalVolumeByCommodity,
        averagePriceByCommodity,
        topTradersByVolume: topTraders.map((trader) => ({
          traderId: trader.traderId.toString(),
          volume: trader._sum?.quantity ?? 0,
        })),
      };
    } catch (error) {
      this.logger.error('Failed to fetch insights:', error);
      throw new BaseException(
        'Failed to fetch insights',
        HttpStatus.INTERNAL_SERVER_ERROR,
        'INSIGHTS_FETCH_ERROR',
      );
    }
  }
}
