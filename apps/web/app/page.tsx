import Link from "next/link";
import { Sidebar } from "../components/sidebar";


export default function Home() {
  return (
      <div className="grid grid-cols-8 bg-[#302E2B] rounded shadow-lg h-screen">
        <div className="col-span-1 h-screen w-full bg-[#171717] rounded shadow-lg">
        <Sidebar isPlaying={false} isSignedup={false} />
        </div>
        <div className="col-span-7 h-screen p-16 text-white">
          <div className="flex justify-center min-w-96">
            <img src="/chess_board.png" alt="Chess" className="w-86 h-86 mb-4" />
            <div className="p-8 ml-20 ">
              <h1 className="text-4xl font-bold mb-2">Welcome to Chess.com</h1>
              <p className="font-bold text-gray-300">Let's play the worlds most popular game.</p>
              <Link href={'./game'}className="mt-20 h-16 min-w-96 py-2 bg-[#15803d] text-white rounded flex items-center transition-all duration-300 ease-out transform hover:scale-102 hover:shadow-[0_0_16px_4px_rgba(16,185,129,0.55)] focus:outline-none focus:ring-2 focus:ring-emerald-400/80">
                <img src="/queen.png" alt="" className="h-14 w-14 ml-4" />
                <div className="ml-10">
                  <span className="font-bold text-3xl">Start Playing</span>
                  <p className="text-sm text-gray-300">Your next move starts here.</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
}
