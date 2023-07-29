import { BadRequestException } from '@nestjs/common';
import { validate } from 'uuid';

export const isIdValid = (id: string) => {
    console.log('validate', !validate(id));

    if (!validate(id)) {
        throw new BadRequestException('Not valid id');
    }
};
