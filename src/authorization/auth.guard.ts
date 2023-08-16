import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET_KEY,
            });
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        console.log('request.headers.authorization', request.headers.authorization);
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

// import { Injectable, ExecutionContext } from '@nestjs/common';
// import { AuthGuard, IAuthGuard } from '@nestjs/passport';
// import { Request } from 'express';
// import { UserEntity } from 'src/users/entity/user.entity';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
//   public handleRequest(err: unknown, user: UserEntity): any {
//     return user;
//   }

//   public async canActivate(context: ExecutionContext): Promise<boolean> {
//     await super.canActivate(context);

//     const { user} : Request = context.switchToHttp().getRequest();

//     if(!user) return false;

//     if(user instanceof UserEntity) {
//       return true
//     }
//     return  false;
//   }

// }
