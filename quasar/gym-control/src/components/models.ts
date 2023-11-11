export interface Exercise {
  id?: number | string;
  name: string;
}

export interface Log {
  id?: number;
  exercise: string;
  date: Date | number;
}
