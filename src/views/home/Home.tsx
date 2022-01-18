import Image from 'next/image';

import { useContextAuth } from '@Context/contextAuth';
import ProtectRouteAuth from '@Hoc/ProtectRouteAuth';
import Nav from '@Components/Nav';

const Home = () => {
  const { user } = useContextAuth();

  return (
    <ProtectRouteAuth>
      <div className="min-h-screen h-auto w-full flex">
        <div className="flex flex-col items-center">
          <figure>
            <Image
              layout="intrinsic"
              loader={({ src }) => `${src}`}
              src="/images/logo.svg"
              width={200}
              height={150}
              alt="logo"
            />
          </figure>
          <div
            className="h-full overflow-hidden"
            style={{
              borderTopRightRadius: '120px',
            }}
          >
            <Nav />
          </div>
        </div>
        <div className="w-full p-4 px-8">
          <div className="flex justify-end mb-4">
            <section className="flex items-center max-w-min">
              <div className="h-5 w-5 rounded-full bg-gray-900 mr-2" />
              {user && (
                <p className="bl-text-xl font-bold">{user.user.username}</p>
              )}
            </section>
          </div>
          <div className="flex text-2xl font-bold">
            {user && <>Hola {user.user.username}, Bienvenido 👋</>}
          </div>
        </div>
      </div>
    </ProtectRouteAuth>
  );
};

export default Home;
