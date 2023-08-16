import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // private readonly logger = new Logger('app service');
  getHello(): string {
    // this.logger.log('in app service')
    return 'Hello World!';
  }
}
