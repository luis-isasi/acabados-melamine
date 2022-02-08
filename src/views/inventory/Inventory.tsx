import IconSearch from '@Icons/IconSearch';
import { getAllProducts } from '@Services/product';
import { useState } from 'react';
import { useQuery } from 'react-query';
import FormRegisterProduct from './components/FormRegisterProduct';
import ProductList from './components/ProductList';

const Inventory = () => {
  const [textName, setTextName] = useState<string>('');

  const { data, isLoading, refetch } = useQuery(
    'getAllProducts',
    getAllProducts
  );

  const onSusccessRegisterProduct = () => {
    refetch();
  };

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="mb-5">
        <h4 className="font-bold text-4xl">Registro de producto</h4>
        <FormRegisterProduct onSuccess={onSusccessRegisterProduct} />
      </div>
      <div>
        <h4 className="font-bold text-4xl mb-4">Lista de productos</h4>
        <form className="mb-5 ">
          <div className="bg-gray-100 py-2 px-3 rounded-xl ">
            <div className="bg-white p-2 rounded-xl border-1 border-gray-300 flex items-center ">
              <IconSearch className="text-gray-400 w-5 h-5" />
              <input
                value={textName}
                onChange={(e) => setTextName(e.target.value)}
                className="flex-1 py-1 px-6 focus:outline-none"
                type="text"
                placeholder="Buscar por nombre"
              />
            </div>
          </div>
        </form>
        {isLoading && (
          <div className="font-bold text-2xl flex justify-center items-center gap-4">
            <div className="loader w-5 h-5" />
            <p> Cargando Productos...</p>
          </div>
        )}
        {data && !isLoading && (
          <ProductList products={data} textName={textName} refetch={refetch} />
        )}
      </div>
    </div>
  );
};

export default Inventory;
