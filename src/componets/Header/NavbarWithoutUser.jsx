import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavbarWithoutUser() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();
  const transitionNavBar = () => {
    if (window.scrollY > 10) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  return (
      <header
        className={`bg-black absolute z-50 w-full flex justify-between items-center p-2 sm:p-6 transition duration-500 ease-in-out ${
          show && "bg-black transition duration-500 ease-in-out"
        } sm:bg-black ${!show && "lg:bg-transparent"}`}
      >
        <div className="" onClick={()=>navigate("/")}>
          <img
            className="h-8 sm:h-10 sm:w-18 cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
            alt="NETFLIX"
          />
        </div>

        <div>
          <Link to="/signin">
            <button className="bg-red-600 px-8 py-2 rounded-2xl text-white text-base font-bold">
              Login
            </button>
          </Link>
        </div>
      </header>
  );
}

export default NavbarWithoutUser;
