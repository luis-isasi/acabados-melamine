import { fetcher } from '@Utils';
import { PersonDataI, PersonResponseI } from '@Types/person';

export const getAllPersons = () => {
  return fetcher<{
    data: PersonResponseI[];
    meta: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  }>({
    endpoint: '/personas',
    withToken: true,
  });
};

export const createPerson = (personData: PersonDataI) => {
  return fetcher<PersonResponseI>({
    endpoint: '/personas',
    method: 'POST',
    withToken: true,
    body: {
      data: {
        ...personData,
      },
    },
  });
};

export const updatePerson = ({
  id,
  personData,
}: {
  id: number;
  personData: PersonDataI;
}) => {
  return fetcher<PersonResponseI>({
    endpoint: `/personas/${id}`,
    method: 'PUT',
    withToken: true,
    body: {
      data: {
        ...personData,
      },
    },
  });
};

export const deletePerson = (personId: number) => {
  return fetcher<PersonResponseI>({
    endpoint: `/personas/${personId}`,
    method: 'DELETE',
    withToken: true,
  });
};

export const getPersonById = (personId: number) => {
  return fetcher<PersonResponseI>({
    endpoint: `/personas/${personId}`,
    withToken: true,
  });
};
