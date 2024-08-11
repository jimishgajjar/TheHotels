import { Model } from "@nozbe/watermelondb";
import { json, field, date } from "@nozbe/watermelondb/decorators";

export class UserModel extends Model {
  static table = "users";

  @field("name") name;
  @field("email") email;
  @field("mobile") mobile;
  @field("password") password;
}

export class BookingModel extends Model {
  static table = "bookings";

  @field("user_id") userId;
  @field("room_id") roomId;
  @field("persons") _persons;
  @date("created_at") createdAt;
  @date("updated_at") updatedAt;

  get persons() {
    try {
      return JSON.parse(this._persons || "{}"); // Deserialize JSON
    } catch (error) {
      console.error("Error parsing persons JSON:", error);
      return {};
    }
  }

  set persons(value) {
    try {
      this._persons = JSON.stringify(value); // Serialize JSON
    } catch (error) {
      console.error("Error stringifying persons JSON:", error);
    }
  }
}
