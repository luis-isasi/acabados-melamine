import { useState } from 'react';

import IconDelete from '@Icons/IconDelete';
import IconEdit from '@Icons/IconEdit';
import { PersonResponseI } from '@Types/person';
import ModalPersonDelete from '../Modals/ModalPersonDelete';
import ModalPersonEdit from '../Modals/ModalPersonEdit';

interface Props {
  person: PersonResponseI;
  refetch: () => void;
}

const PersonItem = ({ person, refetch }: Props) => {
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

  const {
    attributes: { username, email, dni, phone },
  } = person;

  return (
    <>
      <ModalPersonEdit
        {...{ isOpen: isOpenEdit, setIsOpen: setIsOpenEdit, person, refetch }}
      />
      <ModalPersonDelete
        {...{
          isOpen: isOpenDelete,
          setIsOpen: setIsOpenDelete,
          person,
          refetch,
        }}
      />
      <div
        className="bg-white py-3 border-b border-gray-300 grid  text-center"
        style={{
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
        }}
      >
        <span>{username}</span>
        <span>{email}</span>
        <span>{dni}</span>
        <span>{phone}</span>
        <div className="flex justify-between items-center gap-2 px-16">
          <button onClick={() => setIsOpenEdit(true)} type="button">
            <IconEdit className="text-blue-600" />
          </button>

          <button onClick={() => setIsOpenDelete(true)} type="button">
            <IconDelete className="text-red-500" />
          </button>
        </div>
      </div>
    </>
  );
};

export default PersonItem;
