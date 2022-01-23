<template>
<v-app>
  <v-card>
    <v-app-bar elevation="3">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>
  </v-card>
  <v-main>
    <router-view />
  </v-main>
</v-app>
</template>
<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
