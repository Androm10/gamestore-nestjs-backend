import { BadRequestException } from '@nestjs/common';

export function transformToIso(datestring: string) {
  try {
    const date = new Date(datestring);
    return date.toISOString();
  } catch (error) {
    throw new BadRequestException('Invalid date');
  }
}
