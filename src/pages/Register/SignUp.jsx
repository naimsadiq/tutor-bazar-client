import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import GradientButton from "../../components/Button/GradientButton";

const SignUp = () => {
  // const navigate = useNavigate();
  // const {
  //   createUser,
  //   updateUserProfile,
  //   setUser,
  //   signInWithGoogle,
  //   setLoading,
  // } = useContext(AuthContext);
  // const [error, setError] = useState("");
  // const [errorName, setErrorName] = useState("");
  // const [showPassword, setShowPassword] = useState(false);

  // const handleSignOut = (e) => {
  //   e.preventDefault();
  //   setError("");
  //   const displayName = e.target.name?.value;
  //   const photoURL = e.target.photoUrl?.value;
  //   const email = e.target.email?.value;
  //   const password = e.target.password?.value;

  //   if (displayName.trim().length < 5) {
  //     setErrorName("Name should be more than 5 characters");
  //     return;
  //   }

  //   const length6Pattern = /^.{6,}$/;
  //   const upperCasePattern = /[A-Z]/;
  //   const lowerCasePattern = /[a-z]/;

  //   if (!length6Pattern.test(password)) {
  //     setError("At least 6 characters required");
  //     return;
  //   } else if (!upperCasePattern.test(password)) {
  //     setError("Add at least one uppercase letter");
  //     return;
  //   } else if (!lowerCasePattern.test(password)) {
  //     setError("Add at least one lowercase letter");
  //     return;
  //   }

  //   createUser(email, password)
  //     .then((res) => {
  //       const user = res.user;
  //       console.log(user);
  //       updateUserProfile(displayName, photoURL)
  //         .then(() => {
  //           setUser(user);
  //           console.log(user);
  //           navigate("/");
  //           setLoading(false);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     })
  //     .catch((e) => {
  //       toast.error(e.message);
  //     });
  // };

  // const handleSignInWithGoogle = () => {
  //   signInWithGoogle()
  //     .then((res) => {
  //       setUser(res.user);
  //       navigate(location.state || "/");
  //       toast.success("Signin successful");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       toast.error(e.message);
  //     });
  // };

  // const handleTogglePasswordShow = (event) => {
  //   event.preventDefault();
  //   setShowPassword(!showPassword);
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create your account
        </h2>

        <form onSubmit={"handleSignOut"} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="w-full py-2 outline-none"
                required
              />
            </div>
            {/* {errorName && (
              <p className="text-sm text-red-500 mt-1">{errorName}</p>
            )} */}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="url"
                name="photoUrl"
                placeholder="Enter your photo url"
                className="w-full py-2 outline-none"
                required
              />
            </div>
            {/* {errorName && (
              <p className="text-sm text-red-500 mt-1">{errorName}</p>
            )} */}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full py-2 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 relative">
              <FaLock className="text-gray-400 mr-2" />
              <input
                // type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full py-2 outline-none"
                required
              />
              <button
                // onClick={handleTogglePasswordShow}
                className="cursor-pointer top-3 right-5 absolute"
              >
                {/* {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>} */}
              </button>
            </div>
            {/* {error && <p className="text-sm text-red-500 mt-1">{error}</p>} */}
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:bg-linear-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 text-white py-2 rounded-lg font-semibold transition cursor-pointer"
          >
            Sign Up{" "}
          </button>
        </form>
        <div className="mt-5">
          <button
            // onClick={handleSignInWithGoogle}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out cursor-pointer"
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            Google
          </button>
        </div>
        <p className="text-sm text-center text-gray-500 mt-3">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
