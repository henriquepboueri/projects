export interface Exercise {
  id?: number;
  name: string;
}

export interface Log {
  id?: number;
  exercise: Exercise;
  date: Date;
}
