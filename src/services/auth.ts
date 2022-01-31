import { fetcher } from '@Utils';
import { UserI, RegisterDataI, DataUserI } from '@Types/user';

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

export const getAllUsers = () => {
  return fetcher<DataUserI[]>({
    endpoint: '/users',
    withToken: true,
  });
};

export const updateUser = (user: DataUserI) => {
  return fetcher<DataUserI>({
    endpoint: `/users/${user.id}`,
    method: 'PUT',
    withToken: true,
    body: {
      ...user,
    },
  });
};

export const deleteUser = (userId: number) => {
  return fetcher<DataUserI>({
    endpoint: `/users/${userId}`,
    method: 'DELETE',
    withToken: true,
  });
};
