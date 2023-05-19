import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentsDto {
  /**
   * Department Name
   * @example 'Technology'
   */
  @IsNotEmpty()
  name: string;
  /**
   * Department Status
   * 1 - Active
   * 0 - Inactive
   * @example '1'
   */
  @IsNotEmpty()
  status = '1';
}
