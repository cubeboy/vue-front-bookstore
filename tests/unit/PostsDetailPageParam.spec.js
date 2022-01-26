import { mount, createLocalVue } from '@vue/test-utils'
import PostsDetailPage from '@/views/PostsDetailPage'
import PostsService from '@/services/PostsService'
import Vuetify from 'vuetify'

jest.mock('@/services/PostsService')

describe('PostsDetailPage.vue Test', () => {
  /*
  let fieldTitle
  let fieldAuthor
  let fieldContent
  let buttonSave
  let saveSpy
  */
  let getPostsByIdSpy

  /*
  const title = 'Test Title'
  const author = 'authro@test.com'
  const content = 'Post content test'
  */

  beforeEach(() => {
    getPostsByIdSpy = jest.spyOn(PostsService, 'getPostsById')
    /*
    saveSpy = jest.spyOn(PostsService, 'save')
    fieldTitle = wrapper.find('#title')
    fieldAuthor = wrapper.find('#author')
    fieldContent = wrapper.find('#content')
    buttonSave = wrapper.find('.v-form .v-btn:nth-child(2)')
    */
  })

  afterEach(() => {
    getPostsByIdSpy.mockReset()
    getPostsByIdSpy.mockRestore()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('PostsDetailPage : Find post is Fail - not found', async () => {
    const localVue = createLocalVue()
    const vuetify = new Vuetify()
    const id = 5
    const $route = {
      params: {
        id
      }
    }

    const wrapper = mount(PostsDetailPage, {
      mocks: {
        $route
      },
      localVue,
      vuetify
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.form.id).toEqual('')
    expect(getPostsByIdSpy).toBeCalled()
    expect(wrapper.find('.v-alert').isVisible()).toBe(true)
  })

  it('PostsDetailPage : Find post is Success', async () => {
    const localVue = createLocalVue()
    const vuetify = new Vuetify()
    const id = 2
    const $route = {
      params: {
        id
      }
    }

    const wrapper = mount(PostsDetailPage, {
      mocks: {
        $route
      },
      localVue,
      vuetify
    })

    await wrapper.vm.$nextTick()
    expect(getPostsByIdSpy).toBeCalled()
    expect(wrapper.vm.form.id).toEqual(2)
    expect(wrapper.vm.form.title).toEqual('삼대')
    expect(wrapper.vm.form.author).toEqual('염상섭')
    expect(wrapper.vm.form.content).toEqual('만세전과 함께 염상섭의 대표작')
    expect(wrapper.find('.v-alert').isVisible()).toBe(false)
  })
})
