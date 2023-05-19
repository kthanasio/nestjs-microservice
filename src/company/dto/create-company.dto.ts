import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  /**
   * Company name
   * @example 'Company Name'
   */
  @IsNotEmpty()
    name: string;

  /**
   * Company Status
   * 1 - Active
   * 0 - Inactive
   * @example '1'
   */
  @IsNotEmpty()
    status = '1';
}
