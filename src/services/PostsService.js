import postsList from './__mocks__/FixturePosts'

var index = 5

export default {
  save (posts) {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          id: index++,
          title: posts.title,
          author: posts.author,
          content: posts.content
        })
      } catch (error) {
        reject(new Error('게시물 저장 오류 : ' + error.message))
      }
    })
  },
  getAll () {
    return new Promise((resolve, reject) => {
      try {
        resolve(postsList)
      } catch (error) {
        reject(error)
      }
    })
  },
  getPostsById (id) {
    return new Promise((resolve, reject) => {
      const posts = postsList.find(element => element.id === id)
      if (posts === undefined) {
        reject(new Error('삭제된 컨텐츠 입니다.'))
      } else {
        resolve(posts)
      }
    })
  }
}
