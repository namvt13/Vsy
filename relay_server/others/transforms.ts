import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
	input: fs.createReadStream("./types.graphql", {
		encoding: "utf8"
	})
});

const tempArr = [] as string[];

rl.on("line", (line) => {
	const splitArr = line.split("_");
	for (let i = 1; i < splitArr.length; i++) {
		splitArr[i] = splitArr[i][0].toLocaleUpperCase() + splitArr[i].slice(1);
	}
	tempArr.push(splitArr.join(""));
});
rl.on("close", () => {
	fs.writeFileSync("./types3.graphql", tempArr.join("\n"));
});
