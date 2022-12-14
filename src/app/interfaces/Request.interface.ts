import type { Offer } from "./Offer.interface";

export enum RequestType {
  Tutorial = "Tutorial",
  Resource = "Resource",
}

export enum RequestStatus {
  New = 'New',
  Closed = 'Closed',
}

export interface BaseRequest {
  id: string
  description: string
  requestDate: Date
  school: string
  type: RequestType,
  status: RequestStatus,
  offers: Offer[]
}

export type Request = BaseRequest & (Tutorial | Resource);

export enum ResourceType {
  MobileDevice = "Mobile Device",
  PersonalComputer = "Personal Computer",
  NetworkingEquipment = "Networking Equipment",
}

export enum StudentLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
}

export interface Tutorial extends BaseRequest {
  proposedDateTime: Date
  studentLevel: StudentLevel
  numOfStudent: number
  type: RequestType.Tutorial
}

export interface Resource extends BaseRequest {
  numRequired: number
  resourceType: ResourceType
  type: RequestType.Resource
}

export type CreateRequest<RequestType = Request> = Omit<
  RequestType,
  "id" | "requestDate" | "school" | "offers" | "status" | "type"
>

export function isTutorial(request: BaseRequest): request is Tutorial {
  return request.type === RequestType.Tutorial;
}

export function isResource(request: BaseRequest): request is Resource {
  return request.type === RequestType.Resource;
}

export function getSentence() {
  var verbs, nouns, adjectives, adverbs, preposition;
  nouns = [
    "bird",
    "clock",
    "boy",
    "plastic",
    "duck",
    "teacher",
    "old lady",
    "professor",
    "hamster",
    "dog",
  ];
  verbs = [
    "kicked",
    "ran",
    "flew",
    "dodged",
    "sliced",
    "rolled",
    "died",
    "breathed",
    "slept",
    "killed",
  ];
  adjectives = [
    "beautiful",
    "lazy",
    "professional",
    "lovely",
    "dumb",
    "rough",
    "soft",
    "hot",
    "vibrating",
    "slimy",
  ];
  adverbs = [
    "slowly",
    "elegantly",
    "precisely",
    "quickly",
    "sadly",
    "humbly",
    "proudly",
    "shockingly",
    "calmly",
    "passionately",
  ];
  preposition = [
    "down",
    "into",
    "up",
    "on",
    "upon",
    "below",
    "above",
    "through",
    "across",
    "towards",
  ];

  function sentence() {
    var rand1 = Math.floor(Math.random() * 10);
    var rand2 = Math.floor(Math.random() * 10);
    var rand3 = Math.floor(Math.random() * 10);
    var rand4 = Math.floor(Math.random() * 10);
    var rand5 = Math.floor(Math.random() * 10);
    var rand6 = Math.floor(Math.random() * 10);
    //                var randCol = [rand1,rand2,rand3,rand4,rand5];
    //                var i = randGen();
    var content = "The " + adjectives[rand1] + " " + nouns[rand2] + " " +
      adverbs[rand3] + " " + verbs[rand4] + " because some " + nouns[rand1] +
      " " + adverbs[rand1] + " " + verbs[rand1] + " " + preposition[rand1] +
      " a " + adjectives[rand2] + " " + nouns[rand5] + " which, became a " +
      adjectives[rand3] + ", " + adjectives[rand4] + " " + nouns[rand6] + ".";

    return content;
  }

  return sentence();
}
