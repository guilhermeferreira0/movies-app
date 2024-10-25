import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findOne({ email: createUserDto.email });
    if (existingUser) throw new UnauthorizedException('Email in use');

    try {
      const newUser = this.usersRepository.create(createUserDto);

      return await this.usersRepository.save(newUser);
    } catch (e) {
      console.log(e.message);
    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(condition: UpdateUserDto) {
    return await this.usersRepository.findOne({ where: { ...condition } })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOne({ email: updateUserDto.email });
    if (existingUser) throw new UnauthorizedException('Email in use');

    try {
      const updatedUser = this.usersRepository.merge(existingUser, updateUserDto);
      return await this.usersRepository.save(updatedUser);
    } catch (e) {
      console.log(e.message);
    }
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
