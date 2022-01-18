import { useRouter } from 'next/router';

interface Props {
  Icon: (props: any) => JSX.Element;
  text: string;
  path: string;
}

const NavItem = ({ Icon, text, path }: Props) => {
  const router = useRouter();

  const isActive = router.pathname === path;

  const onClick = () => {
    // router.push(path);
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center text-xl ${
        isActive ? 'text-white' : 'text-gray-500'
      } hover:text-white`}
    >
      <Icon className="h-5 w-5 mr-4" />
      <span>{text}</span>
    </button>
  );
};

export default NavItem;
