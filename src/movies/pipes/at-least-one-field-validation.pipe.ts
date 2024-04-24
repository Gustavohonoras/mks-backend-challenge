import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { UpdateMovieDto } from "../dto/update-movie.dto";

@Injectable()
export class AtLeastOneFieldValidationPipe implements PipeTransform {
  transform(updateMovieDto: UpdateMovieDto) {
    const { title, description, releaseYear } = updateMovieDto;
    if (!(title || description || releaseYear)) {
      throw new BadRequestException("At least one field must be provided");
    }
    return updateMovieDto;
  }
}
