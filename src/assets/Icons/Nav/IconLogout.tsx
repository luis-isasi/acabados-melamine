const IconLogout = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width={25}
      height={31}
      viewBox="0 0 25 31"
      fill="#000"
    >
      <path
        className="fill-current"
        fill=""
        d="M2.292.917h20.416a1.458 1.458 0 0 1 1.459 1.458v26.25a1.458 1.458 0 0 1-1.459 1.458H2.292a1.458 1.458 0 0 1-1.459-1.458V2.375A1.458 1.458 0 0 1 2.292.917Zm5.833 13.125V9.667L.833 15.5l7.292 5.833v-4.375h8.75v-2.916h-8.75Z"
      />
    </svg>
  );
};

export default IconLogout;
