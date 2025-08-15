import { cn } from "@/lib/utils";
function Button({ variant = "primary", children, onClick, type = "button", className }) {
  const buttonStyles = {
    primary: "bg-primary text-white shadow-xs py-2 px-3 ",
    secondary: "bg-secondary text-primary py-2 px-3",
    ghost: "text-green-950 shadow-none p-0",
  };

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={cn(
        `${buttonStyles[variant]} flex gap-1 items-center justify-center font-medium cursor-pointer transition duration-50 ease-in-out [&>svg]:w-4 [&>svg]:h-4`,
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
