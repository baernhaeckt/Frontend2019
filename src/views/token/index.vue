<template>
  <div>
  </div>
</template>

<script>
import { TOKEN_STORE } from '@/store/actions/token'

export default {
  name: 'Token',
  mounted () {
    this.$store.dispatch(TOKEN_STORE, this.$route.params.token)
    this.$router.push('/')
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>
