import FormRegisterProduct from './components/FormRegisterProduct';
import ProductList from './components/ProductList';

const Inventory = () => {
  const onSusccessRegisterProduct = () => {};

  return (
    <div>
      <div className="mb-5">
        <h4 className="font-bold text-4xl">Registro de producto</h4>
        <FormRegisterProduct onSuccess={onSusccessRegisterProduct} />
      </div>
      <div>
        <h4 className="font-bold text-4xl mb-4">Lista de productos</h4>
        <ProductList />
      </div>
    </div>
  );
};

export default Inventory;
