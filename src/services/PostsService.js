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
      resolve([
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
      ])
    })
  }
}
