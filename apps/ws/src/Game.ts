import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { ERROR, GAME_INIT, GAME_OVER, MOVE } from "./messages";

export class Game {
    private player1: WebSocket;
    private player2: WebSocket;
    public gameId: string;
    private startTime: Date;
    private board: Chess;

    constructor(player1: WebSocket, player2: WebSocket, game_id: string) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.gameId = game_id;
        this.player1.send(JSON.stringify({ type: GAME_INIT, payload: {game_id, player: 'white' } }));
        this.player2.send(JSON.stringify({ type: GAME_INIT, payload: {game_id, player: 'black' } }));
        this.startTime = new Date();
    }

    public makeMove(socket: WebSocket, move: {from: string, to: string}){
        const isWhiteTurn = this.board.turn() === 'w';
        const currentPlayer = isWhiteTurn ? this.player1 : this.player2;

        // Validate it's the correct player's turn
        if (socket !== currentPlayer) {
        socket.send(JSON.stringify({ type: ERROR, message: 'It is not your turn' }));
        return;
        }
        try {
            this.board.move(move);
        }
        catch (error) {
            socket.send(JSON.stringify({ type: ERROR, message: 'Invalid move' }));
            return;
        }

        if(this.board.isGameOver()) {
            this.player1.send(JSON.stringify({ type: GAME_OVER, payload: {gameId: this.gameId, winner: this.board.turn() === 'w' ? 'black' : "white"} }));
            this.player2.send(JSON.stringify({ type: GAME_OVER, payload: {gameId: this.gameId, winner: this.board.turn()  === 'w' ? 'black' : "white"} }));
            return
        }
        // Broadcast the move to both players so each client updates immediately
        this.player1.send(JSON.stringify({ type: MOVE, payload: {gameId: this.gameId, move } }));
        this.player2.send(JSON.stringify({ type: MOVE, payload: {gameId: this.gameId, move } }));
    }   
}