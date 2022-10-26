"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./api/index"));
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("./config/socket"));
const app = (0, express_1.default)();
exports.server = http_1.default.createServer(app);
app.get('/', (req, res) => {
    const sendData = {
        status: 200,
        data: {
            message: 'hello',
        },
    };
    res.send(sendData);
});
app.use('/api', index_1.default);
app.use((err, req, res, next) => res.send(err));
app.use('*', (req, res, next) => res.status(400).send({ message: 'not found' }));
/* ================================ */
app.set('io', socket_1.default);
//connection 이벤트 발생하면 소켓 생성되고 콜백함수 실행됨
socket_1.default.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    //커스텀 이벤트
    socket.on('chat message', (msg) => {
        socket_1.default.emit('chat message', msg);
        console.log('message: ' + msg);
    });
});
exports.server.listen(4000, () => {
    console.log('4000에서 대기중');
});
