import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateProductLeadDto {
  /**
   * Product Lead Email
   * @example 'pl@mail.com'
   */
  @IsNotEmpty()
  @IsEmail()
    email: string;

  /**
   * Product Lead Name
   * @example 'Product Lead'
   */
  @IsNotEmpty()
    name: string;

  /**
   * Product Lead Status
   * 1 - Active
   * 0 - Inactive
   * @example '1'
   */
  @IsNotEmpty()
    status = '1';
}
