import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthDTO } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthRequest } from './utils/request-interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: AuthRequest): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginAndRedirect(@Req() req: AuthRequest): Promise<any> {
    return this.appService.googleLogin(req);
  }

  @UseGuards(AuthGuard('local'))
  @Post('local/login')
  async localLogin(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('jwt/login')
  async jwtLogin(@Body() dto: AuthDTO) {
    console.log();
    return this.appService.login(dto.email, dto.password);
  }
}
