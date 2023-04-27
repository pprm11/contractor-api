import { Exclude, Expose, Transform } from 'class-transformer';

export class BestClientsSerializer {
  @Exclude()
  firstName: string;

  @Exclude()
  lastName: string;

  @Exclude()
  _sum: {
    price: number;
  };

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Expose()
  // To-do refactor this to avoid repetition
  @Transform(({ value }) => ({ amount: value / 10000, currency_code: 'USD' }))
  get price(): number {
    return this._sum.price;
  }

  constructor(partial: Partial<BestClientsSerializer>) {
    Object.assign(this, partial);
  }
}
