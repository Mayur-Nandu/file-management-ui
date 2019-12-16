<template>
  <div class="center">
    <h1 >{{ msg }}</h1>
      <input type="text" id="name" name="name" placeholder="Please Enter your Name" v-model='loginobj.name'><br><br>
      <input type="email" id="email" name="email" placeholder="Please Enter your Email" v-model='loginobj.email'> <br><br>
      <input type = "password" id="password" name="password" placeholder="Please Enter your Password" v-model='loginobj.password'><br><br>
      <input type="submit" value="submit" @click="login">
  </div>
</template>

<script>
import services from '../router/service'
import {authcall} from '../../api/apiCall'
import EventBus from '../event-bus';

export default {
  name: 'login',
  data () {
    return {
      msg: 'Please Login',
      loginobj: {
        name:null,
        email:null,
        password:null
      }
    }
  },
  methods: {
     async login () {
      const obj = this.loginobj
      try{
        console.log(obj);
        const response = await services.login(this.loginobj);
        // console.log(response);

        // using cokies to store the headers
         this.$cookies.set("x-auth-token", response.headers['x-auth-token'])
          authcall.interceptors.request.use(
            config => {
              config.headers['x-auth-token'] = response.headers['x-auth-token'];
              return config
          }
        )
        //to maintain state when not refreshed
        EventBus.$emit('checkLogedin', "true");
        //to maintain state when refreshed
        this.$cookies.set("checkLogedin", 'true')
        this.$router.push('/user')
      }
      catch(err) {
        if(err){
          console.log(err);
        }
      }
    }
  }
}
</script>

<style scoped>
    .center{
      margin :auto;
      padding:auto;
      text-align: center
    }
</style>

