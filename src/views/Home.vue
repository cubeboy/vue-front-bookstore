<template>
<v-app>
  <v-card>
    <v-app-bar elevation="3">
      <router-link :to="{name: 'MainPage'}"><v-icon large>mdi-home-city</v-icon></router-link>
    </v-app-bar>
  </v-card>
  <v-main>
    <router-view />
  </v-main>
  <v-overlay :value="isLoading" absolute >
    <div class="text-center">
      <v-progress-circular
        size="100"
        color="amber"
        indeterminate
      >처리중</v-progress-circular>
    </div>
  </v-overlay>
</v-app>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters([
      'isLoading'
    ])
  },
  components: {
  },
  created () {
    if (this.$route.path === '/') this.$router.push({ name: 'MainPage' })
  }
}
</script>

<style scoped>
  a { text-decoration: none; }
</style>
