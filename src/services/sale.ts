import { fetcher } from '@Utils';

export const createSale = (salesData: any) => {
  return fetcher({
    endpoint: '/sales',
    method: 'POST',
    withToken: true,
    body: {
      data: { ...salesData },
    },
  });
};

export const getAllSales = () => {
  return fetcher<{
    data: any[];
    meta: any;
  }>({
    endpoint: '/sales',
    withToken: true,
  });
};
