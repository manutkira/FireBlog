<template>
  <div class="home"> 
    <BlogPost v-if="!user" :post="welcomeScreen"/>
    <BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index"/>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blogs-card">
          <blog-card :post="post" v-for="(post, index) in blogPostsCard" :key="index"/>
        </div>
      </div>
    </div>
    <div v-if="!user" class="update">
      <div class="container">
        <h2>Never miss a post. Register a account today!</h2>
        <router-link class="router-button" to="#">
          Register for FireBlogs <Arrow class="arrow arrow-light"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from '../components/BlogCard.vue';
import BlogPost from '../components/BlogPost.vue';
import Arrow from '../assets/Icons/arrow-right-light.svg';
export default {
  name: "Home",
  components: {BlogPost, BlogCard, Arrow},
  data() {
    return{
      welcomeScreen: {
        title: 'Welcome!',
        BlogPost: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi laboriosam quaerat repudiandae? Deleniti, amet at. Omnis corporis impedit officia adipisci!',
        welcomeScreen: true,
        photo: 'coding',
      },
    };
  },
  computed: {
    blogPostsFeed(){
      return this.$store.getters.blogPostsFeed;
    },
    blogPostsCard(){
      return this.$store.getters.blogPostsCard;
    },
    user(){
      return this.$store.state.user
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }
    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }
    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>