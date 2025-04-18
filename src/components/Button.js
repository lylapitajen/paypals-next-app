function Button({ variant = "primary", icon: Icon, text, onClick }) {
  const buttonStyles = {
    primary: "bg-blue-700 text-white shadow-s hover:bg-blue-800",
    secondary:
      "border border-neutral-300 text-neutral-600 shadow-s hover:bg-neutral-100",
    ghost: "hover:bg-neutral-100 text-blue-700 shadow-none",
  };

  return (
    <button
      onClick={onClick}
      className={`${buttonStyles[variant]} flex gap-2 items-center py-2 px-3 rounded-sm font-medium cursor-pointer transition duration-50 ease-in-out`}
    >
      {Icon && <Icon size={16} />}
      {text}
    </button>
  );
}

export default Button;
