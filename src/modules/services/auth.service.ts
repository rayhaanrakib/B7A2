import { sql } from "../../db";
import type { SignupRequest, User, UserResponse } from "../../types/user.types";
import bcrypt from "bcrypt";

class AuthService {
  private async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
  async createUser(user: SignupRequest) {
    const { email, name, role, password } = user;
    const hash = await this.hashPassword(password);
    const emailExists = await sql`
        SELECT * FROM users WHERE email = ${email}
        `;
    if (emailExists.length) {
      throw new Error("Email already exists");
    }
    if (!name || !email || !password) {
      throw new Error("Missing required fields");
    }
    const res = await sql`
    INSERT INTO users (name, email, password, role)
    VALUES (${name}, ${email}, ${hash}, COALESCE(${role}, 'contributor'))
    RETURNING id, name, email, role, created_at, updated_at
`;
    return res[0];
  }

  async validateUser(email: string, password: string) {
    const result = await sql`
      SELECT id, name, email, password, role, created_at,updated_at
      FROM users
      WHERE email = ${email}
    `;

    if (!result.length) {
      return null;
    }

    const { password: passwordHash, ...user } = result[0] as User;

    const isValid = await this.comparePassword(password, passwordHash);

    return isValid ? user : null;
  }
  async getUserById(id: number) {
    const res = await sql`
    SELECT id, name, email, role, created_at, updated_at
    FROM users
    WHERE id = ${id}
    `;
    return res[0] as UserResponse;
  }


}
export default new AuthService();
