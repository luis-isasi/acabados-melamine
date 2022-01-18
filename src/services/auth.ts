import { fetcher } from '@Utils';
import { UserI } from 'src/types/user';

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
}: {
  username: string;
  email: string;
  password: string;
}) => {
  return fetcher({
    endpoint: '/auth/local/register',
    method: 'POST',
    body: {
      username,
      email,
      password,
    },
  });
};
