import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';

export async function login(username, password) {
    let authenticated = false;
    // [TODO]: enable users to login with case-insensitive username
    // - users should be able to display their username as they entered in registration
    // - users should be able to login with case-insensitive username
    const user = await UserModel.findOne({ username: username.toLowerCase() });
    
    if (user) {
        authenticated = await bcrypt.compare(password, user.password);
    }

    return authenticated ? user : null;
}

export default {
    login,
}