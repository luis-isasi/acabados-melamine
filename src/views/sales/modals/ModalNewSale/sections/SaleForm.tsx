import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

import MessageError from '@Components/molecules/MessageError';
import { PersonDataI } from '@Types/person';
import ModalAddItem from '../../ModalAddItem';
import { SaleProductI } from '@Services/product';
import { createSale } from '@Services/sale';

interface SaleI {
  clientName: string;
  dni: number;
  items: JSON;
  total: number;
  date: string;
}

interface Props {
  person: PersonDataI;
  setIsOpen: (isOpen: boolean) => void;
}

const SaleForm = ({ person, setIsOpen: setIsOpenModalNewSale }: Props) => {
  const [items, setItems] = useState<SaleProductI[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isOpenModalAddItem, setIsOpenModalAddItem] = useState(false);

  const { isLoading, mutate } = useMutation('createSale', createSale, {
    onSuccess: () => {
      setIsOpenModalNewSale(false);
    },
  });

  useEffect(() => {
    let total: number = 0;
    items.forEach((item) => {
      total += item.saleAmount * item.price;
    });
    setTotal(total);
  }, [items]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SaleI>({
    defaultValues: {
      clientName: person.username,
      dni: person.dni,
    },
  });

  const onSubmit: SubmitHandler<SaleI> = (data) => {
    mutate({
      ...data,
      total,
      items: JSON.stringify(items),
    });
  };

  const renderItems = () => {
    return items.map(({ name, saleAmount, code, price }) => {
      return (
        <li
          key={code}
          className="grid grid-cols-4 border-b border-gray-400 py-2"
        >
          <span>{name}</span>
          <span>{saleAmount}</span>
          <span>{price}</span>
          <span>{price * saleAmount}</span>
        </li>
      );
    });
  };

  return (
    <>
      {isOpenModalAddItem && (
        <ModalAddItem
          setIsOpen={setIsOpenModalAddItem}
          items={items}
          setItems={setItems}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <section className="flex gap-6">
          <section>
            <div className="flex flex-col mb-5">
              <label className="font-bold mb-2 text-gray-400">Nombre</label>
              <input
                type="text"
                disabled
                placeholder=""
                className="py-2 px-6 focus:outline-none rounded-xl border-1 border-gray-400 mb-1 disabled:bg-gray-200 disabled:cursor-not-allowed"
                {...register('clientName', {
                  required: true,
                })}
              />
              {errors.clientName && (
                <MessageError>
                  {errors.clientName.type === 'required' &&
                    'El dni es requerido'}
                  {(errors.clientName.type === 'maxLength' ||
                    errors.clientName.type === 'minLength') &&
                    'El dni es requerido'}
                </MessageError>
              )}
            </div>
            <div className="flex flex-col mb-5">
              <label className="font-bold mb-2 text-gray-400">Dni</label>
              <input
                type="number"
                disabled
                placeholder=""
                className="py-2 px-6 focus:outline-none rounded-xl border-1 border-gray-400 mb-1 disabled:bg-gray-200 disabled:cursor-not-allowed"
                {...register('dni', {
                  required: true,
                  maxLength: 8,
                  minLength: 8,
                })}
              />
              {errors.dni && (
                <MessageError>
                  {errors.dni.type === 'required' && 'El dni es requerido'}
                  {(errors.dni.type === 'maxLength' ||
                    errors.dni.type === 'minLength') &&
                    'El dni es requerido'}
                </MessageError>
              )}
            </div>
          </section>
          <section>
            <div className="flex flex-col mb-5">
              <label className="font-bold mb-2">Fecha</label>
              <input
                type="date"
                placeholder=""
                className="py-2 px-6 focus:outline-none rounded-xl border-1 border-gray-400 mb-1"
                {...register('date', { required: true })}
              />
              {errors.date && (
                <MessageError>
                  {errors.date.type === 'required' && 'La Fecha es requerida'}
                </MessageError>
              )}
            </div>
            <div className="flex flex-col mb-5">
              <label className="font-bold mb-2">Total</label>
              <input
                type="number"
                disabled
                value={total}
                placeholder=""
                className="py-2 px-6 focus:outline-none rounded-xl border-1 border-gray-400 mb-1 disabled:bg-gray-200 disabled:cursor-not-allowed"
                {...register('total')}
              />
            </div>
            <input
              type="text"
              disabled
              value={JSON.stringify(items)}
              placeholder=""
              className="hidden"
              {...register('items')}
            />
          </section>
        </section>
        <section className="mb-6">
          <header className="flex justify-between items-center mb-4">
            <p className="font-bold text-3xl">Items</p>
            <button
              type="button"
              onClick={() => setIsOpenModalAddItem(true)}
              className="max-w-max bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-2xl"
            >
              Agregar item
            </button>
          </header>
          <div>
            <div className="grid grid-cols-4 bg-gray-200 rounded-2xl px-4 py-2 text-center font-bold mb-4">
              <span>Producto</span>
              <span>Cantidad</span>
              <span>Precio por Unidad</span>
              <span>Importe</span>
            </div>
            <ul className="text-center">{renderItems()}</ul>
          </div>
        </section>
        <button
          type="submit"
          disabled={isLoading}
          className="max-w-max bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-2xl mx-auto"
        >
          Agregar Venta
        </button>
      </form>
    </>
  );
};

export default SaleForm;
