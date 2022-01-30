import { fetcher } from '@Utils';
import { UserI, RegisterDataI } from '@Types/user';

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return fetcher<UserI>({
    endpoint: '/auth/local',
    method: 'POST',
    body: {
      identifier: email,
      password,
    },
  });
};

export const register = ({
  username,
  email,
  password,
  dateOfBirth,
  phone,
  dni,
}: RegisterDataI) => {
  return fetcher<UserI>({
    endpoint: '/auth/local/register',
    method: 'POST',
    body: {
      username,
      email,
      password,
      dateOfBirth,
      phone,
      dni,
    },
  });
};
