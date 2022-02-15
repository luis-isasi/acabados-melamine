import { USER_SESSION } from '@Constans';

//FETCHER
export async function fetcher<DataResponse>({
  endpoint,
  method = 'GET',
  body,
  withToken = false,
}: {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  withToken?: boolean;
}) {
  let headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  if (typeof window !== 'undefined' && withToken) {
    //TODO: agregar un type para user session
    let token: string | undefined = '';

    try {
      //only there's a token in local storage
      const user = window.localStorage.getItem(USER_SESSION);

      token = JSON.parse(user)?.jwt;
      if (token) {
        headers = { ...headers, Authorization: `Bearer ${token}` };
      }
    } catch (err) {
      console.error(err);
      token = '';
    }
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
    {
      method: method,
      body: JSON.stringify(body),
      headers,
    }
  );

  let data = await response.json();

  type MyResponse = DataResponse & {
    error?: {
      details: any;
      message: string;
      name: string;
      status: Response['status'];
    };
    message?: { messages: { id: string; message: string }[] }[];
  };

  return data as MyResponse;
}

export const formatAmount = ({
  amount,
  share,
  maxDecimal = 2,
  minDecimal = 2,
}: {
  amount: number;
  share?: boolean;
  maxDecimal?: number;
  minDecimal?: number;
}) => {
  const formatShare = (number: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: minDecimal,
      maximumFractionDigits: maxDecimal,
    }).format(number);
  };

  return amount && share ? formatShare(amount) : `$ ${formatShare(amount)}`;
};
