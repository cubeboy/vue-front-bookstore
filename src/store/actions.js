export const addPosts = ({ commit }, posts) => {
  commit('addPosts', posts)
}

export const updatePosts = ({ commit }, posts) => {
  commit('updatePosts', posts)
}

export const setPostsList = ({ commit }, list) => {
  commit('setPostsList', list)
}

export const setIsLoading = ({ commit }, status) => {
  commit('setIsLoading', status)
}
