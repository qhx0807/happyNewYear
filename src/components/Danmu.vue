<template>
  <div>
    <Table size="small" :loading="loading" :columns="columns1" :data="tableData"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="data1.length" :current="1" @on-change="changePage"></Page>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'danmu',
  data() {
    return {
      loading:true,
      columns1: [
        {
          title: '头像',
          key: 'headimgurl',
          width: 60,
          render (h, params) {
            if(params.row.headimgurl){
              return h('img', {
                domProps: {
                  src: params.row.headimgurl,
                  className: 'head-img'
                }
              })
            }else{
              return ''
            }
          }
        },
        {
          title: '昵称',
          key: 'nickname',
          width: 160,
        },
        {
          title: '内容',
          key: 'content',
          render(h, params){
            return decodeURIComponent(params.row.content)
          }
        },
        {
          title: '时间',
          key: 'createtime',
          width: 180,
          render(h, params){
            if(params.row.createtime){
              return new Date(params.row.createtime*1000).toLocaleString()
            }else{
              return ''
            }

          }
        },
        {
          title: 'openid',
          key: 'openid',
          width: 250,
        },
        {
          title: 'sex',
          key: 'sex',
          width: 100,
        }
      ],
      data1: [],
      offset: 0,
    }
  },
  created () {
    this.loadData()
  },
  computed: {
    tableData(){
      return this.data1.slice(this.offset, this.offset+10)
    }
  },
  methods: {
    loadData(){
      axios({
        url: APIURL+'talks',
        method: 'GET',
      }).then((response)=>{
        if(response.data.status === 'OK'){
          console.log(response)
          this.data1 = response.data.data
          this.loading = false
        }else{
          this.$Message.warning(response.data.msg)
          this.loading = false
        }
      }).catch((error)=>{

      })
    },
    changePage(e){
      this.offset = (e-1)*10
    }
  }
}
</script>

<style lang="less">
.head-img{
  height: 36px;
  width: 36px;
  border-radius: 50%;
}
</style>

