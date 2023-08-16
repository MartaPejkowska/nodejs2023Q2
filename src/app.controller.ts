import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './authorization/public.decorator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
// import { Controller, Get, Req } from '@nestjs/common';
// import { Request } from 'express';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//     constructor(private readonly appService: AppService) {}

//     @Get()
//     getHello(@Req() req: Request): string {
//         console.log(`${req.protocol}://${req.get('Host')}${req.originalUrl}`);
//         return this.appService.getHello();
//     }
// }
