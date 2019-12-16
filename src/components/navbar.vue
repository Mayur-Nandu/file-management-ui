<template>
  <div class="nav"> 
    <h1 class="title">{{ title }} </h1>
    <span class="btns" v-if="logedin === 'false'"> 
      <!-- <button src="/login">Login</button> -->
      <router-link to="/Login" tag="button">Login</router-link>
      <router-link to="/Signup" tag="button">Signup</router-link>
    </span>
     <span class="btns" v-if="logedin === 'true'"> 
      <button tag="button" @click='logout'>Logout</button>
    </span>
  </div>
</template>

<script>
import EventBus from '../event-bus';
import {authcall} from '../../api/apiCall'

export default {

  name: 'navbar',
  data () {
    return {
      title: 'FileManage',
      logedin: false
    }
  },  
  mounted () {
  EventBus.$on('checkLogedin',  (logedinValue)=>{
    this.logedin= logedinValue;
  })
  this.logedin=this.$cookies.get('checkLogedin')
  },
  methods : {
    logout(){
      console.log("logout");
      authcall.interceptors.request.use(
          config => {
            config.headers['x-auth-token'] = '';
            return config
          }
        )
        this.$cookies.set("x-auth-token", '')
        //to maintain state when  refreshed
        this.$cookies.set("checkLogedin", 'false')
        //to maintain state when not refreshed
        EventBus.$emit('checkLogedin', "false");
        this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .nav{
    display: inline-block;
    background-color: rgb(145, 34, 155);
    color:white;
    width:100%;
  }
  .title{
    display: inline;
    /* width:50%; */
  }
  .btns{
    float: right;
    margin:10px;
    /* display: inline-block; */
  }
</style>
