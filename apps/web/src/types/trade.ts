export enum CommodityType {
  GOLD = "GOLD",
  OIL = "OIL",
}

export interface Trade {
  id: string;
  commodity: CommodityType;
  quantity: number;
  price: number;
  traderId: string;
  timestamp: string;
}
