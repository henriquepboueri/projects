import { User } from "./user";
import { Answer } from "./answer";
import { Status } from "./status";
import { Priority } from "./priority";

export class Project {
  constructor() {}

  id: number;
  creationDate: Date;
  creationUser: User;
  priorityLevel: Priority;
  name: string;
  description: string;
  participants: User[];
  answers: Answer[];
  status: Status;
}
