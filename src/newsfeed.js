import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'

const connection = new HubConnectionBuilder()
  .withUrl("https://baernhaeckt.azurewebsites.net/" + 'newsfeed')
  .configureLogging(LogLevel.Information)
  .build()

  connection.on('newEvent', (event) => {
    // TODO: Implement the newsfeed.
    console.log("Event: " + event)
  });
 
connection.start()