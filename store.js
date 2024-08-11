import { create } from "zustand";

const globalStore = create((set) => ({
  user: null,
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
  setUser: (user) => set({ user }),
}));

export default globalStore;
