export type ResourceType = 'ENERGY' | 'GAS' | 'WATER';

export interface ConsumptionCreateRequest {
  resourceType: ResourceType;
  value: number;
  unit: string;
  readingDate: string;     // ISO: yyyy-MM-dd
  note?: string | null;
  sede: string;            // 👈 NUEVO
}

export interface ConsumptionUpdateRequest {
  consumptionId: number;
  resourceType: ResourceType;
  value: number;
  unit: string;
  readingDate?: string | null;
  note?: string | null;
  sede: string;            // 👈 NUEVO
}
