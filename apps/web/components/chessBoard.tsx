"use client";

// Update the import path below if the file exists elsewhere, or create the file if missing
import { Color, PieceSymbol, Square } from 'chess.js';
import { JSX, JSXElementConstructor, useState } from 'react';

export interface Board {
    square: Square;
    type: PieceSymbol;
    color: Color
}
const MOVE = 'move';

const pieceUnicode: Record<PieceSymbol, { w: JSX.Element; b: JSX.Element }> = {
    p: { w: <img className="h-20 w-14" src='./pawn_white.png' alt='White Pawn'/>, b: <img className="h-20 w-14" src="./pawn_black.png" alt="Black Pawn" /> },
    n: { w: <img className="h-20 w-14" src='./knight_white.png' alt='White Knight'/>, b: <img className="h-20 w-14" src="./knight_black.png" alt="Black Knight" /> },
    b: { w: <img className="h-18 w-12" src='./bishop_white.png' alt='White Bishop'/>, b: <img className="h-20 w-14" src="./bishop_black.png" alt="Black Bishop" /> },
    r: { w: <img className="h-16 w-12" src='./rook_white.png' alt='White Rook'/>, b: <img className="h-16 w-12" src="./rook_black.png" alt="Black Rook" /> },
    q: { w: <img className="h-20 w-14" src='./queen_white.png' alt='White Queen'/>, b: <img className="h-20 w-14" src="./queen_black.png" alt="Black Queen" /> },
    k: { w: <img className="h-18 w-12" src='./king_white.png' alt='White King'/>, b: <img className="h-18 w-12" src="./king_black.png" alt="Black King" /> },
};

function getPieceSymbol(type: PieceSymbol, color: Color) {
    return pieceUnicode[type][color];
}

export const ChessBoard = ({ board, socket }: { board: (Board | null)[][], socket: WebSocket | null }) => {
  const [from, setFrom] = useState<null | Square>(null);
  // const [to, setTo] = useState<null | Square>(null);

  return (
    <div className="p-10">
      {board.map((row, i) => (
        <div key={i} className="flex justify-center">
          {row.map((square, j) => {
            const piece = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
            return (
              <div
                key={j}
                className={`w-20 h-20 flex items-center justify-center border border-gray-300 ${(i + j) % 2 === 0 ? 'bg-[#F0D9B5]' : 'bg-yellow-900'}`}
                onClick={() => {
                  if (!from) {
                    setFrom(piece);
                  } else {
                    socket?.send(JSON.stringify({
                      type: MOVE,
                      payload: {
                        gameId: "1",
                        move: {
                          from,
                          to: piece
                        }
                      }
                    }));
                    console.log(from, piece);
                    setFrom(null);
                  }
                }}>
                {square ? getPieceSymbol(square.type, square.color) : ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};