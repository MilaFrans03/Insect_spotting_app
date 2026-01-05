import useSWR from 'swr';
import fetcher from './_fetcher';
import { API_URL } from '@/constants/Api';

export interface Insect {
  _id: string;
  name: string;
  description?: string;
  rarity: string;
  season: string;
  default_photo_url?: string | null;
}

export function useInsects() {
  const { data, error, isLoading } = useSWR<Insect[]>(`${API_URL}/insects`, fetcher);
  return {
    insects: data ?? [],
    isLoading,
    isError: error,
  };
}