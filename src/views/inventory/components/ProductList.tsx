import IconDelete from '@Icons/IconDelete';
import IconEdit from '@Icons/IconEdit';
import { getAllProducts } from '@Services/product';
import { useQuery } from 'react-query';

const ProductList = () => {
  const { data, isLoading } = useQuery('getAllProducts', getAllProducts);

  const renderProducts = () => {
    return data.map((product, index) => (
      <li
        key={product.id}
        className={`${
          index / 2 !== 0 && 'bg-gray-100'
        } grid grid-cols-6  py-2 border-b border-gray-200`}
      >
        <span>{product.attributes.name}</span>
        <span>{product.attributes.code}</span>
        <span>{product.attributes.amount}</span>
        <span>{product.attributes.price}</span>
        <span>{product.attributes.description}</span>
        <div className="flex gap-4 justify-center">
          <button type="button">
            <IconEdit className="text-blue-600" />
          </button>
          <button type="button">
            <IconDelete className="text-red-500" />
          </button>
        </div>
      </li>
    ));
  };

  return (
    <section className="text-center">
      <header className="grid grid-cols-6 text-xl font-bold bg-gray-300 rounded-2xl py-2 ">
        <span>Nombre</span>
        <span>Código</span>
        <span>Cantidad</span>
        <span>Precio</span>
        <span>Descripción</span>
        <span>Acciones</span>
      </header>
      <ul>
        {isLoading && <div>Cargando...</div>}
        {data && !isLoading && renderProducts()}
      </ul>
    </section>
  );
};

export default ProductList;
