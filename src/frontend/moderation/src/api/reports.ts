import { api } from '../lib/axios';

export interface Report {
  id: number;
  userId: number;
  description: string;
  photoUrl: string;
  status: string;
  createdAt: string;
  validatedAt: string | null;
  latitude: number;
  longitude: number;
  category: string;
  problemType: string;
  relevance: string;
}

export async function list() {
  const { data } = await api.get<Report[]>('reports');
  return data;
}

export async function validateReport(id: number, status: string) {
  const { data } = await api.put<Report>(`reports/${id}?status=${status}`);
  return data;
}