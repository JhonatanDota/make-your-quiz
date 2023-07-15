import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { login } from "../requests/auth";
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login(username, password)
        .then((response) => {
          const data = response.data;

          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          window.location.replace("/user")
        })
        .catch(() => {
          toast.error("Login inválido.");
          resetForm();
        });
    } catch {}
  }

  function resetForm() {
    setPassword("");
    setUsername("");
  }

  return (
    <form
      className="mt-24 flex flex-col gap-y-6 text-center"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="flex flex-col gap-3 text-white">
        <label className="text-2xl md:text-4xl font-bold ">Username</label>
        <input
          className="text-lg md:text-4xl p-2 md:p-6 bg-gray-950 border-4 md:border-8 rounded-md font-bold border-yellow-400"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 text-white">
        <div className="flex justify-center items-center gap-3">
          <label className="text-2xl md:text-4xl font-bold ">Senha</label>
          <button
            type="button"
            className="text-2xl"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <BsFillEyeSlashFill className="text-red-400" />
            ) : (
              <BsFillEyeFill className="text-blue-500" />
            )}
          </button>
        </div>

        <input
          className="text-lg md:text-4xl p-2 md:p-6 bg-gray-950 border-4 md:border-8 rounded-md font-bold border-yellow-400"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-1/2 m-auto rounded-md p-4 md:p-6 text-lg md:text-2xl font-bold bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={username && password ? false : true}
      >
        Entrar
      </button>

      <Toaster position="bottom-center" />
    </form>
  );
}
