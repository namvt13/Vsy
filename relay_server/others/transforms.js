"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const rl = readline_1.default.createInterface({
    input: fs_1.default.createReadStream("./types.graphql", {
        encoding: "utf8"
    })
});
const tempArr = [];
rl.on("line", (line) => {
    const splitArr = line.split("_");
    for (let i = 1; i < splitArr.length; i++) {
        splitArr[i] = splitArr[i][0].toLocaleUpperCase() + splitArr[i].slice(1);
    }
    tempArr.push(splitArr.join(""));
});
rl.on("close", () => {
    fs_1.default.writeFileSync("./types3.graphql", tempArr.join("\n"));
});
