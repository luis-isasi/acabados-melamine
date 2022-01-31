// respononses

export interface DataUserI {
  id: number;
  username: string;
  email: string;
  dateOfBirth: string;
  phone: number;
  dni: number;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface UserI {
  jwt: string;
  user: DataUserI;
}

// resquest
export interface RegisterDataI {
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phone: number;
  dni: number;
}
