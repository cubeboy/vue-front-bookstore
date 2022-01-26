import postsList from './FixturePosts'

export default {
  save (posts) {
    return new Promise((resolve, reject) => {
      if (posts.title === 'Test Title') {
        resolve({
          id: 1,
          title: posts.title,
          author: posts.author,
          content: posts.content
        })
      } else {
        reject(new Error('게시물 저장 오류'))
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
