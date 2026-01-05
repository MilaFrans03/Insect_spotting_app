import fetcher from './_fetcher'
import useSWR from 'swr'
import { API_URL } from '@/constants/Api'
//ALLE USERS OPHALEN
export default function useUsersGet () {
  const { data, error, isLoading } = useSWR(`${API_URL}/users`, fetcher)
 
  return {
    data,
    isLoading,
    isError: error
  }
}