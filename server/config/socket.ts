import { Server } from 'socket.io';
import { server } from '../app';

export default new Server(server, {
  cors: {
    origin: ['http://localhost:5000'],
  },
});
