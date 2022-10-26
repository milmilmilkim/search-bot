"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const app_1 = require("../app");
exports.default = new socket_io_1.Server(app_1.server, {
    cors: {
        origin: ['http://localhost:5000'],
    },
});
