import { User } from './user';

export class Answer{
    id: number;
    answer: string;
    poster: User;
    date: Date;
}