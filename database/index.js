import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { dbSchema } from "./schema";
import { BookingModel, UserModel } from "./models";

const adapter = new SQLiteAdapter({
  schema: dbSchema,
});

const database = new Database({
  adapter,
  modelClasses: [UserModel, BookingModel],
});

export default database;
