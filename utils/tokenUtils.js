import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return { accessToken };
};
