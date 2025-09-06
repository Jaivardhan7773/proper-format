import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth/useAuthStore";

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error, Signup } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Signup(name, email, password);
    if (success) {
      navigate("/loveyy");
    }
  }

  return (
    <>
      <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign up to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-100">Name</label>
              <div className="mt-2">
                <input id="name" type="string"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required autoComplete="name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
              <div className="mt-2">
                <input id="email" type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required autoComplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer">
                {loading ? "Signing up..." : "Sign up"}
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already a member?
            <Link to={'/login'} className="font-semibold text-indigo-400 hover:text-indigo-300">Login</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUp;