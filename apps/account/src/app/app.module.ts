import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { RMQModule } from "nestjs-rmq";
import { AuthModule } from "./auth/auth.module";
import { getMongoConfig } from "./configs/mongo.config";
import { getRMQConfig } from "./configs/rmq.config";
import { UserModule } from "./user/user.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: "envs/.account.env" }),
    UserModule,
    AuthModule,
    RMQModule.forRootAsync(getRMQConfig()),
    MongooseModule.forRootAsync(getMongoConfig())
  ]
})
export class AppModule {
}
