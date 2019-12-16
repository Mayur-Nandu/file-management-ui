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
  mounted () {
    EventBus.$on('checkLogedin',  (logedinValue)=>{
      console.log(logedinValue);
      this.logedin= logedinValue;
    })
  },
  data () {
    return {
      title: 'FileManage',
      logedin: "false"
    }
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
