# ngChatroom
playing around with socket.io and ngx-socket-io

## notes
- no database attached, server.js has a fake object to hold room information
- each room is just a mega-textarea input box
- utilizes a service to handle socket event handlers
- ngDestroys are to unsubscribe when a channel is no longer being listened to
- global-shim.ts in public is due to this bug: https://github.com/angular/angular-cli/issues/8160

### more detailed walk-thru found at https://alligator.io/angular/socket-io/
