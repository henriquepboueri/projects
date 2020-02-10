import { Project } from "./models/project";

export class ProjectService {
  private projects: Project[] = [
    {
      id: 1,
      creationDate: null,
      creationUser: {
        id: 1,
        name: "Henrique"
      },
      priorityLevel: {
        id: 1,
        description: null,
        name: "high"
      },
      answers: [
        {
          answer: "First answer",
          date: null,
          id: 1,
          poster: {
            id: 1,
            name: "Henrique"
          }
        },
        {
          answer: "Second answer",
          date: null,
          id: 2,
          poster: {
            id: 2,
            name: "João"
          }
        }
      ],
      description: "A new project",
      name: "Alpha",
      participants: [
        { id: 1, name: "Henrique" },
        { id: 2, name: "João" }
      ],
      status: { description: null, id: 1, name: "Open" }
    },
    {
      id: 2,
      creationDate: null,
      creationUser: {
        id: 1,
        name: "Henrique"
      },
      priorityLevel: {
        id: 1,
        description: null,
        name: "high"
      },
      answers: [
        {
          answer: "First answer",
          date: null,
          id: 1,
          poster: {
            id: 1,
            name: "Henrique"
          }
        },
        {
          answer: "Second answer",
          date: null,
          id: 2,
          poster: {
            id: 2,
            name: "João"
          }
        }
      ],
      description: "A new project",
      name: "Beta",
      participants: [
        { id: 1, name: "Henrique" },
        { id: 2, name: "João" }
      ],
      status: { description: null, id: 1, name: "Open" }
    }
  ];

  getProjects() {}
}
