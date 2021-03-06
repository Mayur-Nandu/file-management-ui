import {authcall} from '../../api/apiCall'

export default{
  getFiles () {
    return authcall.get('http://127.0.0.1:3000/getFiles')
  },
  getS3Files () {
    return authcall.get('http://127.0.0.1:3000/getS3Files')
  },
  login (data) {
    return authcall.post('http://127.0.0.1:3000/users/login', data)
  },
  signup (data) {
    return authcall.post('http://127.0.0.1:3000/users/signup', data)
  },
  upload(data){
    console.log(data)
    return authcall.post('http://127.0.0.1:3000/upload', data)
  },
  logout () {
    return authcall.post('http://127.0.0.1:3000/users/logout')
  },
  uploadS3(data)
  {
    return  authcall.post('http://127.0.0.1:3000/uploadS3', data)
  }
}
