const MessageError = ({ children }) => {
  return (
    <span className="text-red-600 font-medium text-sm text-center">
      {children}
    </span>
  );
};

export default MessageError;
