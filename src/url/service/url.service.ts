import {
  Injectable,
  NotFoundException,
  ConflictException,
  HttpStatus,
} from '@nestjs/common';

import { Model, Schema } from 'mongoose';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';

import urlNotFound from '../utils/not-found';

import { CreateUrlDto } from '../dto/url.dto';
import {
  Url as UrlInterface,
  UpdateUrl as UpdateUrlInterface,
} from '../interface/url.interface';
import { shortenUrl } from '../utils/helpers';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel('Url') private readonly urlModel: Model<UrlInterface>,
  ) {}

  async createUrl(createUrlDto: CreateUrlDto): Promise<UrlInterface> {
    try {
      const { userId, url } = createUrlDto;
      if (!userId || !url)
        throw new NotFoundException('Please Provide Completed Data');

      const alreadyExists = await this.urlModel.findOne({
        userId,
        actualUrl: url,
      });
      if (alreadyExists) throw new NotFoundException('Url Already Exists');

      let shortenedUrl: string;
      let urlAlreadyExists: boolean;
      do {
        shortenedUrl = shortenUrl();
        urlAlreadyExists = await this.urlModel.findOne({ shortenedUrl });
      } while (urlAlreadyExists);

      const data = await this.urlModel.create({
        userId,
        actualUrl: url,
        shortenedUrl,
        urlHistory: [{ previousUrl: 'N/A', currentUrl: shortenedUrl }],
      });
      return data;
    } catch (err) {
      throw new ConflictException(`Error creating url: ${err.message}`);
    }
  }

  async updateUrl(urlId: Schema.Types.ObjectId): Promise<UpdateUrlInterface> {
    try {
      if (!urlId) throw new NotFoundException('Please Provide Completed Data');

      let shortenedUrl: string;
      let urlAlreadyExists: boolean;
      do {
        shortenedUrl = shortenUrl();
        urlAlreadyExists = await this.urlModel.findOne({
          _id: { $ne: urlId },
          shortenedUrl,
        });
      } while (urlAlreadyExists);

      const { shortenedUrl: previousUrl } =
        (await this.urlModel.findOne({ _id: urlId })) || {};
      await this.urlModel.findOneAndUpdate(
        {
          _id: urlId,
        },
        {
          $set: {
            shortenedUrl,
          },
          $push: {
            urlHistory: [
              {
                previousUrl,
                currentUrl: shortenedUrl,
                createdAt: new Date(),
              },
            ],
          },
        },
      );

      return { message: 'Url Has Been Successfuly Updated' };
    } catch (err) {
      throw new ConflictException(`Error creating url: ${err.message}`);
    }
  }

  async deleteUrl(urlId: Schema.Types.ObjectId): Promise<UpdateUrlInterface> {
    try {
      await this.urlModel.findOneAndDelete({ _id: urlId });
      return { message: 'Url Has Been Successfuly Deleted' };
    } catch (err) {
      throw new ConflictException(`Error fetching Url: ${err.message}`);
    }
  }

  async fetchSlugUrl(slug: string, res: Response): Promise<void> {
    try {
      const shortenedUrl = process.env.URL_PATH + '/' + slug;
      const { actualUrl } =
        (await this.urlModel.findOne({ shortenedUrl })) || {};
      if (actualUrl) res.redirect(HttpStatus.FOUND, actualUrl);
      else {
        res.status(404).send(urlNotFound);
        return;
      }
    } catch (err) {
      throw new ConflictException(`Error fetching Url: ${err.message}`);
    }
  }

  async getUrlhistory(userId: Schema.Types.ObjectId): Promise<UrlInterface[]> {
    try {
      const userUrls = await this.urlModel
        .find({ userId })
        .sort({ createdAt: -1 });
      return userUrls;
    } catch (err) {
      throw new ConflictException(`Error Fetching History: ${err.message}`);
    }
  }
}
