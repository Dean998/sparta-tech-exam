export interface CommodityMetrics {
  [commodity: string]: number;
}

export interface TraderVolume {
  traderId: string;
  volume: number;
}

export class InsightsResponseDto {
  totalVolumeByCommodity: CommodityMetrics;
  averagePriceByCommodity: CommodityMetrics;
  topTradersByVolume: TraderVolume[];
}
