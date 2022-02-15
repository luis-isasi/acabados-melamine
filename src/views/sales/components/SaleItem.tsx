import IconDelete from '@Icons/IconDelete';
import IconEdit from '@Icons/IconEdit';

interface Props {
  isPar: boolean;
  sale: any;
}

const SaleItem = ({ isPar, sale }: Props) => {
  return (
    <>
      <li
        className={`${
          isPar && 'bg-gray-100'
        } grid grid-cols-4 py-2 border-b items-center border-gray-200`}
      >
        <span>{sale?.attributes?.clientName}</span>
        <span>{sale?.attributes?.date}</span>
        <span>{sale?.attributes?.dni}</span>
        <span>{sale?.attributes?.total}</span>
      </li>
    </>
  );
};

export default SaleItem;
