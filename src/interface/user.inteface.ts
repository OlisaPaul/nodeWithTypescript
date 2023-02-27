import { Document } from "mongoose";

interface Iuser extends Document {
  name?: string;
  email: string;
  password: string;
}

export default Iuser;
