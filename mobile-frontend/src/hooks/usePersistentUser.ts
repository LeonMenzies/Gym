import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '~recoil/userAtom';
import { StorageService } from '~utils/StorageService';

export const usePersistentUser = () => {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await StorageService.getUser();
      if (storedUser) {
        setUser(storedUser);
      }
    };
    loadUser();
  }, []);

  const updateUser = async (newUser: typeof user | null) => {
    if (newUser) {
      await StorageService.setUser(newUser);
    } else {
      await StorageService.removeUser();
    }
    setUser(newUser);
  };

  return { user, updateUser };
};