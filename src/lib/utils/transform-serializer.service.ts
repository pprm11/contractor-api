import { Injectable } from '@nestjs/common';

@Injectable()
export class TransformSerializer {
  transform<T>(
    testType: new (partial: Partial<T>) => T,
    partials: Partial<T>[] | Partial<T>,
  ) {
    if (Array.isArray(partials)) {
      return partials.map((partial) => new testType(partial));
    }
    return [new testType(partials)];
  }
}
