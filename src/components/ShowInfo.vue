<template>
  <div class="info">
    <div class="img-wrap">
      <div class="img-item"  v-for="(pic, index) in infoData.pics" :key="index" @mouseover="onMouseOver(index)" @mouseout="onMouseOut(index)">
        <img :src="pic" alt="">
        <transition name="fade">
          <div v-show="index==activeImg" class="img-mask">
            <Icon type="ios-eye-outline" @click.native="seeImg(pic)" size="22"></Icon>
            <Icon type="ios-trash-outline" @click.native="delImg(pic)" style="margin-left:10px" size="22"></Icon>
          </div>
        </transition>
      </div>
      <div class="img-item add" @click="onClickUp"><Icon type="ios-plus-empty" size="38"></Icon></div>
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <Row >
        <Col span="24">
          <FormItem label="节目名称" prop="title">
            <Input v-model="formValidate.title"></Input>
          </FormItem>
          <FormItem label="时间" prop="time">
            <Input v-model="formValidate.time"></Input>
          </FormItem>
          <FormItem label="表演者" prop="player">
            <Input v-model="formValidate.player"></Input>
          </FormItem>
          <FormItem label="详细信息" prop="describle">
            <Input type="textarea" :autosize="{minRows: 5,maxRows: 20}" v-model="formValidate.describle"></Input>
          </FormItem>
          <FormItem label="投票" prop="vote">
            <InputNumber style="width:100%" :max="999999" :min="0" v-model="formValidate.vote"></InputNumber>
          </FormItem>
          <FormItem>
            <Button type="primary" :loading="submitLoading" @click="handleSubmit('formValidate')">保存</Button>
            <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button> -->
        </FormItem>
        </Col>
      </Row>
    </Form>
  <Modal v-model="uploadModal" width="460">
      <p slot="header" style="text-align:center">上传图片</p>
      <div>
        <hi-upload @complete="uploadComplete" @beforeUpload="onUploadBefore" @progress="uploadProgress">
          <a type="primary">选择图片</a>
        </hi-upload>
        <Progress :percent="progress" status="active"></Progress>
      </div>
      <div slot="footer">

      </div>
  </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import HiUpload from './common/upload.vue'
export default {
  name: 'showinfo',
  data() {
    return {
      infoData: {},
      uploadModal:false,
      activeImg: -1,
      formValidate: {
        title: '',
        time: '',
        describle: '',
        player: '',
        sort: 0,
        vote: 0,
        _id: '',
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: '节目名称不能为空',
            trigger: 'blur'
          }
        ],
        describle: [
          {
            required: true,
            message: '节目信息不能为空',
            trigger: 'blur'
          }
        ]
      },
      submitLoading:false,
      modal_loading:false,
      progress: 0,
    }
  },
  components: {
    HiUpload
  },
  created () {
    this.loadInfo()
  },
  methods: {
    loadInfo(){
      axios({
        url: APIURL+'programsDetails?id='+this.$route.params.id,
        method: 'GET'
      }).then((response)=>{
        if(response.data.status === 'OK'){
          // console.log(response)
          this.infoData = response.data.data[0]
          this.formValidate.title = response.data.data[0].title
          this.formValidate.time = response.data.data[0].time
          this.formValidate.describle = response.data.data[0].describle
          this.formValidate.player = response.data.data[0].player
          this.formValidate.vote = response.data.data[0].vote
          this.formValidate.sort = response.data.data[0].sort
          this.formValidate._id = response.data.data[0]._id
        }else{
          this.$Message.warning(response.data.msg)
        }
      }).catch((error)=>{

      })
    },
    onMouseOver(index){
      this.activeImg = index
    },
    onMouseOut(index){
      this.activeImg = -1
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.submitLoading = true
          axios({
            url: APIURL+'programs',
            method: 'PUT',
            data: this.formValidate
          }).then((response)=>{
            this.submitLoading = false
            if(response.data.status === 'OK'){
              // console.log(response)
              this.$Message.success("保存成功")
              this.loadInfo()
            }else{
              this.$Message.warning(response.data.msg)
            }
          }).catch((error)=>{
            this.submitLoading = false
          })
        } else {
          this.$Message.error('表单验证失败')
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    },
    seeImg(pic){
      this.$Modal.info({
          title: '查看图片',
          width: '550',
          content: `<img style="width:450px;height:450px;" src=${pic}>`
      })
    },
    delImg(pic){
      this.$Modal.confirm({
          title: '提示',
          content: '删除此图片？',
          onOk: () => {
            axios({
              url: APIURL+'delimg',
              method: 'POST',
              data: {
                id: this.infoData._id,
                url: pic
              }
            }).then((response)=>{
              if(response.data.status === 'OK'){
                // console.log(response)
                this.$Message.success("删除成功")
                this.loadInfo()
              }else{
                this.$Message.warning(response.data.msg)
              }
            }).catch((error)=>{

            })
          }
      })

    },
    onClickUp(){
      this.uploadModal = true
      this.progress = 0
    },
    uploadComplete(state, result, flag){
      this.$Loading.finish()
      if(state==200){
        console.log(result)
        let url = 'http://os70o8m36.bkt.clouddn.com/'+result.key
        this.addImg(url)
      }else{
        this.$Loading.error()
        this.$Message.info(state)
      }
    },
    onUploadBefore(flag){
      this.$Loading.start()
      this.progress = 0
    },
    uploadProgress(progress){
      console.log(progress)
      this.progress = progress
    },
    addImg(url){
      axios({
        url: APIURL+'addimg',
        method: 'POST',
        data:{
          id: this.infoData._id,
          url: url
        }
      }).then((response)=>{
        if(response.data.status === "OK"){
          this.$Message.success('添加图片成功')
          this.loadInfo()
          this.uploadModal = false
        }else{
          this.$Message.warning(response.data.msg)
        }
      }).catch((error)=>{

      })
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  padding-top: 0px;
  .img-wrap{
    padding: 15px 12px;
    &:after{
      content: "";
      display: block;
      clear: both;
    }
    .img-item{
      width:110px;
      height: 110px;
      float: left;
      position: relative;
      margin-left: 10px;
      img{
        height: 100%;
        width: 100%;
      }
      &.add{
        border: 1px dashed rgb(0, 119, 230);
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(0, 119, 230);
        cursor: pointer;
      }
    }
    .img-mask{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .7);
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      i{
        cursor: pointer;
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
