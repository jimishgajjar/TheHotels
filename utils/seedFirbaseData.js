import firestore from "@react-native-firebase/firestore";

async function seedRoomsData() {
  console.log("Seeding rooms data...");

  const roomsCollection = firestore().collection("rooms");

  // Room data to be added
  const rooms = [
    {
      id: 1,
      name: "Luxury Suite",
      imageUri:
        "https://a0.muscache.com/im/pictures/miso/Hosting-1114472183038966301/original/b9b9d019-63f3-4ba9-9748-b8e7319426d3.jpeg?im_w=720",
      description: "Spacious luxury suite with ocean view",
      price: 300,
    },
    {
      id: 2,
      name: "Deluxe Room",
      imageUri:
        "https://a0.muscache.com/im/pictures/miso/Hosting-1114472183038966301/original/b9b9d019-63f3-4ba9-9748-b8e7319426d3.jpeg?im_w=720",
      description: "Comfortable deluxe room with city view",
      price: 200,
    },
    {
      id: 3,
      name: "Standard Room",
      imageUri:
        "https://a0.muscache.com/im/pictures/miso/Hosting-1114472183038966301/original/b9b9d019-63f3-4ba9-9748-b8e7319426d3.jpeg?im_w=720",
      description: "Cozy standard room with garden view",
      price: 100,
    },
  ];

  // Add room items
  for (const room of rooms) {
    console.log("Room:", room);
    try {
      await roomsCollection.add({
        name: room.name,
        imageUri: room.imageUri,
        description: room.description,
        price: room.price,
      });
      console.log(`Room added successfully: ${room.name}`);
    } catch (error) {
      console.error(`Error adding room: ${room.name}`, error);
    }
  }
}

export default seedRoomsData;
