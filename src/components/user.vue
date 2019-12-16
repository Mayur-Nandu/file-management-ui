<template>
  <div >
    <div class="center">
    <h1 >{{ msg }}</h1>
      <input type="file" id="photo" name="photo" placeholder="Please Upload your File" @change="processFile($event)"><br><br>
      <button @click="submit">Submit to db</button>
      <button @click="getFiles">Get Files From db</button>
      <br><br>
      <button @click="uploadS3">Upload TO  S3</button>
      <button @click="getS3Files" >Get S3 Files</button>
    </div>
    <div class="center" >
      <p>Files form DB</p>
      <ul>          
        <li v-for="image in DbFiles" v-bind:key='image'>
          <img :src='image' alt="">
        </li>
      </ul>
      <hr>
      <p>Files form S3</p>
      <ul>
        <li v-for="file in S3files" v-bind:key='file'>
          <img :src='file' alt="">
        </li>
      </ul>
    </div>
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
      },
      S3files : [],
      DbFiles :[]
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
      this.DbFiles=[];
      let baseURL='http://127.0.0.1:3000/getfile/';
      UserFiles.data.files.map(file => {
        console.log(baseURL +file._id)
        this.DbFiles.push(baseURL+file._id)
      })

      console.log(UserFiles);
    },    
    async getS3Files () {
      const UserFiles = await services.getS3Files();
      this.S3files=[];
      UserFiles.data.map(url =>{
        this.S3files.push(url)
      })
      
    },
    async uploadS3 () {
      const obj = this.uploadObj
      try{
        const uploadData= new FormData()
        uploadData.append('file', obj.file)   
        const response = await services.uploadS3(uploadData);
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
      text-align: center;
}
ul {
  list-style-type: none;
}
li {
    display: inline;
    padding: 10px
}
button { 
  /* padding: 20px; */
  margin : 5px;
}
</style>

