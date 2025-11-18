import java.net.InetSocketAddress;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import org.java_websocket.WebSocket;
import org.java_websocket.server.WebSocketServer;
import org.java_websocket.handshake.ClientHandshake;

public class WebSocketHandler extends WebSocketServer {

    private static Set<WebSocket> clients = Collections.synchronizedSet(new HashSet<>());

    public WebSocketHandler(InetSocketAddress address) {
        super(address);
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        clients.add(conn);
        System.out.println("Novo cliente conectado: " + conn.getRemoteSocketAddress());
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        System.out.println("Mensagem recebida: " + message);
        synchronized (clients) {
            for (WebSocket client : clients) {
                client.send(message);
            }
        }
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        clients.remove(conn);
        System.out.println("Cliente desconectado: " + conn.getRemoteSocketAddress());
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        System.err.println("Erro: " + ex.getMessage());
    }

    // ✅ Método exigido pela versão atual da biblioteca
@Override
public void onStart() {
    System.out.println("Servidor WebSocket iniciado!");
}




    public static void startServer() {
        WebSocketHandler server = new WebSocketHandler(new InetSocketAddress(8081));
        server.start();
        System.out.println("WebSocket rodando na porta 8081");
    }
}


