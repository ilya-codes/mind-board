function Message({ children, avatar, username, description }) {
  return (
    <div className="bg-white p-8 my-5 shadow-md rounded-lg relative">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-600  rounded-full overflow-hidden">
          <img src={avatar} alt="user-icon" />
        </div>
        <h3 className="font-bold text-base text-gray-600">{username}</h3>
      </div>
      <div className="py-5 ">
        <p className="font-light text-base text-gray-600">{description}</p>
      </div>
      {children}
    </div>
  );
}

export default Message;
