<template>
  <div class="center">
    <h1 >{{ msg }}</h1>
      <input type="file" id="photo" name="photo" placeholder="Please Upload your File" @change="processFile($event)"><br><br>
      <input type="submit" value="submit"  @click="submit">
      <br>
      <br>
      <button @click="getFiles">Get Files</button>
  </div>
</template>

<script>
import services from '../router/service'
import EventBus from '../event-bus';

export default {
  name: 'login',
  data () {
    return {
      msg: 'Please Select a File To Upload',
      uploadObj: {
        file:{}
      }
    }
  },
  methods: {
    processFile($event){
      this.uploadObj.file = event.target.files[0];
      //console.log(this.uploadObj.file);
    },
    async submit () {
      const obj = this.uploadObj
      try{
        //console.log(obj);
        const formData = new FormData()
        formData.append('photo', obj.file)   
        const response = await services.upload(formData);
        //console.log(response);
        // this.$router.push('/user')
      }
      catch(err) {
        if(err){
          console.log(err);
        }
      }
    },
    async getFiles () {
      const UserFiles = await services.getFiles();
      
      console.log(UserFiles);
    }
  }
}
</script>

<style scoped>
    .center{
      margin :auto;
      padding:auto;
      text-align: center;
}
</style>

