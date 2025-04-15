import { HandCoins } from "lucide-react"


function Logo ({size="default"}) {
    return <div className={`${size === "lg" && "text-2xl gap-2"} flex gap-1 items-center font-semibold`}>
        <HandCoins className={size === "lg"? "w-6 h-6" : "w-4 h-4"}/>
        PayPals
    </div>

}

export default Logo;