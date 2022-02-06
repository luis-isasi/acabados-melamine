import FormRegisterProduct from './components/FormRegisterProduct';

const Inventory = () => {
  const onSusccessRegisterProduct = () => {};

  return (
    <div>
      <div className="mb-5">
        <h4 className="font-bold text-4xl">Registro de producto</h4>
        <FormRegisterProduct onSuccess={onSusccessRegisterProduct} />
      </div>
      <section>
        <h4 className="font-bold text-4xl">Lista de productos</h4>
      </section>
    </div>
  );
};

export default Inventory;
