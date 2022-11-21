import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-600 text-gray-600 dark:text-slate-300 absolute bottom-0 w-full py-3 px-1 flex justify-between items-center">
      <span>Copyright &copy; {new Date().getFullYear()}</span>
      <a
        className="flex items-center"
        href="https://github.com/ilya-codes"
        target="__blank"
      >
        <FaGithub className="mr-1" />
        Ilya-codes
      </a>
    </footer>
  );
};

export default Footer;
