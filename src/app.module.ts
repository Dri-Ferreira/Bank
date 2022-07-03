import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
