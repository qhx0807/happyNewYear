<template>
    <div class="wrap">
        <Card class="login":bordered="false">
            <div class="login-title">welcome</div>
            <Form ref="fromlogin" :model="fromlogin" :rules="ruleLogin">
                <FormItem prop="account">
                    <Input type="text" v-model="fromlogin.account" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password"  style="margin-bottom:26px">
                    <Input @on-keyup="onPressEnter" type="password"  v-model="fromlogin.password" placeholder="Password">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom:6px;padding-left:2px">
                     <Checkbox v-model="remerberMe">记住我</Checkbox>
                </FormItem>
                <FormItem>
                    <Button type="primary" :loading="submitLoading" @click="handleSubmit('fromlogin')" long>登录</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      fromlogin: {
        account: '',
        password: ''
      },
      remerberMe: true,
      submitLoading: false,
      ruleLogin: {
        account: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 4, message: '密码长度不能小于4位', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.submitLoading = true
          axios({
            url: APIURL+'auth',
            method: 'POST',
            data: {
              name: this.fromlogin.account,
              password: this.fromlogin.password
            }
          }).then((response) => {
            this.submitLoading = false
            if (response.data.status==='OK') {
              this.$router.replace({name: 'Show'})
            } else {
              this.$Message.warning(response.data.msg)
            }
          }).catch(() => {
            this.submitLoading = false
          })
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    onPressEnter (e) {
      if (e.keyCode === 13) {
        this.handleSubmit('fromlogin')
      }
    },
  }
}
</script>

<style lang="less" scoped>
.wrap {
  background: url('../assets/loginbg.png')  no-repeat;
  background-size: cover;
  background-color: rgb(184, 229, 248);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    width: 350px;
    height: 360px;
    padding: 20px;
    .login-title {
      text-transform: uppercase;
      text-align: center;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      margin-bottom: 24px;
      vertical-align: text-bottom;
      font-size: 16px;
      text-transform: uppercase;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>
