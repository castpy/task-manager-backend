interface Infos {
  name: string;
  avatar: string | null;
}

export interface User {
  id: string;
  email: string;
  infos: Infos[];
}
