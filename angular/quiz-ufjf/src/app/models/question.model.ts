import { Option } from './option.model';

export interface Question {
  id: number;
  text: string;
  options: Option[];
  answerIndex: number;
}
