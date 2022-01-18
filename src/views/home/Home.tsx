import { useContextAuth } from '@Context/contextAuth';
import ProtectRouteAuth from '@Hoc/ProtectRouteAuth';

const Home = () => {
  const { user, signoutUser } = useContextAuth();

  console.log({ user });

  return (
    <ProtectRouteAuth>
      <div>
        hola {user?.user?.username}
        <button
          onClick={() => signoutUser()}
          className="px-4 py-2 bg-green-400 rounded-xl"
        >
          Cerrar Sesión
        </button>
      </div>
    </ProtectRouteAuth>
  );
};

export default Home;
