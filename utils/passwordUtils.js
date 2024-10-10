import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const passwordMatch = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export { hashPassword, passwordMatch };
