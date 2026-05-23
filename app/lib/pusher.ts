import PusherServer from "pusher";
import PusherClient from "pusher-js";

let pusherServerInstance: PusherServer | null = null;

export const getPusherServer = (): PusherServer | null => {
  if (!pusherServerInstance) {
    const { PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER } = process.env;
    if (PUSHER_APP_ID && PUSHER_KEY && PUSHER_SECRET && PUSHER_CLUSTER) {
      pusherServerInstance = new PusherServer({
        appId: PUSHER_APP_ID,
        key: PUSHER_KEY,
        secret: PUSHER_SECRET,
        cluster: PUSHER_CLUSTER,
        useTLS: true,
      });
    } else {
      console.warn('Pusher server env vars missing - real-time updates disabled');
    }
  }
  return pusherServerInstance;
};

export const pusherServer = getPusherServer();

let pusherClientInstance: PusherClient | null = null;

export const getPusherClient = (): PusherClient | null => {
  if (!pusherClientInstance) {
    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;
    if (key && cluster) {
      pusherClientInstance = new PusherClient(key, { cluster });
    } else {
      console.warn('Pusher client env vars missing - real-time updates disabled');
    }
  }
  return pusherClientInstance;
};

export const pusherClient = getPusherClient();
