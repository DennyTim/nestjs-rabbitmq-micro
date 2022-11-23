import {
  Controller,
  Logger,
  Post,
  UseGuards
} from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { UserId } from "../guards/user.decorator";
import {
  Cron,
  CronExpression
} from "@nestjs/schedule";

@Controller("user")
export class UserController {

  @UseGuards(JwtAuthGuard)
  @Post("info")
  async info(@UserId() userId: string) {
    return userId;
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async cron() {
    Logger.log('Done')
  }
}
