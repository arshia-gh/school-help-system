export enum RequestType {
  Tutorial = 'Tutorial',
  Resource = 'Resource'
}

export interface Request {
  id: string,
  description: string,
  type: RequestType,
  requestDate: Date
}

export enum ResourceType {
  MobileDevice = "MobileDevice",
  PersonalComputer = "PersonalComputer",
  NetworkingEquipment = "NetworkingEquipment",
}

export enum StudentLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
}

export interface Tutorial extends Request {
  proposedDateTime: Date,
  studentLevel: StudentLevel,
  numOfStudent: number,
}

import { v4 as uuid } from "uuid";

export function ramTut(): Tutorial {
  let random = Math.random() * (120948129481248 - 12834234) + 12834234;
  return {
    id: uuid(),
    studentLevel: StudentLevel[random % 3],
    description: uuid().repeat(random % 10),
    type: RequestType.Tutorial,
    requestDate: new Date(),
    proposedDateTime: randomDate(new Date(2021, 0, 1), new Date()),
    numOfStudent: random * 10000 % 50
  }
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export interface Resource extends Request {
  ResourceType: ResourceType,
  numRequired: number;
}

export type CreateRequest = Omit<Request, 'id'>

export function isTutorial(request: Request): request is Tutorial {
  return request.type === RequestType.Tutorial
}

export function isResource(request: Request): request is Resource {
  return request.type === RequestType.Resource
}
