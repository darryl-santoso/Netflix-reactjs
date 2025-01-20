import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";
import { ClipLoader } from "react-spinners";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";
import { AuthContext } from "../Context/UserContext";

import GoogleLogo from "../images/GoogleLogo.png";
import WelcomePageBanner from "../images/WelcomePageBanner.jpg";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
  
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoader(false);
        navigate("/");
      })
      .catch((error) => {
        const errorMessages = {
          "auth/wrong-password": "Password yang Anda masukkan salah.",
          "auth/user-not-found": "Akun dengan email ini tidak ditemukan.",
          "auth/too-many-requests": "Terlalu banyak percobaan login. Silakan coba lagi nanti.",
        };
  
        const errorMessage =
          errorMessages[error.code] || "Terdapat error pada sistem. Coba lagi nanti.";
  
        setErrorMessage(errorMessage);
        setLoader(false);
      });
  };
  

  const loginWithGoogle = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Tambahkan/merge data pengguna ke koleksi "Users"
      await setDoc(
        doc(db, "Users", user.uid),
        {
          email: user.email,
          Uid: user.uid,
        },
        { merge: true }
      );
  
      // Periksa apakah dokumen di "MyList" sudah ada
      const docSnap = await getDoc(doc(db, "MyList", user.uid));
      if (!docSnap.exists()) {
        // Buat dokumen baru di "MyList", "WatchedMovies", dan "LikedMovies"
        await Promise.all([
          setDoc(doc(db, "MyList", user.uid), { movies: [] }, { merge: true }),
          setDoc(doc(db, "WatchedMovies", user.uid), { movies: [] }, { merge: true }),
          setDoc(doc(db, "LikedMovies", user.uid), { movies: [] }, { merge: true }),
        ]);
      }
  
      // Navigasi ke halaman utama setelah semua selesai
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(error.message);
      setLoader(false);
    }
  };  

  return (
    <section
      className="h-[500px] sm:h-[1000px] bg-gray-50 dark:bg-gray-900"
      style={{
        background: `linear-gradient(0deg, hsl(0deg 0% 0% / 73%) 0%, hsl(0deg 0% 0% / 73%) 35%),url(${WelcomePageBanner})`,
      }}
    >
      <div className="h-[500px] sm:h-[1000px] flex flex-col items-center md:justify-start lg:justify-center">
        <div className="w-full pt-12 sm:pt-16 lg:pt-0 bg-[#000000a2] rounded-lg shadow sm:my-0 md:mt-0 sm:max-w-lg xl:p-0 border-2 border-stone-800 lg:border-0">
          <Fade>
            <div>
              <div className="p-6 space-y-4 md:space-y-6 sm:p-12">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                {/* <h1 className="text-white text-2xl p-3 text-center border-2 border-red-700 rounded-sm">
                  Not Real Netflix
                </h1> */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                  action="#"
                >
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className={
                        ErrorMessage
                          ? "bg-stone-700 text-white sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-2 border-red-700  dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white"
                          : "bg-stone-700 text-white sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }
                      placeholder="name@email.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className={
                        ErrorMessage
                          ? "bg-stone-700 text-white sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  border-2 border-red-700 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white"
                          : "bg-stone-700 text-white sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    {ErrorMessage && (
                      <h1 className="flex text-white font-bold p-4 bg-red-700 rounded text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                        {ErrorMessage}
                      </h1>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required=""
                        ></input>
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          for="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={`w-full text-white ${
                      loader
                        ? `bg-stone-700`
                        : `bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300`
                    } transition ease-in-out font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                  >
                    {loader ? <ClipLoader color="#ff0000" /> : `Sign in`}
                  </button>
                  <button
                    onClick={loginWithGoogle}
                    className={`flex justify-center items-center w-full text-white ${
                      loader
                        ? `bg-stone-700`
                        : `bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300`
                    } transition ease-in-out font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:focus:ring-primary-800`}
                  >
                    {loader ? (
                      <ClipLoader color="#ff0000" />
                    ) : (
                      <>
                        <img className="w-8" src={GoogleLogo}></img>{" "}
                        <p className="ml-1">Sign in with Google</p>
                      </>
                    )}
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      className="font-medium text-white hover:underline dark:text-primary-500"
                      to={"/signup"}
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
