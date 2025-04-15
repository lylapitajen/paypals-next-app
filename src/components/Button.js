function Button({ variant = "primary", text, icon: Icon, onClick }) {

    const buttonStyles = {
      primary: "bg-neutral-900 text-neutral-100 shadow-s hover:bg-neutral-800",
      secondary:
        "border border-neutral-300 text-neutral-700 shadow-s hover:bg-neutral-100",
      ghost: "hover:bg-neutral-100 text-neutral-600 shadow-none",
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
  