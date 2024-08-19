import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('listen', (server) => {
      console.log('Socket listen', server.address(), server.eventNames())
      const WebSocket = require('ws');

      const wss = new WebSocket.Server({ port: 8080 });

      wss.on('connection', (ws) => {
        ws.on('message', (message: void) => {
          const data = JSON.parse(message);

          // Распространяем сообщение на всех клиентов в комнате
          wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(message);
            }
          });
        });
      });

    })
  }
})