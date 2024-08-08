import { create } from "zustand";

const globalStore = create((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
  user: {
    name: "",
    email: "",
    mobile: "",
    birthdate: "",
    bookings: [],
  },
  setUser: (updatedUser) =>
    set((state) => ({
      user: {
        ...state.user,
        ...updatedUser,
      },
    })),
}));

export default globalStore;
