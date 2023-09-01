import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getMeters, selectLoading } from "../../redux/meterSlice";
import Loader from "./Loader";
import { useEffect } from "react";

export default function Layout() {
  const isLoading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMeters());
  }, []);
  
  return (
    <>
      {isLoading && <Loader />}
      <div className="">
        <div className="navbar bg-base-100">
          <a className="btn btn-ghost normal-case text-xl">Amberflo</a>
        </div>
        <div id="main">
          <Outlet />
        </div>
      </div>
    </>
  );
}
