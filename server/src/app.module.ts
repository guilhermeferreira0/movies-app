import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3307,
      database: 'nestjs',
      password: 'secret',
      username: 'root',
      synchronize: true,
      entities: [User],
    }), 
    AuthModule, 
    UsersModule
  ],
  controllers: [],
})
export class AppModule {}
