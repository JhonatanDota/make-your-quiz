import { NavLink } from "react-router-dom";
import icon from "../assets/images/icon-quiz.png";

export default function Menu() {
  return (
    <div className="flex flex-col items-center justify-between w-16 px-2 py-6 h-screen bg-gray-950">
      <div>
        <img src={icon} alt="icon" />
      </div>
      <div className="h-2/3">
        <ul className="flex flex-col gap-8 text-white text-sm">
          <li>
          <NavLink to="/make-yours">
          <button>
            Faca o seu
          </button>
        </NavLink>
          </li>
          <li>Do one</li>
          <li>About</li>
        </ul>
      </div>
    </div>
  );
}
