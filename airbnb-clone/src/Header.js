import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <header className="flex justify-between">
        <Link to={"/"} href="" className="flex items-center gap-1">
          <img
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
            src="https://seeklogo.com/images/A/airbnb-logo-1D03C48906-seeklogo.com.png"
            alt=""
          />

          <span className="font-bold text-xl">airbnb</span>
        </Link>

        <div className="flex border border-gray-300 rounded-full py-2 px-4 gap-2 shadow-md shadow-gray-300">
          <div>Anywhere</div>
          <div className="border-l border-gray-300"></div>
          <div>Anyweek</div>
          <div className="border-l border-gray-300"></div>
          <div>Add guests</div>
          <button className="bg-primary text-white p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
        <div className="flex border border-gray-300 rounded-full py-2 px-4 gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <Link
            to={user ? "/account" : "/login"}
            className="bg-gray-500 overflow-hidden text-white rounded-full border border-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          {!!user && <Link to={"/account"}>{user.name}</Link>}
        </div>
      </header>
    </>
  );
};

export default Header;
