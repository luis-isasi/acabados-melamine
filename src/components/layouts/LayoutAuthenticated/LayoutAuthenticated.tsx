import Image from 'next/image';
import { useRouter } from 'next/router';

import { useContextAuth } from '@Context/contextAuth';
import ProtectRouteAuth from '@Hoc/ProtectRouteAuth';
import Nav from '@Components/Nav';

const LayoutAuthenticated = ({ children }) => {
  const { user } = useContextAuth();
  const router = useRouter();

  const getTitle = () => {
    switch (router.pathname) {
      case '/home':
        return 'Home';
      case '/sales':
        return 'Ventas';
      case '/persons':
        return 'Personas';
      case '/users':
        return 'Usuarios';
      case '/inventory':
        return 'Inventario';
      default:
        return '';
    }
  };

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
        <div className="flex flex-col w-full max-h-screen h-screen p-4 px-8">
          <header className="flex justify-between mb-4">
            <h3 className="text-2xl font-bold">{getTitle()}</h3>
            <section className="flex items-center max-w-min">
              <div className="h-5 w-5 rounded-full bg-gray-900 mr-2" />
              {user && (
                <p className="bl-text-xl font-bold">{user.user.username}</p>
              )}
            </section>
          </header>
          <div className="max-h-full h-full overflow-y-auto scrool-none bg-scroolbar-white scroolbar">
            {children}
          </div>
        </div>
      </div>
    </ProtectRouteAuth>
  );
};

export default LayoutAuthenticated;
