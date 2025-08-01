function Button({ variant = "primary", children, onClick }) {
  const buttonStyles = {
    primary: "bg-green-950 text-white shadow-xs py-2 px-3 ",
    secondary:
      "bg-[#E8F5EB] text-green-950 shadow-xs border border-green-950/5 py-2 px-3",
    ghost: "text-green-950 shadow-none p-0",
  };

  return (
    <button
      onClick={onClick}
      className={`${buttonStyles[variant]} flex gap-1 items-center justify-center rounded-sm font-medium cursor-pointer transition duration-50 ease-in-out [&>svg]:w-4 [&>svg]:h-4`}
    >
      {children}
    </button>
  );
}

export default Button;
