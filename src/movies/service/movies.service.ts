import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateMovieDto } from "../dto/create-movie.dto";
import { UpdateMovieDto } from "../dto/update-movie.dto";
import { Repository } from "typeorm";
import { Movie } from "../entities/movie.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import * as validate from "uuid-validate";

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createMovieDto: CreateMovieDto, userId: number): Promise<Movie> {
    const { title, description, releaseYear } = createMovieDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    const movie = this.movieRepository.create({
      title,
      description,
      releaseYear,
      userId: user.id,
    });

    return this.movieRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findOne(id: string): Promise<Movie> {
    return this.movieRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie | string> {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new BadRequestException(`Invalid movie ID format`);
    }

    let movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`Movie with ID '${id}' not found`);
    }

    movie = this.movieRepository.merge(movie, updateMovieDto);

    movie = await this.movieRepository.save(movie);

    return movie;
  }

  async delete(id: string): Promise<object> {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new BadRequestException(`Invalid movie ID format`);
    }

    const movie = await this.movieRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID '${id}' not found`);
    }

    await this.movieRepository.remove(movie);
    return {
      status: 200,
      message: "delete movie",
    };
  }
}
