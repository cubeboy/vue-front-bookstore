<template>
  <v-container>
    <v-row class="text-center">
      <v-col md="12">
        <v-form ref="form">
          <v-container>
            <v-row md="12">
              <v-alert v-show="errorMessage" type="error">{{ errorMessage }}</v-alert>
            </v-row>
            <v-row>
              <v-col md="6"><v-text-field id="title" label="제목" v-model="form.title"></v-text-field></v-col>
            </v-row>
            <v-row>
              <v-col md="6"><v-text-field id="author" label="작성자" v-model="form.author"></v-text-field></v-col>
            </v-row>
            <v-row>
              <v-col md="12"><v-textarea id="content" label="내용" v-model="form.content"></v-textarea></v-col>
            </v-row>
            <v-row>
              <v-col md="12"><v-btn color="primary" @click="postsSave()">save</v-btn></v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'PostsDetailPage',
  data: function () {
    return {
      form: {
        id: '',
        title: '',
        author: '',
        content: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    postsSave () {
      return PostsService.save(this.form).then(data => {
        console.log(data)
      }).catch(error => {
        this.errorMessage = error.message
      })
    }
  }
}
</script>
