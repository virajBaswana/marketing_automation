import { eq } from "drizzle-orm";
import { DB } from "../../db";
import { User, UserTable } from "../user/user.schema";
import { CustomError } from "../../types/global.types";

export const FindUserByEmail = async (email: string) => {
  try {
    const checkEmail: User[] = await DB.select()
      .from(UserTable)
      .where(eq(UserTable.email, email));
    return checkEmail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const SaveUserSignup = async (
  email: string,
  hashedpassword: string
) => {
  try {
    const saveUser = await DB.insert(UserTable)
      .values({ email, password: hashedpassword })
      .returning();
      return saveUser
  } catch (error) {
    console.log(error);
    throw new CustomError("Database error" , 500 , error as Error);
  }
};
