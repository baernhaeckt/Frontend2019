import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
import { settings } from "@/settings";

const connection = new HubConnectionBuilder()
  .withUrl(settings.API_SERVER + 'newsfeed')
  .configureLogging(LogLevel.Information)
  .build()

connection.on('newEvent', (event) => {
  /* let event = {
    title: '',
    message: '',
    variant: ''
  } */
  window.vueInstance.$bvToast.toast(event.message, {
    title: event.title,
    variant: event.variant,
    solid: true,
    autoHideDelay: 5000
  })
});
 
connection.start()