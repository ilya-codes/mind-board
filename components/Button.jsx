const Button = ({ children, onClick, type, full, group }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${full && "w-full"} ${
        group && "rounded-l-none"
      } ease flex justify-center rounded-md border border-gray-400 bg-transparent py-2 px-4  text-sm font-medium text-gray-600 transition duration-100 hover:bg-gray-400 hover:text-white dark:text-slate-300`}
    >
      {children}
    </button>
  );
};

export default Button;
