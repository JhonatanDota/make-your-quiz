import { NavLink } from "react-router-dom";
import icon from "../assets/images/icon-quiz.png";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
  BsFillPlusSquareFill,
  BsFillQuestionSquareFill,
  BsFillInfoSquareFill,
  BsFillPersonVcardFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs";
import { logout } from "../config";

interface MenuProps {
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
}

export default function Menu(props: MenuProps) {
  const { showMenu, setShowMenu } = props;

  const { user } = useContext(UserContext);

  return (
    <div className="flex fixed h-full">
      {showMenu && (
        <div className="flex flex-col items-center justify-between w-16 md:w-32 px-2 py-6 bg-gray-950">
          <div>
            <img src={icon} alt="icon" />
          </div>
          <div className="h-3/4">
            <ul className="flex flex-col items-center gap-8 md:gap-16 text-white text-sm">
              <li>
                <NavLink to="/user">
                  <button
                    className="text-yellow-400 text-3xl md:text-5xl"
                    title="Faça o seu"
                  >
                    <BsFillPersonVcardFill />
                  </button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/make-yours">
                  <button
                    className="text-green-500 text-3xl md:text-5xl"
                    title="Faça o seu"
                  >
                    <BsFillPlusSquareFill />
                  </button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/list-quizes">
                  <button
                    className="text-purple-400 text-3xl md:text-5xl"
                    title="Responda um"
                  >
                    <BsFillQuestionSquareFill />
                  </button>
                </NavLink>
              </li>
              <li>
                <button
                  className="text-blue-400 text-3xl md:text-5xl"
                  title="Faça o seu"
                >
                  <BsFillInfoSquareFill />
                </button>
              </li>
              {user && (
                <li className="mt-10">
                  <button
                    className="text-red-400 text-3xl md:text-5xl"
                    title="Sair"
                    onClick={logout}
                  >
                    <BsFillArrowLeftSquareFill />
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      <button
        className={`absolute ${
          showMenu ? "hidden" : "block"
        } top-5 left-0 p-2 text-yellow-500`}
        onClick={() => setShowMenu(true)}
      >
        <BsFillArrowRightCircleFill className="text-4xl md:text-6xl" />
      </button>
      {showMenu && (
        <button
          className="absolute top-5 left-16 md:left-32 p-2 text-yellow-500"
          onClick={() => setShowMenu(false)}
        >
          <BsFillArrowLeftCircleFill className="text-4xl md:text-6xl" />
        </button>
      )}
    </div>
  );
}
