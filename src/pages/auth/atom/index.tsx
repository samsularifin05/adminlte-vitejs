import { atom, selector } from "recoil";

export const authService = atom({
  key: "authService",
  default: {
    username: "",
    password: "",
  },
});

export const gabungUsernamePassword = selector({
  key: "gabungUsernamePassword",
  get: ({ get }) => {
    const items = get(authService);
    return items.username + " " + items.password;
  },
});
