<template>
<v-app>
  <v-card>
    <v-app-bar elevation="3">
      <router-link :to="{name: 'MainPage'}"><v-icon large>mdi-clipboard-text</v-icon></router-link>
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

<style scoped>
  a { text-decoration: none;}
</style>
