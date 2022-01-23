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
  }
}
