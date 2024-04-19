import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlController } from './controller/url.controller';
import { UrlService } from './service/url.service';
import { UrlSchema } from './schema/url.schema';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Url', schema: UrlSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'itsATestSecret', // Provide your secret key here
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
