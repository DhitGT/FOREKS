<template>
  <v-app dark>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      fetchCookie: 'fetchCookie',
    }),
  },
  created() {
    this.fetchCookie()
  },
}
</script>

