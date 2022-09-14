import crypto from "crypto";
import bcrypt from "bcryptjs";

export function hashPassword(password: string) {
  /*
   * Creating a unique salt for a particular user
   * Salt is a random bit of data added to the user's password
   * Salt means that every password's hash is going to be unique
   */
  const salt = bcrypt.genSaltSync(10);

  const hash = bcrypt.hashSync(password, salt);
  return { hash, salt };
}

export function verifyPassword({
  candidatePassword,
  salt,
  hash,
}: {
  candidatePassword: string;
  salt: string;
  hash: string;
}) {
  /*
   * Create a hash with the salt from the user and the password
   * the user tried to login with
   */
  const hashToVerify = bcrypt.hashSync(candidatePassword, salt);

  /*
   * If the hash matches the hash we have stored for the user
   * then the candidate password is correct
   */

  return bcrypt.compareSync(candidatePassword, hash);
}
