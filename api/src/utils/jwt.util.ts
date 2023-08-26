import jwt, { JwtPayload } from 'jsonwebtoken';

export const jwtUtil = {
    sign: (payload: JwtPayload) => {
        return jwt.sign(payload, process.env.JWT_PRIVATE_KEY!, { expiresIn: '1h' });
    },
    verify: (token: string): JwtPayload | string => {
        try {
            return jwt.verify(token, process.env.JWT_PRIVATE_KEY!);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
};
