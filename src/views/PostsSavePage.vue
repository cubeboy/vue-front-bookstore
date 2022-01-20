<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" md="12">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="10"><v-text-field id="title" label="제목"></v-text-field></v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="10"><v-text-field id="author" label="작성자"></v-text-field></v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="10"><v-textarea id="content" label="내용"></v-textarea></v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'PostsSavePage',
  data: function () {
    return {

    }
  }
}
</script>
