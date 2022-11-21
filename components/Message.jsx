function Message({ children, avatar, username, description }) {
  return (
    <div className="delay-50 relative my-5 rounded-lg border border-gray-400 bg-white p-8 text-gray-600 shadow-md transition-all dark:border-gray-600 dark:bg-slate-800 dark:text-slate-300">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-600">
          <img src={avatar} alt="user-icon" />
        </div>
        <h3 className="text-base font-bold">{username}</h3>
      </div>
      <div className="py-5 ">
        <p className="text-base font-light">{description}</p>
      </div>
      {children}
    </div>
  );
}

export default Message;
