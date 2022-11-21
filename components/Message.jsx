function Message({ children, avatar, username, description }) {
  return (
    <div className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 p-8 my-5 shadow-md rounded-lg relative transition-all delay-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 shrink-0 bg-gray-600 rounded-full overflow-hidden">
          <img src={avatar} alt="user-icon" />
        </div>
        <h3 className="font-bold text-base">{username}</h3>
      </div>
      <div className="py-5 ">
        <p className="font-light text-base">{description}</p>
      </div>
      {children}
    </div>
  );
}

export default Message;
