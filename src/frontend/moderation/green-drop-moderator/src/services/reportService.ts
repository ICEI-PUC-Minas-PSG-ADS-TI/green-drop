import axios from 'axios';
import { Report } from '../types';

const API_BASE = process.env.REACT_APP_API_URL?.replace(/\/+$/, '') || '';

// If API_BASE is empty, return mock data for offline/dev
export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Cratera na Rua das Flores',
    description: 'Cratera profunda impedindo passagem de pedestres.',
    category: 'Infraestrutura',
    problem_type: 'Buraco',
    significance: 'Alta',
    location: { lat: -23.55100, lng: -46.634000 },
    status: 'pending',
    reporter: { id: 'u1', username: 'jdoe', points: 120 },
    createdAt: new Date('2025-06-01T10:30:00Z'),
    imageUrl: 'https://picsum.photos/id/43/200/300'
  },
  {
    id: '2',
    title: 'Lixeira transbordando no Parque Central',
    description: 'Coleta não realizada há 3 dias.',
    category: 'Limpeza Urbana',
    problem_type: 'Lixo',
    significance: 'Média',
    location: { lat: -23.549500, lng: -46.632000 },
    status: 'pending',
    reporter: { id: 'u2', username: 'msilva', points: 75 },
    createdAt: new Date('2025-06-03T14:20:00Z'),
    imageUrl: 'https://picsum.photos/id/43/200/300'
  },
  {
    id: '3',
    title: 'Semáforo apagado na Av. Paulista',
    description: 'Sinal está totalmente sem luz há mais de 5 horas.',
    category: 'Trânsito',
    problem_type: 'Semáforo',
    significance: 'Alta',
    location: { lat: -23.561500, lng: -46.655000 },
    status: 'approved',
    reporter: { id: 'u3', username: 'rborges', points: 200 },
    createdAt: new Date('2025-06-04T19:45:00Z'),
    imageUrl: 'https://picsum.photos/id/43/200/300'
  },
  {
    id: '4',
    title: 'Iluminação pública falhando no bairro Jardim',
    description: 'Postes piscando constantemente durante a noite.',
    category: 'Iluminação',
    problem_type: 'Poste',
    significance: 'Baixa',
    location: { lat: -23.558000, lng: -46.640000 },
    status: 'rejected',
    reporter: { id: 'u4', username: 'acarvalho', points: 45 },
    createdAt: new Date('2025-06-05T21:10:00Z'),
    imageUrl: 'https://picsum.photos/id/43/200/300'
  },
];

export const fetchReports = async (status: Report['status']): Promise<Report[]> => {
  if (!API_BASE) {
    return mockReports.filter(r => r.status === status);
  }
  const { data } = await axios.get<Report[]>(`${API_BASE}/moderation/reports`, {
    params: { status },
  });
  return data.map(r => ({ ...r, createdAt: new Date(r.createdAt) }));
};

export const approveReport = async (id: string): Promise<void> => {
  if (!API_BASE) {
    console.log(`Mock approve ${id}`);
    return;
  }
  await axios.post(`${API_BASE}/moderation/reports/${id}/approve`);
};

export const rejectReport = async (id: string): Promise<void> => {
  if (!API_BASE) {
    console.log(`Mock reject ${id}`);
    return;
  }
  await axios.post(`${API_BASE}/moderation/reports/${id}/reject`);
};