import {
  IUser,
  IUserCourses,
  PurchaseState,
  UserRole
} from "@nestjs-micro/interfaces";
import {
  compare,
  genSalt,
  hash
} from "bcryptjs";

export class UserEntity implements IUser {
  _id?: string;
  displayName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  courses?: IUserCourses[];

  constructor(user: IUser) {
    this._id = user._id;
    this.displayName = user.displayName;
    this.passwordHash = user.passwordHash;
    this.email = user.email;
    this.role = user.role;
    this.courses = user.courses;
  }

  public setCourseStatus(courseId: string, state: PurchaseState) {
    const exist = this.courses.find(c => c._id === courseId);
    if (!exist) {
      this.courses.push({
        courseId,
        purchaseState: PurchaseState.Started
      });
      return this;
    }

    if (state === PurchaseState.Canceled) {
      this.courses = this.courses.filter(c => c._id !== courseId);
      return this;
    }

    this.courses = this.courses.map(c => {
      if (c._id === courseId) {
        c.purchaseState = state;
        return c;
      }
      return c;
    });
  }

  public getPublicProfile() {
    return {
      email: this.email,
      role: this.role,
      displayName: this.displayName
    };
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }

  public updateProfile(displayName: string) {
    this.displayName = displayName;
    return this;
  }
}