export type ReportStatus = 'pending' | 'approved' | 'rejected';

export interface Location {
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  username: string;
  points: number;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  problem_type: string;
  significance: string;
  location: Location;
  status: ReportStatus;
  imageUrl?: string;
  reporter: User;
  createdAt: Date;
}