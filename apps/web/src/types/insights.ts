export interface CommodityMetrics {
  [commodity: string]: number;
}

export interface TraderVolume {
  traderId: string;
  volume: number;
}

export interface InsightsData {
  totalVolumeByCommodity: CommodityMetrics;
  averagePriceByCommodity: CommodityMetrics;
  topTradersByVolume: TraderVolume[];
}
