import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async create(@Body(new ValidationPipe()) data: CreateUserDto) {
        return this.userService.create(data)
    }

    @Get()
    async findAll() {
        return this.userService.findAll()
    }

    @Get(":username")
    async findByUsername(username: string) {
        return await this.userService.findByUsername(username)
    }
}
