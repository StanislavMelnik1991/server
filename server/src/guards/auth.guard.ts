import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JwtPayload } from 'src/types/jwt.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const [type, token] = req.headers.authorization.split(' ');
      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'unauthorized user' });
      }
      const user: JwtPayload = this.jwtService.verify(token);
      req.user = user;
      return !!user.id && !!user.email && !!user.role;
    } catch (e) {
      throw new UnauthorizedException({ message: 'unauthorized user' });
    }
  }
}
