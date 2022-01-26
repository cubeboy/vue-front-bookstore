export default {
  addPosts (state, posts) {
    state.postsList.push(posts)
  },
  updatePosts (state, posts) {
    const oldPosts = state.postsList.find((item) => item.id === posts.id)
    Object.assign(oldPosts, posts)
  },
  setPostsList (state, list) {
    state.postsList = list
  }
}
