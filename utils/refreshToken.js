import jwt  from "jsonwebtoken";
export const generateNewToken = (id) => {
    return jwt.sign({id}, 'mysecret', {expiresIn: '3d',})
}