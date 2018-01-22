<template>
  <div class="show">
    <Spin v-if="loadingShow" fix></Spin>
    <Row>
      <Col style="padding:10px" span="6" v-for="(item, index) in showsData" :key="item._id">
        <Card :bordered="false" @click.native="onClickShow(item._id)">
          <p slot="title">
            {{index+1}}、{{item.title}}
            <Icon type="close" style="float:right;cursor: pointer;" @click.native.stop="onClickDel(item._id)"></Icon>
          </p>
          <div class="desc">
            <p>{{item.describle}}</p>
          </div>
          <p class="show-time">{{item.time}} / {{item.player}}</p>
          <img v-if="item.pics.length>0" class="show-img" :src="item.pics[0]" alt="">
        </Card>
      </Col>
      <Col span="2" style="padding:10px">
        <div class="add-wrap" @click="onClickAdd"><Icon type="ios-plus-empty" size="38"></Icon></div>
      </Col>
    </Row>
    <Modal v-model="addModal" width="660">
      <p slot="header" style="text-align:center">新增节目</p>
      <div>
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
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'show',
  data () {
    return {
      showsData: [],
      addModal:false,
      loadingShow: true,
      formValidate: {
        title: '',
        time: '',
        describle: '',
        player: '',
        sort: 0,
        vote: 0,
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
      submitLoading: false,
    }
  },
  created () {
    this.loadShow()
  },
  methods:{
    loadShow () {
      axios({
        url: APIURL+'programs',
        method: 'GET'
      }).then((response) => {
        this.loadingShow = false
        if(response.data.status==='OK'){
          // console.log(response)
          this.showsData = response.data.data
        }else{
          this.$Message.warning(response.data.msg)
        }
      }).catch(() => {
        this.loadingShow = false
      })
    },
    onClickShow (id) {
      this.$router.push({name:'ShowInfo', params:{id: id}})
    },
    onClickAdd(){
      this.addModal = true
      this.handleReset('formValidate')
    },
    handleSubmit(name) {
      // console.log(this.formValidate)
      this.$refs[name].validate(valid => {
        if (valid) {
          this.submitLoading = true
          axios({
            url: APIURL+'programs',
            method: 'POST',
            data: this.formValidate
          }).then((response)=>{
            this.submitLoading = false
            if(response.data.status === 'OK'){
              this.$Message.success("保存成功")
              this.addModal = false
              this.loadShow()
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
    onClickDel(id){
      this.$Modal.confirm({
        title: '提示',
        content: '删除此节目？',
        onOk: () => {
          axios({
            url: APIURL+'programs?id='+id,
            method: 'delete',
          }).then((response)=>{
            if(response.data.status === 'OK'){
              this.$Message.success("删除成功")
              this.loadShow()
            }else{
              this.$Message.warning(response.data.msg)
            }
          }).catch((error)=>{

          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.show{
  position: relative;
  .desc{
    height: 100px;
    overflow: hidden;
  }
  .show-img{
    margin-top: 12px;
    width: auto;
    height: 140px;
  }
  .show-time{
    text-align: right;
    font-style: italic;
    font-size: 13px;
    margin-top: 7px;
  }
  .add-wrap{
    height: 110px;
    width: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    // color: rgb(0, 119, 230);
    cursor: pointer;
    background-color: #fff;
    &:hove{
      box-shadow: 0 2px 0px 2px rgba(0, 0, 0, .7);
    }
  }
}
</style>

