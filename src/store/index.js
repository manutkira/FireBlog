import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../firebase/firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: 'Blog Card #1', blogCoverPhoto: 'stock-1', blogDate: 'May 1, 2021'
      },
      {
        blogTitle: 'Blog Card #2', blogCoverPhoto: 'stock-2', blogDate: 'May 1, 2021'
      },
      {
        blogTitle: 'Blog Card #3', blogCoverPhoto: 'stock-3', blogDate: 'May 1, 2021'
      },
      {
        blogTitle: 'Blog Card #4', blogCoverPhoto: 'stock-4', blogDate: 'May 1, 2021'
      }
    ],
    blogHTML: 'Write your blog title here...',
    blogTitle: '',
    blogPhotoName: '',
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    newBlogPost(state,payload){
      state.blogHTML = payload
    },
    updateBlogTitle(state,payload){
      state.blogTitle = payload
    },
    fileNameChange(state, payload){
      state.blogPhotoName = payload
    },
    CreateFileURL(state, payload){
      state.blogPhotoFileURL = payload
    },
    openPhotoPreview(state){
      state.blogPhotoPreview = !state.blogPhotoPreview
    },
    toggleEditPost(state, payload){
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileAdmin(state, payload){
      state.profileAdmin = payload
    },
    setProfileInfo(state, doc){
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUserName = doc.data().userName;
    },
    setProfileInitials(state){
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join('') + state.profileLastName.match(/(\b\S)?/g).join('')
    },
    changeFirstName(state,payload){
      state.profileFirstName = payload
    },
    changeLastName(state,payload){
      state.profileLastName = payload
    },
    changeUserName(state,payload){
      state.profileUserName = payload
    },
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      const dataBase = await db.collection("user").doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit("setProfileAdmin", admin);
    },
    async updateUserSetting({commit, state}){
      const dataBase = await db.collection('user').doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        userName: state.profileUserName
      })
      commit('setProfileInitials')
    }
  },
  modules: {
  }
})
