export const Menu = () => {
  return (
    <div className="bg-red-300 flex justify-center items-center col-span-2 h-[90vh]">
      <ul className="w-full">
        <li className="bg-slate-200">
          <a
            href="/"
            className="bg-slate-400 text-center h-[30px] flex justify-center items-center"
          >
            Home
          </a>
        </li>
        <li className="bg-slate-200">
          <a
            href="/present"
            className="bg-slate-400 text-center h-[30px] flex justify-center items-center"
          >
            Present
          </a>
        </li>
      </ul>
    </div>
  );
};
