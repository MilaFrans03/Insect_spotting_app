import { useEffect, useState } from 'react';
import useSWR from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetcher from './_fetcher';
import { API_URL } from '@/constants/Api';

export interface Picture {
  insect_id: string;
  photo_url: string;
  in_collection: boolean;
  date_found?: string | null;
}

export interface User {
  _id: string;
  username: string;
  pictures: Picture[];
}

export function useUserGet() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => setUserId(id));
  }, []);

  const { data, error, isLoading } = useSWR<User>(
    userId ? `${API_URL}/users/${userId}` : null,
    fetcher
  );

  return { user: data ?? null, isLoading, isError: error };
}
