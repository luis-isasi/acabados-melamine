import { useState } from 'react';

import IconDelete from '@Icons/IconDelete';
import IconEdit from '@Icons/IconEdit';
import { DataUserI } from '@Types/user';
import ModalUserEdit from '../Modals/ModalUserEdit';
import ModalUserDelete from '../Modals/ModalUserDelete';

interface Props {
  user: DataUserI;
  refetch: () => void;
}

const UserItem = ({ user, refetch }: Props) => {
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

  const { id, username, email, dni } = user;

  return (
    <>
      <ModalUserEdit
        {...{ isOpen: isOpenEdit, setIsOpen: setIsOpenEdit, user, refetch }}
      />
      <ModalUserDelete
        {...{ isOpen: isOpenDelete, setIsOpen: setIsOpenDelete, user, refetch }}
      />
      <div
        key={id}
        className="bg-white py-3 border-b border-gray-300 grid  text-center"
        style={{
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        }}
      >
        <span>{username}</span>
        <span>{email}</span>
        <span>{dni}</span>
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

export default UserItem;
