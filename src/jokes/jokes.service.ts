import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Joke, JokeDocument } from './schemas/joke.schema';
import { CreateJokeDto } from './dto/create-joke.dto';

@Injectable()
export class JokesService {
  constructor(@InjectModel(Joke.name) private jokeModel: Model<JokeDocument>) {}

  async create(createJokeDto: CreateJokeDto): Promise<Joke> {
    const createdJoke = new this.jokeModel(createJokeDto);
    return createdJoke.save();
  }

  async findAll(): Promise<Joke[]> {
    return this.jokeModel.find().exec();
  }

  async oldest(): Promise<Joke> {
    return this.jokeModel.findOne().sort({ createdAt: 1 }).exec();
  }

  async deleteOldest(): Promise<Joke> {
    return this.jokeModel.findOneAndDelete({}, { sort: { createdAt: 1 } }).exec();
  }
}
