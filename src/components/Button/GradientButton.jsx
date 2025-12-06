const GradientButton = ({ text = "Sign Up", type = "button", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:bg-linear-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 text-white py-2.5 rounded-lg font-semibold transition cursor-pointer"
    >
      {text}
    </button>
  );
};

export default GradientButton;
