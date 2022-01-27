<template>
  <v-container>
    <v-row class="text-center">
      <v-col md="12">
        <v-form ref="form" v-model="formValid">
          <v-container>
            <v-row md="12">
              <v-alert v-show="errorMessage" type="error">{{ errorMessage }}</v-alert>
            </v-row>
            <v-row>
              <v-col md="6"><v-text-field id="title" label="제목" v-model="form.title" :rules="validRules.titleRules"></v-text-field></v-col>
            </v-row>
            <v-row>
              <v-col md="6"><v-text-field id="author" label="작성자" v-model="form.author" :rules="validRules.authroRules"></v-text-field></v-col>
            </v-row>
            <v-row>
              <v-col md="12"><v-textarea id="content" label="내용" v-model="form.content" :rules="validRules.contentRules"></v-textarea></v-col>
            </v-row>
            <v-row>
              <v-col md="12">
                <v-btn-toggle>
                  <v-btn block color="secondary" @click="$router.push({name: 'MainPage'})">cancel</v-btn>
                  <v-btn block color="primary" @click="postsSave()">save</v-btn>
                </v-btn-toggle>
              </v-col>
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
  mounted () {
    if (this.$route.params.id === undefined) { return }

    this.$store.dispatch('setIsLoading', true)
    return PostsService.getPostsById(this.$route.params.id).then((data) => {
      this.mode = 'updatePosts'
      Object.assign(this.form, data)
      this.$store.dispatch('setIsLoading', false)
    }).catch(error => {
      this.errorMessage = error.message
      this.$store.dispatch('setIsLoading', false)
    })
  },
  data: function () {
    return {
      formValid: true,
      mode: 'addPosts',
      form: {
        id: '',
        title: '',
        author: '',
        content: ''
      },
      validRules: {
        titleRules: [
          v => !!v || '타이틀은 필수 입력 입니다.'
        ],
        authroRules: [
          v => !!v || '작성자는 필수 입력 입니다.',
          v => (!!v && v.length >= 2) || '작성자는 2글자 이상 입력 해야 합니다.'
        ],
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
      if (this.formValid === false) {
        return
      }
      this.$store.dispatch('setIsLoading', true)
      if (this.mode === 'updatePosts') {
        setTimeout(() => {
          this.$store.dispatch(this.mode, this.form)
          this.$router.push({ name: 'MainPage' })
          this.$store.dispatch('setIsLoading', false)
        }, 3000)
      } else {
        return PostsService.save(this.form).then(data => {
          this.$store.dispatch(this.mode, data)
          this.$router.push({ name: 'MainPage' })
        }).catch(error => {
          this.$store.dispatch('setIsLoading', false)
          this.errorMessage = error.message
        })
      }
    }
  }
}
</script>
