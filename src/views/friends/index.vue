<template>
  <div class="friends-page">
    <block-box>
      <h1>Deine Freunde</h1>
      <div v-if="!isLoaded" class="loader text-center">
        <b-spinner class="large-spinner text-success" />
      </div>
      <template v-else>
        <b-table striped hover :items="allFriends" v-if="showFriendsTable">
        </b-table>
        <div v-else class="no-friends">
          <font-awesome-icon :icon="['far', 'frown-open']" class="sad-user" />
          <div class="no-friends-text">
            Du hast leider noch keine Freunde auf <img src="/assets/logo.svg" width="70" class="leaf-logo" />. Füge doch jetzt jemand hinzu!
          </div>
        </div>
      </template>
    </block-box>
    <block-box>
      <b-form @submit.prevent="addFriend">
        <b-input-group>
          <b-form-input id="friend-email" name="friend-email" v-model="friendEmailModel" type="text" required placeholder="E-Mail Adresse Deines Freundes eingeben" />
          <b-button slot="append" variant="success" type="submit" class="add-friend-button" :disabled="isFriendAddLoading" title="Freund hinzufügen">
            <b-spinner small v-if="isFriendAddLoading" />
            <font-awesome-icon icon="check" v-if="friendAdded" class="mr-2" />
            <font-awesome-icon icon="times" v-if="friendAddedError" class="mr-2" />
            <font-awesome-icon icon="user-plus" />
          </b-button>
        </b-input-group>
      </b-form>
    </block-box>
  </div>
</template>

<script>

import { FRIENDS_LIST, FRIENDS_ADD, FRIENDS_REMOVE } from "@/store/actions/friends";
import { mapGetters } from 'vuex';

export default {
  name: "Friends",
  mounted() {
    this.$store.dispatch(FRIENDS_LIST)
      .then(() => {
        this.isLoaded = true 
      })
  },
  data() {
    return {
      isLoaded: false,
      isFriendAddLoading: false,
      friendAdded: false,
      friendAddedError: false,
      friendEmailModel: null
    }
  },
  computed: {
    ...mapGetters(['allFriends']),
    haveFriends () {
      return this.isLoaded && this.allFriends.length > 0
    },
    showFriendsTable () {
      return this.isLoaded && this.haveFriends
    }
  },
  watch: {
  },
  methods: {
    addFriend () {
      this.friendAdded = false
      this.friendAddedError = false
      this.isFriendAddLoading = true
      this.$store.dispatch(FRIENDS_ADD, this.friendEmailModel)
        .then(() => {
          this.isFriendAddLoading = false
          this.friendEmailModel = null
          this.friendAdded = true
        })
        .catch(() => {
          this.friendAddedError = true
          this.isFriendAddLoading = false
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