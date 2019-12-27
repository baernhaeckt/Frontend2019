<template>
  <block-box>
    <h3>Deine Umgebung</h3>
    <div class="loading-container">
      <div class="google-maps-container" ref="mapscontainer" />
      <div class="loader text-center" v-if="isLoading">
        <b-spinner class="large-spinner text-success" />
      </div>
      <div v-show="showInfoWindowContent" class="info-window-content" ref="infoWindowChartContent" >
        <GChart class="chart-container" type="ColumnChart"
            :data="infoWindowData"
            :options="chartOptions" />
      </div>
    </div>
  </block-box>
</template>

<script>
import {
  FRIENDS_LIST
} from '@/store/actions/friends'
import { mapGetters } from 'vuex'
import gmapsInit from '@/utils/map'

export default {
  name: 'GoogleMap',
  async mounted () {
    this.isLoading = true
    try {
      this.google = await gmapsInit()
      // const geocoder = new google.maps.Geocoder()

      var mapOptions = {
        zoom: 12,
        center: { lat: 46.942097, lng: 7.438022 }, // Marzili
        disableDefaultUI: true,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
          {
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#f5f1e6' }]
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#c9b2a6' }]
          },
          {
            featureType: 'administrative.land_parcel',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#dcd2be' }]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#ae9e90' }]
          },
          {
            featureType: 'administrative.neighborhood',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#93817c' }]
          },
          { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{ color: '#a5b076' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#447530' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#f5f1e6' }]
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{ color: '#fdfcf8' }]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#f8c967' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#e9bc62' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{ color: '#e98d58' }]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#db8555' }]
          },
          { featureType: 'road.local', stylers: [{ visibility: 'off' }] },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#806b63' }]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#8f7d77' }]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ebe3cd' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#b9d3c2' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#92998d' }]
          }
        ]
      }

      this.map = new this.google.maps.Map(this.$refs.mapscontainer, mapOptions)
    } catch (error) {
      this.$snack.danger({
        text: error
      })
    }

    this.$store.dispatch(FRIENDS_LIST).then(() => {
      var infoWindow = new this.google.maps.InfoWindow({
        content: null,
        maxHeight: 250
      })
      this.allFriends.forEach(friend => {
        var marker = new this.google.maps.Marker({
          position: {
            lat: friend.location.latitude,
            lng: friend.location.longitude
          },
          icon: '/assets/leaf_marker.png',
          map: this.map,
          title: `${friend.displayName || friend.email} - ${friend.points}`
        })

        var self = this

        marker.addListener('click', function () {
          self.openInfoWindowForFriend(infoWindow, friend, self.map, marker)
        })
      })

      this.isLoading = false

      this.$nextTick(() => {
        var self = this
        window.addEventListener('resize', () => {
          var currCenter = self.map.getCenter()
          this.google.maps.event.trigger(self.map, 'resize')
          self.map.setCenter(currCenter)
        })
      })
    })
  },
  data () {
    return {
      map: undefined,
      isLoading: false,
      showInfoWindowContent: false,
      infoWindowUser: null,
      google: undefined
    }
  },
  computed: {
    ...mapGetters(['allFriends', 'getProfile']),
    infoWindowData () {
      let friend = this.infoWindowUser
      let own = this.getProfile

      if (friend === null || own === null) {
        return []
      }

      return [
        ['Name', 'Punkte'],
        ['Du', own.points],
        [friend.displayName || friend.email, friend.points]
      ]
    },
    chartOptions () {
      let friend = this.infoWindowUser
      if (friend === null) {
        return {}
      }

      return {
        title: `Du im Vergleich zu ${friend.displayName || friend.email}`,
        width: 250,
        height: 175,
        legend: { position: 'none' }
      }
    }
  },
  methods: {
    openInfoWindowForFriend (infoWindow, friend, map, marker) {
      this.infoWindowUser = friend
      this.showInfoWindowContent = true
      infoWindow.setContent(this.$refs.infoWindowChartContent)
      infoWindow.open(map, marker)
    }
  }
}
</script>

<style lang="scss">
.loading-container {
  position: relative;

  .google-maps-container {
    width: 100%;
    height: 50vh;
  }

  .info-window-content {
    overflow: hidden;
  }

  .loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: #444;
    opacity: 0.4;

    .large-spinner {
      width: 4rem;
      height: 4rem;

      position: absolute;
      top: calc(50% - 2rem);
      left: calc(50% - 2rem);
    }
  }
}
</style>
