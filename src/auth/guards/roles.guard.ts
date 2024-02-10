import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Reflector } from '@nestjs/core'
import { UserService } from '../../user/service/user.service'
import { Observable } from 'rxjs'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user
    return true
  }
}
