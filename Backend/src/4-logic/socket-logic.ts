import { Server as SocketServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import VacationModel from "../5-models/vacation-model";

let socketServer: SocketServer;

function init(httpServer: HttpServer): void {

    socketServer = new SocketServer(httpServer, { cors: { origin: "*" } })

    socketServer.sockets.on("connection", (socket: Socket) => {
        console.log("client is connected")
    })

};

function reportAddVacation(vacation: VacationModel) {
    socketServer.sockets.emit("admin-added-vacation", vacation)
}

function reportUpdatedVacation(vacation: VacationModel) {
    socketServer.sockets.emit("admin-updated-vacation", vacation)
}

function reportDeletedVacation(vacationId: number) {
    socketServer.sockets.emit("admin-deleted-vacation", vacationId)
}

export default {
    init,
    reportAddVacation,
    reportUpdatedVacation,
    reportDeletedVacation,
};
