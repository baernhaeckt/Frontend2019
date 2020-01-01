import { RANKINGS_LIST_GLOBAL, RANKINGS_LIST_FRIENDS, RANKINGS_LIST_LOCAL, RANKINGS_SUMMARY } from '@/store/actions/rankings'
import { AWARDS_LIST } from '@/store/actions/awards'

import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
import { settings } from '@/settings'

let connection = null

function refreshDataForEvent (event) {
  let vueStore = window.vueInstance.$store
  switch (event.title) {
    case 'Neue Punkte':
    case 'Punkte erhalten':
      vueStore.dispatch(RANKINGS_LIST_GLOBAL)
      vueStore.dispatch(RANKINGS_LIST_FRIENDS)
      vueStore.dispatch(RANKINGS_LIST_LOCAL, vueStore.getters.getProfile.postalCode)
      vueStore.dispatch(RANKINGS_SUMMARY)
      break
    case 'Neuer Award':
    case 'Award erhalten':
      vueStore.dispatch(AWARDS_LIST)
      break
  }
}

const startConnection = apiToken => {
  connection = new HubConnectionBuilder()
    .withUrl(settings.API_SERVER + 'newsfeed', {
      accessTokenFactory: () => apiToken
    })
    .configureLogging(LogLevel.Information)
    .build()

  connection.on('newEvent', event => {
    refreshDataForEvent(event)
    window.vueInstance.$bvToast.toast(event.message, {
      title: event.title,
      variant: event.variant,
      solid: true,
      autoHideDelay: 5000
    })
  })

  connection.start()
}

const stopConnection = () => {
  connection.stop()
}

export default {
  startConnection,
  stopConnection
}
