import { v4 as uuid } from "uuid";

export interface Request {
  requestId: string,
  requestDate: Date,
  description: string,
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
  conductingDate: Date,
  studentLevel: StudentLevel,
  numOfStudent: number,
}

export interface Resource extends Request {
  ResourceType: ResourceType,
  numRequired: number;
}
