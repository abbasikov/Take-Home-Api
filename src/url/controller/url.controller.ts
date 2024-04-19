import {
  Controller,
  Post,
  Get,
  Put,
  Res,
  Param,
  Delete,
  Body,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { Schema } from 'mongoose';
import { Response } from 'express';
import { UrlService } from '../service/url.service';
import { CreateUrlDto } from '../dto/url.dto';
import { AuthGuard } from 'src/auth/guards/jwt-auth-guard';
@Controller('')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('/api/url/create')
  @UseGuards(AuthGuard)
  create(@Body() SaveUrlDto: CreateUrlDto) {
    try {
      return this.urlService.createUrl(SaveUrlDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Put('/api/url/update')
  @UseGuards(AuthGuard)
  update(@Query('urlId') urlId: Schema.Types.ObjectId) {
    try {
      return this.urlService.updateUrl(urlId);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Delete('/api/url/delete')
  @UseGuards(AuthGuard)
  delete(@Query('urlId') urlId: Schema.Types.ObjectId) {
    try {
      return this.urlService.deleteUrl(urlId);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get('/api/url/history')
  @UseGuards(AuthGuard)
  history(@Query('userId') userId: Schema.Types.ObjectId) {
    try {
      return this.urlService.getUrlhistory(userId);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get('/:slug')
  fetch(@Param('slug') slug: string, @Res() res: Response) {
    try {
      return this.urlService.fetchSlugUrl(slug, res);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
