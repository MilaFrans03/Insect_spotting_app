import { User } from './user-get';
import { API_URL } from '@/constants/Api';

export function useDeletePicture(
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>> | undefined
) {
  return async function deletePicture(pictureId: string) {
    if (!user) return;

    try {
      await fetch(`${API_URL}/users/${user._id}/pictures/${pictureId}`, {
        method: 'DELETE',
      });

      setUser?.(prev => prev
        ? { ...prev, pictures: prev.pictures.filter(p => p.insect_id !== pictureId) }
        : prev
      );

    } catch (err) {
      console.error('Failed to delete picture:', err);
    }
  };
}
