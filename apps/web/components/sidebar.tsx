import Link from "next/link";

export const Sidebar = ({isPlaying, isSignedup}: {isPlaying: boolean, isSignedup: boolean}) => {
  return (
    <div className="flex flex-col justify-center w-full pt-4">
        <div className=" flex items-center justify-center mr-2">
            <img src="/chess_start.png" alt="Chess.com" className="w-8 h-8" />
            <h2 className="text-2xl font-extrabold text-white"><Link href={"/"}> Chess.com </Link></h2>
        </div>
        <div className="flex items-center justify-center">
            <div className="space-y-4 pt-8 min-w-full text-xl font-bold text-amber-50">
                <li className="w-full hover:bg-gray-800 flex justify-center h-10 items-center"><a href="/game" className="">Play</a></li>
                <li className="w-full hover:bg-gray-800 flex justify-center h-10 items-center"><a href="/learn" className="">Learn</a></li>
                <li className="w-full hover:bg-gray-800 flex justify-center h-10 items-center"><a href="/community" className="">Community</a></li>
                <li className="w-full hover:bg-gray-800 flex justify-center h-10 items-center"><a href="/premium" className="">Premium</a></li>
            </div>
        </div>
        {isSignedup? <div> </div> : <div className="flex flex-col items-center justify-center p-8">
            <button className="w-full h-10 mt-4 text-white rounded font-bold bg-[#15803d] hover:bg-green-600"> Sign up </button>
            <button className="w-full h-10 mt-4 text-white rounded font-bold bg-cyan-700 hover:bg-cyan-600"> Log in </button>
        </div>}
        <footer className="flex items-end justify-center p-8 absolute bottom-0">
            <p className="text-sm text-gray-400">© 2025 Chess.com</p>
        </footer>
    </div>
  );
}