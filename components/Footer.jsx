import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 flex w-full items-center justify-between border-t border-gray-600 py-5 px-1 text-gray-600 dark:text-slate-300">
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
