import {
  IUser,
  IUserCourses,
  PurchaseState,
  UserRole
} from "@nestjs-micro/interfaces";
import {
  Prop,
  Schema,
  SchemaFactory
} from "@nestjs/mongoose";
import {
  Document as MongooseDocument,
  Types
} from "mongoose";

@Schema()
export class UserCourses extends MongooseDocument implements IUserCourses {
  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true, enum: PurchaseState, type: String })
  purchaseState: PurchaseState;
}

export const UserCoursesSchema = SchemaFactory.createForClass(UserCourses);

@Schema()
export class User extends MongooseDocument implements IUser {
  @Prop()
  public displayName: string;

  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop({
    required: true,
    enum: UserRole,
    type: String,
    default: UserRole.Student
  })
  public role: UserRole;

  @Prop({
    type: [UserCoursesSchema]
  })
  courses: Types.Array<UserCourses>;
}

export const UserSchema = SchemaFactory.createForClass(User);
