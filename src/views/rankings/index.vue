<template>
  <div class="rankings-page">
    <block-box>
      <h1>Ranglisten</h1>
      <div v-if="!isLoaded" class="loader text-center">
        <b-spinner class="large-spinner text-success" />
      </div>
      <template v-else>
        <div>
            <button @click="setModeToGlobal" :disabled="currentMode === 'global'">Global</button>
            <button @click="setModeToLocal" :disabled="currentMode === 'local'">Local</button>
            <button @click="setModeToFriends" :disabled="currentMode === 'friends'">Friends</button>
        </div>
        <b-table striped hover :items="data" :fields="tableFields" v-if="isLoaded" />
      </template>
    </block-box>
  </div>
</template>

<script>

import { RANKINGS_LIST_GENERIC } from "@/store/actions/rankings";
import { mapGetters } from 'vuex';

export default {
  name: "Rankings",
  mounted() {
    this.loadSelected()
  },
  data() {
    return {
      currentMode: "global",
      isLoaded: false,
      tableFields: [
        { key: 'displayName', sortable: false, label: 'Ökoheld' },
        { key: 'points', sortable: false, label: 'Punkte'},
      ]
    }
  },
  computed: {
    ...mapGetters(['getLocal', 'getGlobal', 'getFriends']),
    data() {
        if (this.currentMode === "local") return this.getLocal;
        if (this.currentMode === "global") return this.getGlobal;
        if (this.currentMode === "friends") return this.getFriends;
    }    
  },
  watch: {  },
  methods: { 
      setModeToLocal () { 
          this.currentMode = "local"; 
          this.loadSelected(); 
      },
      setModeToGlobal () { 
          this.currentMode = "global"; 
          this.loadSelected(); 
      },
      setModeToFriends () { 
          this.currentMode = "friends"; 
          this.loadSelected(); 
      },
      loadSelected () {
          this.isLoaded = false
          this.$store.dispatch(RANKINGS_LIST_GENERIC, this.currentMode)
            .then(() => {
                this.isLoaded = true 
            })
      }
   }
};
</script>

<style lang="scss">

  .friends-page {
    .loader {
      margin: 50px 0;

      .large-spinner {
        width: 4rem;
        height: 4rem;
      }
    }

    .no-friends {
      text-align: center;
      margin: 50px 0;

      .sad-user {
        color: $warning;
        font-size: 4rem;
      }

      .no-friends-text {
        margin-top: 20px;

        .leaf-logo {
          width: 60px;
          height: 18px;
          object-fit: cover;
          object-position: left;
          margin-top: -4px;
        }
      }
    }

    .input-group {
      .input-group-append {
        .add-friend-button {
          @include border-right-radius($input-border-radius);
        }
      }
    }
  }

</style>