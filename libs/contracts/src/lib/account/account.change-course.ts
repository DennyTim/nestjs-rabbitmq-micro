import { IsString } from "class-validator";
import { PurchaseState } from "@nestjs-micro/interfaces";

export namespace AccountChangedCourse {
  export const topic = "account.changed-course.event";

  export class Request {
    @IsString()
    userId: string;

    @IsString()
    courseId: string;

    @IsString()
    state: PurchaseState;
  }
}
