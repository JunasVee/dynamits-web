import { ChevronRight } from "lucide-react";


export default function HomeHeader() {
  return (
    <div className="bg-blue-500 py-24 px-20">
        <div className=" flex flex-col justify-center gap-2">
            {/* MOTO */}
            <div>
                <i className="text-3xl font-semibold text-blue-500 tracking-wide
                [text-shadow:1px_1px_0_white,-1px_1px_0_white,1px_-1px_0_white,-1px_-1px_0_white]
                ">ELECTRIFY YOUR DELIVERIES</i>
            </div>
            {/* Header Card */}
            <div className="flex flex-col justify-center bg-white p-6 gap-4 rounded-xl max-w-[27.5rem]">
                <h1 className="text-3xl font-semibold text-blue-500 tracking-wide">Dynamits Delivery</h1>
                <p>An AI-Powered Electric Cargo Motorcycle for Last-Mile Delivery in Indonesia. 
                    Utilizing advanced auto-optimized route planning and eco-friendly electric vehicles to ensure 
                    efficient and sustainable logistics solutions for our clients.</p>
                <div className="flex items-center gap-1">
                <a href="/contact"><button className="h-10 bg-blue-500 p-2 rounded-md text-white transition-all ease-in hover:bg-blue-600">LEARN MORE</button></a>
                    <ChevronRight />
                </div>
            </div>
        </div>
    </div>
  )
}
