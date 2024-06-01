// src/interfaces/Room.ts
export interface RoomInterface {
  _id: string;
  videoUrl: string[];
  roomId: string;
  createdBy: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}
