"use client";

import { useEffect, useRef, useState } from "react";
import { ChessBoard, Board} from "../../components/chessBoard";
import { Sidebar } from "../../components/sidebar";
import { useSocket } from "../../lib/hooks/useSocket";
import { GAME_INIT, MOVE } from "../../lib/messages.ts/messages";
import { Chess } from "chess.js";

interface Metadata {
    blackPlayer: string;
    whitePlayer: string;
}

export default function Home() {
    const socket = useSocket();
    const chessRef = useRef(new Chess());
    const [board, setBoard] = useState(chessRef.current.board());
    const [isPlay, setIsPlay] = useState(false);
    const [metadata, setMetadata] = useState<Metadata | null>(null);

    const startGame = () => {
            socket?.send(JSON.stringify({ 
                type: GAME_INIT,
                payload:{
                    gameId: "1"
                }, // This should be dynamically generated or managed
             }));
    };

    useEffect(() => {
            const chess = chessRef.current;
            if (!socket) return;
            socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                console.log("Message from server:", message);
                switch (message.type) {
                    case GAME_INIT:
                        chess.reset();
                        setBoard(chess.board());
                        setIsPlay(true);
                        setMetadata({
                            blackPlayer: message.payload.player,
                            whitePlayer: message.payload.player
                        })
                        break;

                    case MOVE:
                        const move = message.payload.move;

                        const result = chess.move(move);
                        if (!result) {
                        console.error('Frontend state out of sync: invalid move', move);
                        }

                        setBoard(chess.board());
                        break;
                }
            };
    }, [socket]);

    if (!socket) {
        return <div className="text-white">Connecting to the server...</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-8 bg-[#302E2B] rounded shadow-lg h-screen">
                <div className="col-span-1 h-screen w-full bg-[#171717] rounded shadow-lg">
                    <Sidebar isPlaying={true} isSignedup={false} />
                </div>
                <div className="col-span-5 h-screen p-16 bg-[#302E2B]">
                    <div>
                        <span>
                            
                        </span>
                    </div>
                    <div>
                        <ChessBoard board={board} socket={socket}/>
                    </div>
                </div>
                <div className="bg-[#302E2B] col-span-2 flex flex-col items-center justify-center h-screen p-8">
                    <button disabled={isPlay} onClick={startGame} className=" bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                        Start Game
                    </button>
                </div>
            </div>
        </div>
    )
}