import Image from 'next/image';

import { useContextAuth } from '@Context/contextAuth';

const Home = () => {
  const { user } = useContextAuth();

  return (
    <div className="flex text-2xl font-bold">
      {user && <>Hola {user.user.username}, Bienvenido 👋</>}
    </div>
  );
};

export default Home;
