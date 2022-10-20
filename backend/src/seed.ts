import { performance } from 'perf_hooks'
import mongoose from 'mongoose'
import dayjs from 'dayjs'

import { faker } from '@faker-js/faker'
import { SchoolModel } from './schemas/school.schema'
import { SchoolAdmin, Volunteer } from './schemas/user.schema'
import { Tutorial, Resource } from './schemas/request.schema'

import env from './environment'

type ObjectId = mongoose.Types.ObjectId

async function _measure<F extends (...any: any[]) => any>(
    callback: F, 
    ...args: Parameters<F>
): Promise<ReturnType<F>> {
    const start = performance.now()
    const result = await callback(...args)
    const end = performance.now()
    console.log(
        `[Perf] Executed ${callback.name} function in ${(end - start).toFixed(0)}ms`
    );
    return result
}

function pick<T>(array: T[]) {
    return array[faker.datatype.number(array.length)]
}

function createUsers(count: number) {
    return Array(count).fill(null)
        .map(() => ({
                username: faker.internet.userName(),
                password: faker.internet.password(),
                email:    faker.internet.email(),
                phoneNo:  faker.phone.number(),
                fullname: faker.name.fullName(),
            })
        )
}

function createSchools(count: number) {
    const schools = Array(count).fill(null)
        .map(() => ({
                name: faker.company.name(),
                address: {
                    city: faker.address.city(),
                    street: faker.address.streetAddress(),
                    state: faker.address.state(),
                }
            })
        )
    return SchoolModel.insertMany(schools)
}

function createSchoolAdmins(schoolIds: mongoose.Types.ObjectId[], count: number) {
    const schoolAdmins = schoolIds
        .map(schoolId => 
            createUsers(count)
                .map(user => ({
                        ...user,
                        position: faker.name.jobType(),
                        staffId: faker.datatype.number(),
                        school: schoolId
                    })
                )
        ).flat()
    return SchoolAdmin.insertMany(schoolAdmins)
}

function createVolunteers(count: number) {
    const volunteers = createUsers(count)
        .map(user => ({
                ...user,
                dob: dayjs(faker.date.birthdate()).startOf('day').toDate(),
                occupation: faker.name.jobTitle()
            })
        )
    return Volunteer.insertMany(volunteers)
}

function createRequests(admins: { _id: ObjectId, school: ObjectId }[], count: number) {
    return admins.map(admin =>
        Array(count).fill(null)
            .map(() => ({
                    title: faker.lorem.sentence(),
                    description: faker.lorem.paragraph(),                })
            )
    ).flat()
}

function createTutorials(admins: { _id: ObjectId, school: ObjectId }[], count: number) {
    const studentLevels = ['Beginner', 'Intermediate', 'Advanced']
    const tutorials = createRequests(admins, count)
        .map(req => ({
                ...req,
                proposedDateTime: dayjs(faker.date.future()).startOf('hour').toDate(),
                studentLevel: pick(studentLevels),
                numOfStudents: faker.datatype.number({ min: 10, max: 100 })
            })
        )
    return Tutorial.insertMany(tutorials)
}

function createResources(admins: { _id: ObjectId, school: ObjectId }[], count: number) {
    const resourceType = ['MobileDevice', 'PersonalComputer', 'NetworkingEquipment']
    const resources = createRequests(admins, count)
        .map(req => ({
                ...req,
                numRequired: faker.datatype.number({ min: 10, max: 100 }),
                resourceType: pick(resourceType),
            })
        )
    return Resource.insertMany(resources)
}


mongoose.connect(env.databaseUrl)
.then(async mongo => {
    await mongo.connection.db.dropDatabase()

    const schools = await _measure(createSchools, 10)
    const schoolAdmins = await _measure(createSchoolAdmins, schools.map(s => s._id), 3)
    
    await _measure(createTutorials, schoolAdmins, 5)
    await _measure(createResources, schoolAdmins, 5)
    await _measure(createVolunteers, 20)
})
.then(() => process.exit(0))
.catch(console.error)
