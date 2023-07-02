import { useState } from "react";
import { NavLink } from "react-router-dom";
import icon from "../assets/images/icon-quiz.png";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs"


interface MenuProps {
  showMenu: boolean,
  setShowMenu: (show: boolean) => void
}

export default function Menu(props: MenuProps) {
  const {showMenu, setShowMenu} = props

  return (
    <div className="flex fixed h-full">
      {showMenu && (
        <div className="flex flex-col items-center justify-between w-16 px-2 py-6 bg-gray-950">
          <div>
            <img src={icon} alt="icon" />
          </div>
          <div className="h-2/3">
            <ul className="flex flex-col gap-8 text-white text-sm">
              <li>
                <NavLink to="/make-yours">
                  <button>Faça o seu</button>
                </NavLink>
              </li>
              <li>Do one</li>
              <li>About</li>
            </ul>
          </div>
        </div>
      )}
      <button
        className={`absolute ${
          showMenu ? "hidden" : "block"
        } top-0 left-0 p-2 text-yellow-500`}
        onClick={() => setShowMenu(true)}
      >
        <BsFillArrowRightCircleFill size={30}/>
      </button>
      {showMenu && (
        <button
          className="absolute top-0 left-16 p-2 text-yellow-500"
          onClick={() => setShowMenu(false)}
        >
          <BsFillArrowLeftCircleFill size={30}/>
        </button>
      )}
    </div>
  );
}
