import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export interface User extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}
