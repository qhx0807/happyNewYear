<template>
    <label class="mo-upload">
        <input type="file" :accept="accepts" @change="upload">
        <slot></slot>
    </label>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HiUpload',
  props: {
    accepts: {
      type: String,
      default: 'image/jpeg,image/jpg,image/png,image/gif'
    },
    flag: [String, Number],
    maxSize: {
      type: Number,
      default: 0
    }
  },
  methods: {
    upload(event) {
      let file = event.target.files[0]
      console.log(file)
      const self = this
      const flag = this.flag
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        axios.get(API_URL + '/qiniuToken').then(function(response) {
          console.log(response)
          formData.append('token', response.data.Data)
          formData.append('key', file.name)
          var token = response.data.Data
          self.$emit('beforeUpload',flag)
            axios({
              url:'http://upload-z2.qiniup.com',
              method:'POST',
              headers:{
                'Content-Type':'multipart/form-data',
                Authorization: `UpToken ${token}`
              },
              data:formData,
              onUploadProgress:function(progressEvent){
                self.$emit('progress', parseFloat(progressEvent.loaded / progressEvent.total * 100),flag)
              },
            }).then(function(qiniu){
              let result = qiniu.data
              if (result.hash && result.key) {
                self.$emit('complete', 200 , result, flag)
                event.target.value = null
              } else {
                self.$emit('complete', 500, result, flag)
              }
            }).catch(function(err){
              console.log(err)
            })

          }.bind(this)).catch(
          function(error) {
            console.log(error)
          }.bind(this))
      }
    },
    serverQN() {}
  }
}
</script>
<style lang="less">
.mo-upload {
  display: inline-block;
  position: relative;
  margin-bottom: 0;
  input[type='file'] {
    display: none;
  }
}
</style>
