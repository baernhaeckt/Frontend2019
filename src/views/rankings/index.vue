<template>
  <div class="rankings-page">
    <block-box>
      <h1>Ranglisten</h1>
      <div v-if="!isLoaded" class="loader text-center">
        <b-spinner class="large-spinner text-success" />
      </div>
      <template v-else>
        <b-button-group size="lg" class="mt-3 mb-4 switch-buttons">
            <b-button variant="success" @click="setModeToGlobal" :disabled="currentMode === 'global'">Global</b-button>
            <b-button variant="success" @click="setModeToLocal" :disabled="currentMode === 'local'">Local</b-button>
            <b-button variant="success" @click="setModeToFriends" :disabled="currentMode === 'friends'">Friends</b-button>
        </b-button-group>

        <b-table striped hover :items="data" :fields="tableFields" v-if="isLoaded" />
      </template>
    </block-box>
  </div>
</template>

<script>
import { RANKINGS_LIST_GENERIC } from "@/store/actions/rankings";
import { mapGetters } from "vuex";

export default {
  name: "Rankings",
  mounted() {
    this.loadSelected();
  },
  data() {
    return {
      currentMode: "global",
      isLoaded: false,
      tableFields: [
        { key: "displayName", sortable: false, label: "Ökoheld" },
        { key: "points", sortable: false, label: "Punkte" }
      ]
    };
  },
  computed: {
    ...mapGetters(["getLocal", "getGlobal", "getFriends"]),
    data() {
      if (this.currentMode === "local") {
        return this.getLocal;
      }
      if (this.currentMode === "global") {
        return this.getGlobal;
      }
      if (this.currentMode === "friends") {
        return this.getFriends;
      }
    }
  },
  watch: {},
  methods: {
    setModeToLocal() {
      this.currentMode = "local";
      this.loadSelected();
    },
    setModeToGlobal() {
      this.currentMode = "global";
      this.loadSelected();
    },
    setModeToFriends() {
      this.currentMode = "friends";
      this.loadSelected();
    },
    loadSelected() {
      this.isLoaded = false;
      this.$store.dispatch(RANKINGS_LIST_GENERIC, this.currentMode).then(() => {
        this.isLoaded = true;
      });
    }
  }
};
</script>

<style lang="scss">
.rankings-page {
  .loader {
    margin: 50px 0;

    .large-spinner {
      width: 4rem;
      height: 4rem;
    }
  }

  .switch-buttons {
    width: 100%;
  }
}
</style>
