import { Controller, Get, Post, Body, UseGuards, Request, HttpStatus, HttpCode } from '@nestjs/common';
import { TradesService } from './trades.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTradeDto } from './dto/create-trade.dto';
import { TradeResponseDto } from './dto/trade-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('trades')
@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new trade' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Trade created successfully', type: TradeResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid trade data' })
  async create(@Request() req, @Body() tradeData: CreateTradeDto): Promise<TradeResponseDto> {
    return this.tradesService.create({
      ...tradeData,
      trader: {
        connect: { id: req.user.id }
      }
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all trades' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of all trades', type: [TradeResponseDto] })
  async findAll(): Promise<TradeResponseDto[]> {
    return this.tradesService.findAll();
  }
}
