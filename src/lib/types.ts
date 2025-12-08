import type { Database } from './database.types';

export type Stall = Database['public']['Tables']['stalls']['Row'];
export type GalleryImage = Database['public']['Tables']['gallery']['Row'];
export type Vote = Database['public']['Tables']['votes']['Row'];

export interface DashboardStats {
    stalls: number;
    votes: number;
    gallery: number;
}

export interface LeaderboardEntry extends Stall {
    vote_count: number;
}
