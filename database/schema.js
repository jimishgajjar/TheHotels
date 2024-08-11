import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const dbSchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "users",
      columns: [
        { name: "name", type: "string" },
        { name: "email", type: "string" },
        { name: "mobile", type: "string" },
        { name: "password", type: "string" },
      ],
    }),
    tableSchema({
      name: "bookings",
      columns: [
        { name: "user_id", type: "string" },
        { name: "room_id", type: "string" },
        { name: "persons", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
