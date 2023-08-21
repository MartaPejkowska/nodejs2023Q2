import { BadRequestException } from '@nestjs/common';
import { validate } from 'uuid';

export const isIdValid = (id: string) => {
  if (!validate(id)) {
    throw new BadRequestException('Not valid id');
  }
};
