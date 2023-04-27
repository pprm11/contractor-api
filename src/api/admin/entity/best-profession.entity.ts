import { Exclude, Expose, Transform } from 'class-transformer';
export class BestProfessionSerializer {
  @Exclude()
  _sum: {
    price: number;
  };

  @Expose()
  profession: string;

  @Expose()
  // To-do refactor this to avoid repetition
  @Transform(({ value }) => ({ amount: value / 10000, currency_code: 'USD' }))
  get price(): number {
    return this._sum.price;
  }

  constructor(partial: Partial<BestProfessionSerializer>) {
    Object.assign(this, partial);
  }
}
