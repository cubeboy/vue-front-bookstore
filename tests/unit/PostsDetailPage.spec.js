import { mount, createLocalVue } from '@vue/test-utils'
import PostsDetailPage from '@/views/PostsDetailPage'
import PostsService from '@/services/PostsService'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
const vuetify = new Vuetify()
localVue.use(VueRouter)
const router = new VueRouter()

jest.mock('@/services/PostsService')

describe('PostsDetailPage.vue', () => {
  let wrapper
  let fieldTitle
  let fieldAuthor
  let fieldContent
  let buttonSave
  let saveSpy

  const title = 'Test Title'
  const author = 'authro@test.com'
  const content = 'Post content test'

  beforeEach(() => {
    wrapper = mount(PostsDetailPage, {
      localVue,
      router,
      vuetify
    })

    saveSpy = jest.spyOn(PostsService, 'save')
    fieldTitle = wrapper.find('#title')
    fieldAuthor = wrapper.find('#author')
    fieldContent = wrapper.find('#content')
    buttonSave = wrapper.find('.v-form .v-btn')
  })

  afterEach(() => {
    saveSpy.mockReset()
    saveSpy.mockRestore()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('PostsDetailPage : 폼컨트롤 랜더링 확인', () => {
    expect(fieldTitle.element.value).toEqual('')
    expect(fieldAuthor.element.value).toEqual('')
    expect(fieldContent.element.value).toEqual('')
    expect(buttonSave.text()).toEqual('save')
  })

  it('PostsDetailPage : Model to Form binding test', async () => {
    const form = wrapper.vm.form
    form.title = title
    form.author = author
    form.content = content

    await wrapper.vm.$nextTick()

    expect(fieldTitle.element.value).toEqual(title)
    expect(fieldAuthor.element.value).toEqual(author)
    expect(fieldContent.element.value).toEqual(content)
  })

  it('PostsDetailPage : save clicked test', async () => {
    const stub = jest.fn()
    wrapper.vm.postsSave = stub
    buttonSave.trigger('click')
    expect(stub).toBeCalled()
  })

  it('PostsDetailPage : save service error', async () => {
    const form = wrapper.vm.form
    form.title = 'Error title'
    form.authro = author
    form.content = content

    expect(wrapper.find('.v-alert').isVisible()).toBe(false)
    buttonSave.trigger('click')
    await wrapper.vm.$nextTick()
    expect(saveSpy).toBeCalled()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-alert').isVisible()).toBe(true)

  })

  it('PostsDetailPage : input form validate', async () => {

  })
})
