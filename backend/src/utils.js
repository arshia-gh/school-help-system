import bcrypt from 'bcrypt';

const HASH_ENCRYPT_RD = 12;

export function toMongooseJson(ret) {
    ret.id = ret._id;
    delete ret.__v;
    delete ret._id;
    return ret;
}

export function hashPassword(password) {
    return bcrypt.hash(password, HASH_ENCRYPT_RD);
}

export default {
    toMongooseJson,
    hashPassword,
}