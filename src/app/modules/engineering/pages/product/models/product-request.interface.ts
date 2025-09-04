export interface ProductUpdateRequest {
  code: string;
  sublineCode: string;
  cost: number;
  multiplier: number;
  distributorMultiplier: number;
  margin: number;
  basePriceUsd: number;
}
