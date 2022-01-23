<template>
  <v-container>
    <v-row class="text-center">
      <v-col md="12">
        <v-form ref="form" v-model="form.valid">
          <v-container>
            <v-row md="12">
              <v-alert v-show="errorMessage" type="error">{{ errorMessage }}</v-alert>
            </v-row>
            <v-row>
              <v-col md="6"><v-text-field id="title" label="제목" v-model="form.title" :rules="form.titleRules"></v-text-field></v-col>
            </v-row>
            <v-row>
              <v-col md="6"><v-text-field id="author" label="작성자" v-model="form.author" :rules="form.authroRules"></v-text-field></v-col>
            </v-row>
            <v-row>
              <v-col md="12"><v-textarea id="content" label="내용" v-model="form.content" :rules="form.contentRules"></v-textarea></v-col>
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
        valid: true,
        id: '',
        title: '',
        titleRules: [
          v => !!v || '타이틀은 필수 입력 입니다.'
        ],
        author: '',
        authroRules: [
          v => !!v || '작성자는 필수 입력 입니다.',
          v => (!!v && v.length >= 2) || '작성자는 2글자 이상 입력 해야 합니다.'
        ],
        content: '',
        contentRules: [
          v => !!v || '내용은 필수 입력 입니다.',
          v => (!!v && v.length >= 10) || '내용에는 10글자 이상 입력 해야 합니다.'
        ]
      },
      errorMessage: ''
    }
  },
  methods: {
    postsSave () {
      if (this.form.valid === false) {
        return
      }

      return PostsService.save(this.form).then(data => {
        console.log(data)
        this.$router.push({ name: 'main' })
      }).catch(error => {
        this.errorMessage = error.message
      })
    }
  }
}
</script>
