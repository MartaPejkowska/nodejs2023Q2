import { BadRequestException } from '@nestjs/common';

const regexExp =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

export const isIdValid = (id: string) => {
  if (!regexExp.test(id)) {
    throw new BadRequestException('Not valid id');
  }
};
