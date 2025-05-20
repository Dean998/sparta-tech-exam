import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetInsightsDto } from './dto';
import { BaseException } from '../common/exceptions/base.exception';
import { HttpStatus } from '@nestjs/common';

@ApiTags('insights')
@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Get()
  @ApiOperation({ summary: 'Get trading insights' })
  @ApiResponse({ status: 200, description: 'Returns trading insights' })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getInsights() {
    try {
      return await this.insightsService.getInsights();
    } catch (error) {
      throw new BaseException(
        'Failed to fetch insights',
        HttpStatus.INTERNAL_SERVER_ERROR,
        'INSIGHTS_FETCH_ERROR',
      );
    }
  }
}
