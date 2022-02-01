export interface PersonDataI {
  username: string;
  dni: number;
  dateOfBirth: string;
  phone: number;
  email: string;
}

export interface PersonResponseI {
  id: number;
  attributes: PersonDataI;
}
