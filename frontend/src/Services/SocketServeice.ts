import { Socket, io } from 'socket.io-client';
import VacationModel from '../Models/VacationModel';
import store from '../Redux/Store';
import { addVacationAction, deleteVacationAction, updateFullVacationAction } from '../Redux/VacationsState';
import config from '../Utils/Config';
class SocketService {

    private socket: Socket;

    // connects to the server and returns the socket for live data updates
    public connect(): void {
        this.socket = io(config.socketUrl)
        this.listen();
    };

    public listen(): void {

        this.socket.on("admin-added-vacation", (vacation: VacationModel) => {
            console.log("added")
            store.dispatch(addVacationAction(vacation))
        });

        this.socket.on("admin-updated-vacation", (vacation: VacationModel) => {
            console.log("updated");
            store.dispatch(updateFullVacationAction(vacation));
        });

        this.socket.on("admin-deleted-vacation", (id: number) => {
            console.log("deleted")
            store.dispatch(deleteVacationAction(id))
        });

    };

    public disconnect(): void {
        this.socket.disconnect();
    };

}
const socketService = new SocketService();
export default socketService;