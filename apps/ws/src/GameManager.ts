import { WebSocket} from "ws";
import { GAME_INIT, MOVE } from "./messages";
import { Game } from "./Game";

export class GamaManager {
    private games: Game[] = [];
    private pendingUser: WebSocket | null;
    private users: WebSocket[] = [];

    public constructor(){
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }

    addUser(ws: WebSocket){
        // Add user to a game
        // console.log('User added to game');
        this.users.push(ws);
        this.addHandler(ws);
    }

    removeUser(ws: WebSocket){
        // Remove user from all games
        console.log('User removed from the game');
    
    }

    addHandler(socket: WebSocket) {
        // Handle incoming messages from users
        socket.on('message', (data: any) => {
            const message = JSON.parse(data.toString());
            const game_id = message.payload.gameId;
        if(message.type === GAME_INIT){
            if(this.pendingUser){
                // start a new game
                const game = new Game(this.pendingUser, socket, game_id);
                this.games.push(game);
                this.pendingUser = null;
            }
            else {
                //add user to pending
                this.pendingUser = socket;
            }
        }
        if(message.type === MOVE){
            const game_id = message.payload.gameId;
            const game = this.games.find(g => g.gameId === game_id);
            if(game){
                game.makeMove(socket, message.payload.move);
            }
        }
    }
)}
}