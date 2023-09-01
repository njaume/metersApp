import { memo } from "react";

const Loader = memo(() => {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 backdrop-blur-sm bg-slate-600 flex justify-center items-center z-50 bg-opacity-5">
      <div id="detail">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    </div>
  );
});

export default Loader;
