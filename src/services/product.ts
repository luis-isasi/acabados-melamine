import { fetcher } from '@Utils';

export interface ProductI {
  name: string;
  description: string;
  amount: number;
  price: number;
  code: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponseI {
  id: number;
  attributes: ProductI;
}

export const getAllProducts = async () => {
  const response = await fetcher<{
    data: ProductResponseI[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }>({
    endpoint: '/productos',
    withToken: true,
  });

  return response.data;
};

export const getProductById = async (productId: number) => {
  const response = await fetcher<{
    data: ProductResponseI;
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }>({
    endpoint: `/productos/${productId}`,
    withToken: true,
  });

  return response.data as ProductResponseI;
};

export const createProduct = (productData: ProductI) => {
  return fetcher({
    endpoint: '/productos',
    method: 'POST',
    withToken: true,
    body: {
      data: productData,
    },
  });
};

interface UpdateProductI {
  name?: string;
  description?: string;
  amount?: number;
  price?: number;
  code?: number;
}

export const updateProduct = async ({
  idProduct,
  productData,
}: {
  productData: UpdateProductI;
  idProduct: number;
}) => {
  const response = await fetcher<{
    data: ProductResponseI;
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }>({
    endpoint: `/productos/${idProduct}`,
    method: 'PUT',
    withToken: true,
    body: {
      data: productData,
    },
  });

  return response.data;
};

export const deleteProduct = (productId: number) => {
  return fetcher({
    endpoint: `/productos/${productId}`,
    method: 'DELETE',
    withToken: true,
  });
};
