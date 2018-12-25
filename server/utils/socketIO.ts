import socketIO from "socket.io";

function ioHandler(
	io: socketIO.Server,
	connectedIO: {id: string; user: string}[],
	user: any
) {
	return function(socket: socketIO.Socket) {
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
			io.to(`${socket.id}`).emit(
				"specific_event",
				`Hello there, ${JSON.stringify(user)}`
			);
		}
	};
}

export default ioHandler;
