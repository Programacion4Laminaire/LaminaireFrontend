import { ResourceType } from './consumption-request.interface';

export interface ConsumptionResponse {
  consumptionId: number;
  resourceType: ResourceType;
  value: number;
  unit: string;
  readingDate: string;       // ISO
  note?: string | null;
  auditCreateDate: string;

  icEdit: string;
  icDelete: string;
  avatar?: { text: string; image: string };
}

export type ConsumptionByIdResponse =
  Omit<ConsumptionResponse, 'icEdit' | 'icDelete' | 'avatar'>;
