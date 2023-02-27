import { Document } from "mongoose";

interface RoomInterface extends Document {
  name: string;
  price: number;
  roomType: string;
}

export default RoomInterface;
