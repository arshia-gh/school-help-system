export enum RequestType {
  Tutorial = 'Tutorial',
  Resource = 'Resource'
}

export interface Request {
  id: string,
  description: string,
  type: RequestType,
  requestDate: Date,
  school: School
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
import { School } from "./School.interface";

export function ramTut(): Tutorial {
  let random = Math.random() * (120948129481248 - 12834234) + 12834234;
  return {
    id: uuid(),
    studentLevel: StudentLevel[random % 3],
    description: uuid().repeat(random % 5),
    type: RequestType.Tutorial,
    requestDate: randomDate(new Date(2021, 0, 1), new Date()),
    proposedDateTime: randomDate(new Date(2021, 0, 1), new Date()),
    numOfStudent: random * 10000 % 50,
    school: {
      id: uuid(),
      name: 'testing ' + uuid()[0],
      address: {
        city: randomCity(),
        state: getSentence(),
        street: getSentence(),
      }

    }
  }
}

function randomCity() {
  const names = [
    'Sliangan',
    'Drahburg',
    'Heywell',
    'Phaumond',
    'Griyrora',
    'Sodon',
    'Xille',
    'Eford',
    'Adafast',
    'Arkridge',
  ]

  return names[Math.floor(Math.random() * names.length)];
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

export function getSentence() {
  var verbs, nouns, adjectives, adverbs, preposition;
  nouns = ["bird", "clock", "boy", "plastic", "duck", "teacher", "old lady", "professor", "hamster", "dog"];
  verbs = ["kicked", "ran", "flew", "dodged", "sliced", "rolled", "died", "breathed", "slept", "killed"];
  adjectives = ["beautiful", "lazy", "professional", "lovely", "dumb", "rough", "soft", "hot", "vibrating", "slimy"];
  adverbs = ["slowly", "elegantly", "precisely", "quickly", "sadly", "humbly", "proudly", "shockingly", "calmly", "passionately"];
  preposition = ["down", "into", "up", "on", "upon", "below", "above", "through", "across", "towards"];

  function sentence() {
    var rand1 = Math.floor(Math.random() * 10);
    var rand2 = Math.floor(Math.random() * 10);
    var rand3 = Math.floor(Math.random() * 10);
    var rand4 = Math.floor(Math.random() * 10);
    var rand5 = Math.floor(Math.random() * 10);
    var rand6 = Math.floor(Math.random() * 10);
    //                var randCol = [rand1,rand2,rand3,rand4,rand5];
    //                var i = randGen();
    var content = "The " + adjectives[rand1] + " " + nouns[rand2] + " " + adverbs[rand3] + " " + verbs[rand4] + " because some " + nouns[rand1] + " " + adverbs[rand1] + " " + verbs[rand1] + " " + preposition[rand1] + " a " + adjectives[rand2] + " " + nouns[rand5] + " which, became a " + adjectives[rand3] + ", " + adjectives[rand4] + " " + nouns[rand6] + ".";

    return content;
  };

  return sentence();
}