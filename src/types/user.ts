// respononses

export interface UserI {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

// resquest
export interface RegisterDataI {
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phone: string;
  dni: number;
}
