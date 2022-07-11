import { Injectable } from '@nestjs/common';
import { UsersService } from '~/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.users.findByEmail(email);

    if (!user) throw new Error('Usuário não existe!');

    const checkedPass = await bcrypt.compare(password, user.password);

    if (user && checkedPass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      name: user.name,
    };

    return {
      token: this.jwt.sign(payload),
    };
  }

  async getMe(token: string) {
    const decoded = this.jwt.decode(token, { json: true });

    if (decoded && typeof decoded !== 'string') {
      const user = await this.users.findById(decoded.sub);

      user.password = undefined;

      return user;
    }

    throw new Error('Token inválido!');
  }
}
