// export interface SchoolHELP extends Request {

// }


// //testing methods
// import { v4 as uuid } from "uuid";
// import { RequestType, Tutorial } from "./Request.interface";
// import { School } from "./School.interface";

// export function ramTut(): Tutorial {
//   let random = Math.random() * (120948129481248 - 12834234) + 12834234;
//   return {
//     id: uuid(),
//     studentLevel: StudentLevel[random % 3],
//     description: uuid().repeat(random % 10).replace(/[^a-z]/gi, ''),
//     type: RequestType.Tutorial,
//     requestDate: new Date(),
//     proposedDateTime: randomDate(new Date(2021, 0, 1), new Date()),
//     numOfStudent: random * 10000 % 50,
//     school:
//   }
// }

// function randomDate(start, end) {
//   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// }
