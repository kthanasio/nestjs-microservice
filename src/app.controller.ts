import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';

@Controller('health')
@ApiTags('health')
export class AppController {
  @Get()
  @Public()
  async health() {
    return { message: 'OK' };
  }
}
