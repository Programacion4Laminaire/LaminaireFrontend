export interface ProductResponse {
  code: string;
  productName: string;        
  sublineCode: string;        
  sublineName: string;        
  cost: number;               
  exchangeRate: number;       
  margin: number;            
  salePriceCop: number;       
  salePriceUsd: number;       
  multiplier: number;         
  distributorMultiplier: number; 
  basePriceUsd: number;       
}
