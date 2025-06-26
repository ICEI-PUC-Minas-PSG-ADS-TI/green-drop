import { api } from '../lib/axios';

export interface User {
  id: number
  name: string
  email: string
  phone: string
  photoUrl: string
  createdAt: string
  firebaseUid: string
  points: number
}

export async function listUsers() {
    const { data } = await api.get<User[]>('users');
    return data;
}