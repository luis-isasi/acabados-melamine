const SvgComponent = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="#000"
  >
    <path
      className="fill-current"
      fill=""
      d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16.001A8 8 0 0 0 10 18Zm0-9.414 2.828-2.829 1.415 1.415L11.414 10l2.829 2.828-1.415 1.415L10 11.414l-2.828 2.829-1.415-1.415L8.586 10 5.757 7.172l1.415-1.415L10 8.586Z"
    />
  </svg>
);

export default SvgComponent;
