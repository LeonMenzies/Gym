import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserT } from '~types/Types';

const USER_STORAGE_KEY = '@user_data';

export const StorageService = {
  setUser: async (user: UserT) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  getUser: async (): Promise<UserT | null> => {
    try {
      const data = await AsyncStorage.getItem(USER_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  removeUser: async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  }
};