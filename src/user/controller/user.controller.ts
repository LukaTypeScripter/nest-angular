import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UserService } from '../service/user.service'
import { User } from '../models/user.interface'
import { catchError, map, Observable, of } from 'rxjs'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  create(@Body() user: User): Observable<User> {
    console.log(user)
    return this.userService.create(user).pipe(
      map((user: User) => {
        return user
      }),
      catchError((err) => of({ error: err.message } as User)),
    )
  }
  @Post('login')
  login(@Body() user: User): Observable<object> {
    return this.userService.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt }
      }),
    )
  }
  @Get(`:id`)
  findOne(@Param() params): Observable<User> {
    return this.userService.findOne(params.id)
  }
  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAll()
  }
  @Delete(`:id`)
  deleteOne(@Param(`id`) id: string) {
    return this.userService.deleteOne(Number(id))
  }
  @Put(`:id`)
  updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
    return this.userService.updateOne(Number(id), user)
  }
}
