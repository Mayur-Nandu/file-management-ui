<template>
  <div class="nav"> 
    <h1 class="title">{{ title }} </h1>
    <span class="btns" v-if="logedin === 'false'"> 
      <!-- <button src="/login">Login</button> -->
      <router-link to="/Login" tag="button">Login</router-link>
      <router-link to="/Signup" tag="button">Signup</router-link>
    </span>
     <span class="btns" v-if="logedin === 'true'"> 
      <router-link to="/login" tag="button">Logout</router-link>
    </span>
  </div>
</template>

<script>
import EventBus from '../event-bus';

export default {
  name: 'navbar',
  mounted () {
    // this.logedin = localStorage.getItem('logedinValue') ;
    // console.log(localStorage.getItem('logedinValue'))
    // console.log(typeof(this.logedin))
    EventBus.$on('checkLogedin',  (logedinValue)=>{
      console.log(logedinValue);
      this.logedin= logedinValue;
    })
  },

  // watch : {
  //   logedin : (newValue, oldValue) => {
  //    this.logedin=localStorage.getItem('logedinValue');
  //   }
  // },
  data () {
    return {
      title: 'FileManage',
      logedin: "false"
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
