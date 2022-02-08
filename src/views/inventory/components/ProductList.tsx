import { ProductResponseI } from '@Services/product';
import ProductoItem from './ProductoItem';
interface Props {
  products: ProductResponseI[];
  textName: string;
  refetch: () => void;
}

const ProductList = ({ products, textName, refetch }: Props) => {
  const renderProducts = () => {
    const newProducts = products.filter((product) =>
      product.attributes.name.startsWith(textName)
    );

    if (newProducts.length === 0 && textName) {
      return (
        <p className="font-bold text-center text-3xl mt-10">
          No hay resultados 😥
        </p>
      );
    }

    return newProducts.map((product, index) => (
      <ProductoItem
        key={product.id}
        isPar={index % 2 === 0}
        product={product}
        refetch={refetch}
      />
    ));
  };

  return (
    <>
      <section className="text-center">
        <header className="grid grid-cols-6 text-xl font-bold bg-gray-300 rounded-2xl py-2 mb-4">
          <span>Nombre</span>
          <span>Código</span>
          <span>Cantidad</span>
          <span>Precio</span>
          <span>Descripción</span>
          <span>Acciones</span>
        </header>
        <ul>{renderProducts()}</ul>
      </section>
    </>
  );
};

export default ProductList;
