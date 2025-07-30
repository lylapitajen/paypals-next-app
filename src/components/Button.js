function Button({ variant = "primary", icon: Icon, children, onClick }) {
  const buttonStyles = {
    primary: "bg-green-950 text-white shadow-xs",
    secondary:
      "bg-[#E8F5EB] text-green-950 shadow-xs border border-green-950/5",
    ghost: "hover:bg-neutral-100 text-green-950 shadow-none",
  };

  return (
    <button
      onClick={onClick}
      className={`${buttonStyles[variant]} flex gap-2 items-center justify-center py-2 px-3 rounded-sm font-medium cursor-pointer transition duration-50 ease-in-out`}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

export default Button;
