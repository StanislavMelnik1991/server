import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLE } from 'src/constants/user.constants';
import { JwtPayload } from 'src/types/jwt.type';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<Array<ROLE>>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const [type, token] = req.headers.authorization.split(' ');
      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'unauthorized user' });
      }
      const user: JwtPayload = this.jwtService.verify(token);
      req.user = user;
      return requiredRoles.includes(user.role);
    } catch (e) {
      throw new UnauthorizedException({ message: 'unauthorized user' });
    }
  }
}
