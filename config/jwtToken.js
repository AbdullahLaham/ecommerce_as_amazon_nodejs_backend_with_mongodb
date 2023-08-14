import jwt from 'jsonwebtoken';
export const generateToken = (id) =>  {
    return jwt.sign({ id }, 'mysecret', {expiresIn: '3d'},);

}
