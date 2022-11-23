import {
  AccountLogin,
  AccountRegister
} from "@nestjs-micro/contracts";
import {
  Body,
  Controller,
  Logger
} from "@nestjs/common";
import {
  Message,
  RMQMessage,
  RMQRoute,
  RMQValidate
} from "nestjs-rmq";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @RMQValidate()
  @RMQRoute(AccountRegister.topic)
  async register(
    dto: AccountRegister.Request,
    @RMQMessage msg: Message
  ): Promise<AccountRegister.Response> {
    const requestId = msg.properties.headers['requestId'];
    const logger = new Logger(requestId);
    logger.error('Test error')
    return this.authService.register(dto);
  }

  @RMQValidate()
  @RMQRoute(AccountLogin.topic)
  async login(@Body() { email, password }: AccountLogin.Request): Promise<AccountLogin.Response> {
    const { id } = await this.authService.validateUser(email, password);
    return this.authService.login(id);
  }
}
