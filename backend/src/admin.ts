import bcrypt from 'bcrypt';
import { User } from 'src/schemas';
import { ISimpleUser } from 'src/types';

const PW_ENCRYPT_ROUNDS = 14

// this object should be retrieved from environment variables
const admin: ISimpleUser = {
    username: 'sys-admin',
    password: 'hello-world',
    email: 'admin@email.com',
    fullname: 'Arshia Gh',
    phoneNo: '+60 1124345464'
}

export async function findOrCreateAdmin() {
    const found = await User.findOne({ username: admin.username })
    return found ?? User.create({ 
        ...admin, 
        password: await bcrypt.hash(admin.password, PW_ENCRYPT_ROUNDS) 
    })
}