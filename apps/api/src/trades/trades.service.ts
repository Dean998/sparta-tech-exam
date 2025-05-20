import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { TradeResponseDto } from './dto/trade-response.dto';
import { CreateTradeDto } from './dto/create-trade.dto';

@Injectable()
export class TradesService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateTradeDto & { trader: { connect: { id: number } } },
  ): Promise<TradeResponseDto> {
    try {
      return await this.prisma.trade.create({
        data: {
          ...data,
          timestamp: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Trade with these details already exists',
          );
        } else if (error.code === 'P2025') {
          throw new BadRequestException('Trader not found');
        }
      }
      throw new InternalServerErrorException('Error creating trade');
    }
  }

  async findAll(): Promise<TradeResponseDto[]> {
    try {
      return await this.prisma.trade.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching trades');
    }
  }
}
