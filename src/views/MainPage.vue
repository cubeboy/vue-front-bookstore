<template>
  <v-container>
    <v-row class="text-center">
      <v-col md="12">
        <v-row md="12">
          <v-alert v-show="errorMessage" type="error">{{ errorMessage }}</v-alert>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col md="12">
        <v-data-table
          :headers="headers"
          :items="postsList"
          :items-per-page="5"
          item-key="id"
          class="elevation-1">
          <template v-slot:[`item.title`]="{ item }">
            <router-link :to="{ name: 'PostsDetailPage', params: { id: item.id} }">{{ item.title }}</router-link>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col md="12">
        <v-btn color="primary" @click="$router.push({name: 'PostsDetailPage'})">add</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import postsService from '@/services/PostsService'
import { mapGetters } from 'vuex'

export default {
  name: 'MainPage',
  computed: {
    ...mapGetters([
      'postsList'
    ])
  },
  created () {
    postsService.getAll().then((data) => {
      this.$store.dispatch('setPostsList', data)
    }).catch(error => {
      this.errorMessage = error.message
    })
  },
  data: function () {
    return {
      errorMessage: '',
      headers: [
        { text: '제목', value: 'title' },
        { text: '작성자', value: 'author' },
        { text: '내용', value: 'content' }
      ]
    }
  }
}
</script>
