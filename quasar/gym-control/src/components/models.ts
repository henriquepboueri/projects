export interface Exercise {
  id?: number | string;
  name: string;
  date?: Date | number;
  info?: string;
}

export interface Log {
  id?: number | string;
  exercise: string;
  date?: Date | number;
  info?: string;
}
