import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Request,
  Delete,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { MoviesService } from "../service/movies.service";
import { CreateMovieDto } from "../dto/create-movie.dto";
import { UpdateMovieDto } from "../dto/update-movie.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth-guard";
import { UserId } from "../decorators/user-is.decorator";
import { AtLeastOneFieldValidationPipe } from "../pipes/at-least-one-field-validation.pipe";
import { ApiBody, ApiTags } from "@nestjs/swagger";
@ApiTags("movies")
@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post("create")
  @ApiBody({type: CreateMovieDto})
  @UseGuards(JwtAuthGuard)
  async create(
    @UserId() userId: number,
    @Body(ValidationPipe) createMovieDto: CreateMovieDto,
  ) {
    return this.moviesService.create(createMovieDto, userId);
  }

  @Get("index")
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.moviesService.findAll();
  }

  @Get("show/:id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string) {
    return this.moviesService.findOne(id);
  }

  @Put("update/:id")
  @ApiBody({ type: UpdateMovieDto })
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id") id: string,
    @Body(
      new ValidationPipe({ transform: true }),
      AtLeastOneFieldValidationPipe,
    )
    updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete("delete/:id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.moviesService.delete(id);
  }
}
