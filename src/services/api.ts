import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export enum UserRole {
  CREATOR = "creator",
  SPONSOR = "sponsor"
}

export enum ContentType {
  VIDEO = "video",
  BLOG = "blog",
  SOCIAL_MEDIA = "social_media",
  PODCAST = "podcast",
  OTHER = "other"
}

export interface User {
  username: string;
  role: UserRole;
  email: string;
  industry: string;
  tags: string[];
  // Creator specific fields
  content_type?: ContentType;
  audience_size?: number;
  content_style?: string;
  previous_collaborations?: string[];
  // Sponsor specific fields
  company_name?: string;
  campaign_budget?: number;
  target_audience?: string;
  campaign_goals?: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  role: UserRole;
  email: string;
  industry: string;
  tags: string[];
  // Creator specific fields
  content_type?: ContentType;
  audience_size?: number;
  content_style?: string;
  previous_collaborations?: string[];
  // Sponsor specific fields
  company_name?: string;
  campaign_budget?: number;
  target_audience?: string;
  campaign_goals?: string[];
}

export interface MatchRequest {
  username: string;
  tags: string[];
  role: UserRole;
  industry: string;
  content_type?: ContentType;
  audience_size?: number;
  campaign_budget?: number;
  target_audience?: string;
}

export interface Match {
  username: string;
  role: UserRole;
  score: number;
  industry: string;
  company_name?: string;
  content_type?: ContentType;
  audience_size?: number;
}

export const authService = {
  register: async (data: RegisterRequest) => {
    const response = await api.post('/register', data);
    return response.data;
  },

  login: async (data: LoginRequest) => {
    const response = await api.post('/login', data);
    return response.data;
  },

  getProfile: async (username: string) => {
    const response = await api.get(`/profile/${username}`);
    return response.data;
  },

  findMatches: async (data: MatchRequest) => {
    const response = await api.post('/match', data);
    return response.data;
  },
}; 