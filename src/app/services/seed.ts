import { Request, RequestType, ResourceType, StudentLevel } from "../interfaces/Request.interface"
import { School } from "../interfaces/School.interface"
import { User, UserType } from "../interfaces/User.interface"

export const schools : School[] = [
  {
    id: '502a73cb-be8b-4924-aec6-def62dd92914',
    name: 'HELP University',
    address: {
      city: 'Subang Bestari',
      state: 'Selangor',
      street: 'No. 158, Jalan Subang'
    },
    requests: []
  },
  {
    id: '8e61e5e9-c5cd-4ea4-a88a-914483486acd',
    name: 'INTI University',
    address: {
      city: 'Klang',
      state: 'Selangor',
      street: 'No. 123, Jalan Klang'
    },
    requests: []
  },
  {
    id: 'b434d547-b772-4203-88f5-b61160fba82b',
    name: 'Taylor University',
    address: {
      city: 'Petaling Jaya',
      state: 'Selangor',
      street: 'No. 44, Jalan 3/12'
    },
    requests: []
  },
]

export const requests: Request[] = [
  {
    id: '17664cd3-a4d3-4a96-80d1-f76b432051a6',
    description: 'need more mobile device',
    requestDate: new Date(2022, 9, 20),
    school: schools[0],
    numRequired: 10,
    resourceType: ResourceType.MobileDevice,
    type: RequestType.Resource,
    offers: []
  },
  {
    id: '5f704187-4423-4dd3-a5ca-292c5c4a16e1',
    description: 'Advanced teacher needed for History class.',
    requestDate: new Date(2022, 9, 1),
    school: schools[0],
    numOfStudent: 10,
    studentLevel: StudentLevel.Advanced,
    proposedDateTime: new Date(2022, 9, 3),
    type: RequestType.Tutorial,
    offers: []
  },
  {
    id: '9458c6dc-6347-4c6b-b69b-5366f3cb2149',
    description: 'need more mobile for new student',
    requestDate: new Date(2022, 9, 3),
    school: schools[1],
    numRequired: 30,
    resourceType: ResourceType.MobileDevice,
    type: RequestType.Resource,
    offers: []
  },
  {
    id: 'aefb7fd0-806b-4917-a6b3-2ffabcb8eeff',
    description: 'I need help tomorrow',
    requestDate: new Date(2022, 9, 13),
    school: schools[1],
    numRequired: 5,
    resourceType: ResourceType.NetworkingEquipment,
    type: RequestType.Resource,
    offers: []
  },
  {
    id: '513cbd92-8ac4-4348-823d-13957851047a',
    description: 'need more computer for new student',
    requestDate: new Date(2021, 12, 15),
    school: schools[0],
    numRequired: 10,
    resourceType: ResourceType.PersonalComputer,
    type: RequestType.Resource,
    offers: []
  },
  {
    id: '9dc17073-c942-4f74-8568-2d2e31991a0c',
    description: 'Chinese teacher required',
    requestDate: new Date(2022, 9, 15 ),
    school: schools[1],
    numOfStudent: 10,
    studentLevel: StudentLevel.Intermediate,
    proposedDateTime: new Date(2022, 9, 25),
    type: RequestType.Tutorial,
    offers: []
  },
  {
    id: '6e1de214-8d1f-484d-9434-4fc9974fde2b',
    description: 'need android phone',
    requestDate: new Date(2022, 8, 1),
    school: schools[1],
    numRequired: 7,
    resourceType: ResourceType.MobileDevice,
    type: RequestType.Resource,
    offers: []
  },
  {
    id: '50319ad1-89e6-4524-9b56-45d12ce56e72',
    description: 'math teacher required',
    requestDate: new Date(2022, 8, 22),
    school: schools[0],
    numOfStudent: 35,
    studentLevel: StudentLevel.Beginner,
    proposedDateTime: new Date(2022, 9, 10),
    type: RequestType.Tutorial,
    offers: []
  },
]

export const users: User[] = [
  {
      id: '80ce5f0c-a76b-42ce-8e56-d9d0e49e06ce',
      username: 'teacher',
      password: '12345678',
      email: 'teacher@gmail.com',
      phoneNo: '012-41242553',
      fullname: 'John Doe',
      position: 'Teacher',
      staffId: '290c0fcc-286d-4f0f-9123-7e7b45e96fb7',
      school: schools[0],
      type: UserType.SchoolAdmin,
  },
  {
    id: 'c0cdbd5b-5963-4aac-bcc2-6336392f7b63',
    username: 'volunteer',
    password: '12345678',
    email: 'volunteer@gmail.com',
    phoneNo: '012-41242553',
    fullname: 'Kain Elain',
    occupation: 'Teacher',
    dob: new Date(2000, 1, 1),
    type: UserType.Volunteer,
  }
]
