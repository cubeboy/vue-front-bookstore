import { mount, createLocalVue } from '@vue/test-utils'
import PostsDetailPage from '@/views/PostsDetailPage'
import PostsService from '@/services/PostsService'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import store from '@/store'

const localVue = createLocalVue()
const vuetify = new Vuetify()
localVue.use(VueRouter)
const router = new VueRouter()

jest.mock('@/services/PostsService')

describe('PostsDetailPage.vue Test', () => {
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
      store,
      router,
      vuetify
    })

    saveSpy = jest.spyOn(PostsService, 'save')
    fieldTitle = wrapper.find('#title')
    fieldAuthor = wrapper.find('#author')
    fieldContent = wrapper.find('#content')
    buttonSave = wrapper.find('.v-form .v-btn:nth-child(2)')
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

  it('PostsDetailPage : Form to Model  binding test', async () => {
    const form = wrapper.vm.form
    fieldTitle.setValue(title)
    fieldAuthor.setValue(author)
    fieldContent.setValue(content)

    await wrapper.vm.$nextTick()

    expect(form.title).toEqual(title)
    expect(form.author).toEqual(author)
    expect(form.content).toEqual(content)
  })

  it('PostsDetailPage : save clicked test', async () => {
    const stub = jest.fn()
    wrapper.vm.postsSave = stub
    buttonSave.trigger('click')
    expect(stub).toBeCalled()
  })

  it('PostsDetailPage : save service error', async () => {
    fieldTitle.setValue('Error title')
    fieldAuthor.setValue(author)
    fieldContent.setValue(content)

    wrapper.vm.$refs.form.validate()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formValid).toEqual(true)
    expect(wrapper.find('.v-alert').isVisible()).toBe(false)
    buttonSave.trigger('click')
    await wrapper.vm.$nextTick()
    expect(saveSpy).toBeCalled()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-alert').isVisible()).toBe(true)
  })

  it('PostsDetailPage : input form title validate', async () => {
    fieldTitle.setValue('')
    fieldAuthor.setValue(author)
    fieldContent.setValue(content)

    wrapper.vm.$refs.form.validate()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formValid).toEqual(false)
    buttonSave.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formValid).toEqual(false)
    expect(saveSpy).not.toBeCalled()
  })

  it('PostsDetailPage : input form author validate', async () => {
    fieldTitle.setValue(title)
    fieldAuthor.setValue('?')
    fieldContent.setValue(content)

    wrapper.vm.$refs.form.validate()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formValid).toEqual(false)
    buttonSave.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formValid).toEqual(false)
    expect(saveSpy).not.toBeCalled()
  })

  it('PostsDetailPage : input form content validate', async () => {
    fieldTitle.setValue(title)
    fieldAuthor.setValue(author)
    fieldContent.setValue('짧은내용')

    wrapper.vm.$refs.form.validate()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formValid).toEqual(false)
    buttonSave.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formValid).toEqual(false)
    expect(saveSpy).not.toBeCalled()
  })

  it('PostsDetailPage : save service success', async () => {
    fieldTitle.setValue(title)
    fieldAuthor.setValue(author)
    fieldContent.setValue(content)

    const stub = jest.fn()
    wrapper.vm.$router.push = stub

    wrapper.vm.$refs.form.validate()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formValid).toEqual(true)
    expect(wrapper.find('.v-alert').isVisible()).toBe(false)
    buttonSave.trigger('click')
    await wrapper.vm.$nextTick()
    expect(saveSpy).toBeCalled()
    await wrapper.vm.$nextTick()
    console.log(wrapper.vm.errorMessage)
    expect(wrapper.find('.v-alert').isVisible()).toBe(false)
    expect(stub).toHaveBeenCalledWith({ name: 'MainPage' })
  })
})
