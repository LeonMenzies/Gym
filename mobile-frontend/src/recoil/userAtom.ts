import { atom } from 'recoil';
import { UserT } from "~types/Types";


export const defaultUser: UserT = {
  id: 0,
  firstName: "", 
  lastName: "",
  email: "",
  jwt: "",
  accountStatus: "deactivated",
};

export const userAtom = atom<UserT>({
  key: "user",
  default: defaultUser,
});