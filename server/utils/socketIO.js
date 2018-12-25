"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ioHandler(io, connectedIO, user) {
    return function (socket) {
        connectedIO.push({
            id: socket.id,
            user: user ? user.name : "Unregistered User"
        });
        io.emit("news", {
            msg: "Welcome to Vnsy! The best place on eath!",
            ids: JSON.stringify(connectedIO)
        });
        socket.on("disconnect", () => {
            io.emit("news", {
                ids: JSON.stringify(socket.id)
            });
        });
        if (user) {
            io.to(`${socket.id}`).emit("specific_event", `Hello there, ${JSON.stringify(user)}`);
        }
    };
}
exports.default = ioHandler;
