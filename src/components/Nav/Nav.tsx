import { useContextAuth } from '@Context/contextAuth';
import NavItem from './components/NavItem';

import IconHome from '@Icons/Nav/IconHome';
import IconSale from '@Icons/Nav/IconSale';
import IconClient from '@Icons/Nav/IconClient';
import IconUser from '@Icons/Nav/IconUser';
import IconInventory from '@Icons/Nav/IconInventory';
import IconLogout from '@Icons/Nav/IconLogout';

const Nav = () => {
  const { signoutUser } = useContextAuth();

  return (
    <nav className="h-full">
      <div className="bg-gray-900 h-full w-60 flex flex-col items-center justify-between p-4">
        <ul className="mt-10">
          <li className="mb-7">
            <NavItem Icon={IconHome} text="Home" path="/home" />
          </li>
          <li className="mb-7">
            <NavItem Icon={IconSale} text="Ventas" path="/sales" />
          </li>
          <li className="mb-7">
            <NavItem Icon={IconClient} text="Personas" path="/persons" />
          </li>
          <li className="mb-7">
            <NavItem Icon={IconUser} text="Usuarios" path="/users" />
          </li>
          <li className="mb-7">
            <NavItem Icon={IconInventory} text="Inventario" path="/inventory" />
          </li>
        </ul>
        <div>
          <button
            onClick={() => signoutUser()}
            className="flex items-center px-4 py-2 text-gray-500 hover:text-white"
          >
            <IconLogout className="h-5 w-5 mr-4" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
