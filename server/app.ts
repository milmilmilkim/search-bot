import express, { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import apiRouter from './api/index';
import http from 'http';
import io from './config/socket';

const app = express();
export const server = http.createServer(app);

app.get('/', (req: Request, res: Response) => {
  const sendData = {
    status: 200,
    data: {
      message: 'hello',
    },
  };
  res.send(sendData);
});

app.use('/api', apiRouter);

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => res.send(err));
app.use('*', (req, res, next) => res.status(400).send({ message: 'not found' }));

/* ================================ */

app.set('io', io);

//connection 이벤트 발생하면 소켓 생성되고 콜백함수 실행됨
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  //커스텀 이벤트
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

server.listen(4000, () => {
  console.log('4000에서 대기중');
});
