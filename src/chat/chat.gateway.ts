import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { AuthService } from "../auth/auth.service";
import { UnauthorizedException } from "@nestjs/common";

@WebSocketGateway({
  pingTimeout: 60000,
})

export class ChatGateway {
  @WebSocketServer()
  server: Server

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @SubscribeMessage('start-car')
  async joinRoom(client: Socket, data: { token: string }) {
    const userId = await this.authService.getVerifiedUseId(data.token);
    // if(!userId) {
    //   client.emit('user-no-uth',
    //     {
    //       statusCode: 401,
    //       error: 'No auth'
    //     })
    // }

    console.log(userId);

    return 'yes'
  }

}