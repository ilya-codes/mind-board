const Button = ({ children, onClick, type, full, group }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${full && "w-full"} ${
        group && "rounded-l-none"
      } flex justify-center font-medium bg-transparent border border-gray-400 hover:bg-gray-400 text-gray-600  hover:text-white py-2 px-4 rounded-md text-sm transition ease duration-100`}
    >
      {children}
    </button>
  );
};

export default Button;
