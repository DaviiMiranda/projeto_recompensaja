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
  image: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  deadline: Date;
  publishedDate: Date;
}

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  FUNDED = 'FUNDED',
  EXPIRED = 'EXPIRED'
}
