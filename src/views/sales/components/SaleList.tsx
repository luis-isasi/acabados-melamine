import SaleItem from './SaleItem';

interface Props {
  sales: any[];
  textName: string;
  refetch: () => void;
}

const SaleList = ({ sales = [], textName, refetch }: Props) => {
  console.log({ sales });

  const renderSales = () => {
    return sales.map((sale, index) => (
      <SaleItem key={sale?.code} isPar={index % 2 === 0} sale={sale} />
    ));
  };

  return (
    <>
      <section className="text-center">
        <header className="grid grid-cols-4 text-xl font-bold bg-gray-300 rounded-2xl py-2 mb-4">
          <span>Nombre</span>
          <span>Fecha</span>
          <span>Dni</span>
          <span>Total</span>
        </header>
        <ul>{renderSales()}</ul>
      </section>
    </>
  );
};

export default SaleList;
