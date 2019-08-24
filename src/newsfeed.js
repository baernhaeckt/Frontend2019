import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
 
const connection = new HubConnectionBuilder()
  .withUrl('http://localhost:5000/newsfeed')
  .configureLogging(LogLevel.Information)
  .build()
 
connection.start()