<template>
  <block-box>
    <h3>Auszeichnungen</h3>
    <ul class="list-unstyled">
      <li><font-awesome-icon :icon="['fab', 'pagelines']" class="mr-2 color-green" /> Öko-Meister</li>
    </ul>
  </block-box>
</template>

<script>
import BlockBox from './BlockBox'

export default {
  name: "UserBadges",
  mounted() {
  },
  data() {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
  components: {
    BlockBox
  }
};
</script>
