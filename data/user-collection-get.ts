import { useState, useEffect } from 'react';
import { useInsects } from './insects-get';
import { useUserGet, User } from './user-get';
import { useAddPicture } from './user-collection-post';
import { useDeletePicture } from './user-collection-delete';

export function useCollection() {

  const { insects, isLoading: insectsLoading } = useInsects();
  const { user, isLoading: userLoading } = useUserGet();
  const [localUser, setLocalUser] = useState<User | null>(null);

  const addPicture = useAddPicture(localUser, setLocalUser);
  const deletePicture = useDeletePicture(localUser, setLocalUser); // ✅ hier maken we hem aan

  useEffect(() => {
    if (user) setLocalUser(user);
  }, [user]);

  const defaultImage = require('@/assets/images/insects_placeholders/01.png');
  const placeholderImages: Record<string, any> = {
    '01': require('@/assets/images/insects_placeholders/01.png'),
    '02': require('@/assets/images/insects_placeholders/02.png'),
    '03': require('@/assets/images/insects_placeholders/03.png'),
    '04': require('@/assets/images/insects_placeholders/04.png'),
    '05': require('@/assets/images/insects_placeholders/05.png'),
    '06': require('@/assets/images/insects_placeholders/06.png'),
    '07': require('@/assets/images/insects_placeholders/07.png'),
    '08': require('@/assets/images/insects_placeholders/08.png'),
  };

  const collectionData = insects.map(insect => {
    const picture = localUser?.pictures.find(p => p.insect_id === insect._id);
    return {
      ...insect,
      in_collection: picture?.in_collection ?? false,
      photo_url: picture?.photo_url ?? placeholderImages[insect._id] ?? defaultImage,
      date_found: picture?.date_found ?? null,
    };
  });

  return {
    collectionData,
    addPictureToCollection: addPicture,
    deletePicture, // 
    isLoading: insectsLoading || userLoading,
  };
}
