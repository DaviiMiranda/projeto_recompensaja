export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  creator: string;
  creatorId?: string;
  image: string;
  description: string;
  category?: string;
  goalAmount: number;
  raisedAmount: number;
  backerCount?: number;
  deadline: Date;
  publishedDate: Date;
  rewards?: Reward[];
  video?: string;
  longDescription?: string;
  status?: string;
}

export interface Reward {
  id: string;
  projectId: string;
  title: string;
  description: string;
  amount: number;
  estimatedDelivery: Date;
  backerCount: number;
  isLimited: boolean;
  limitQuantity?: number;
  remainingQuantity?: number;
}

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  FUNDED = 'FUNDED',
  EXPIRED = 'EXPIRED'
}

export interface ProjectFilters {
  category?: string;
  status?: ProjectStatus;
  search?: string;
}
