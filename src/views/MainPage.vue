<template>
  <v-container>
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
export default {
  name: 'MainPage',
  data: function () {
    return {
      headers: [
        { text: '제목', value: 'title' },
        { text: '작성자', value: 'author' },
        { text: '내용', value: 'content' }
      ],
      postsList: [
        {
          id: 1,
          title: '1st Title',
          author: 'FirstUser',
          content: 'First content'
        },
        {
          id: 2,
          title: '2st Title',
          author: 'SecondUser',
          content: 'Second content'
        },
        {
          id: 3,
          title: '3st Title',
          author: 'ThirdUser',
          content: 'Third content'
        }
      ]
    }
  }
}
</script>
