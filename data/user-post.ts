import mutation from './_mutation';
import useSWRMutation from 'swr/mutation';
import { API_URL } from '@/constants/Api';

interface RegisterData {
  username: string;
  name: string;
  email: string;
  password: string;
  pictures?: any[];
}

export default function useUserRegister() {
  const { trigger, data, error, isMutating } = useSWRMutation(
    `${API_URL}/users`,
    (url, { arg }: { arg: RegisterData }) => {
      return mutation(url, {
        method: 'POST',
        body: arg,
      });
    }
  );

  return {
    data,
    isMutating,
    isError: error,
    trigger
  };
}
