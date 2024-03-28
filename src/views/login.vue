<script lang="ts" setup>
import { ref, reactive } from "vue"
import type { FormValidationError } from "naive-ui"
// import { ArrowBackCircle } from "@vicons/ionicons5"
import userApi from "@/api/apis/userApi"

// 登录表单
interface LoginForm {
  account: string,
  password: string,
  verification: string
}
const loginForm: LoginForm = reactive({
  account: "",
  password: "",
  verification: ""
})
const rules = reactive({
  account: { required: true, message: "请输入用户名/邮箱", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
  verification: { required: true, message: "请输入验证码", trigger: "blur" }
})

// 页面跳转
// const toPage = (type: string) => {
//   console.log(type)
// }

// 记住密码
const rememberPassword = ref(false)

// 登录
const loginFormRef = ref()
const handleLogin = () => {
  loginFormRef.value?.validate((res: Array<FormValidationError>) => {
    if (!res) {
      userApi.login(loginForm).then(res => {
        console.log(res)
      })
      console.log("11111")
    }
  })
}

</script>

<template>
  <div class="page">
    <div class="left" />
    <div class="right">
      <ClientOnly>
        <div class="form-box">
          <div class="title">登录</div>
          <n-form
            ref="loginFormRef"
            :label-width="80"
            :model="loginForm"
            :rules="rules"
          >
            <n-form-item label="用户名/邮箱" path="account">
              <n-input v-model:value="loginForm.account" placeholder="请输入用户名/邮箱" />
            </n-form-item>
            <n-form-item label="密码" path="password">
              <n-input v-model:value="loginForm.password" type="password" show-password-on="mousedown" placeholder="请输入密码" />
            </n-form-item>
            <n-form-item label="验证码" path="verification">
              <n-input v-model:value="loginForm.verification" placeholder="请输入验证码" />
              <img class="verification-img" src="@/assets/temp/boat-8614314_1280.jpg" alt="">
              <span class="replace">换一张</span>
            </n-form-item>
          </n-form>
          <div class="remember-password">
            <n-checkbox v-model:checked="rememberPassword">
              记住密码
            </n-checkbox>
            <!-- <div @click="toPage("forgetPassword")">忘记密码？</div> -->
          </div>
          <div class="login-btn" @click="handleLogin">登录</div>
          <div class="back-register">
            <!-- <div @click="navigateTo()">
              <n-icon :component="ArrowBackCircle" />
              返回首页
            </div>
            <div @click="navigateTo()">还没账号？去注册一个</div> -->
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="scss" scope>
.page {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url(@/assets/temp/boat-8614314_1280.jpg);
  background-size: cover;
  background-position: center;
}
.left {
  flex: 1;
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-box {
  width: 400px;
  padding: 20px 30px;
  border-radius: 16px;
  background-color: #FFF;
  .title {
    font-size: 2.8rem;
    letter-spacing: .6rem;
    margin-bottom: 20px;
    text-align: center;
  }
  .verification-img {
    width: 140px;
    height: 34px;
    margin: 0 10px;
  }
  .replace {
    cursor: pointer;
    font-size: 1.4rem;
    width: 100px;
  }
  .remember-password {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.4rem;
    margin-bottom: 20px;
    & > div {
      cursor: pointer;
    }
  }
  .login-btn {
    font-size: 2.4rem;
    letter-spacing: 8px;
    text-align: center;
    border-radius: 4px;
    color: #FFF;
    padding: 6px 0;
    cursor: pointer;
    background-color: getColor(main-color);
    &:hover {
      filter: saturate(1.4);
    }
  }
  .back-register {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1.4rem;
    & > div {
      display: flex;
      gap: 4px;
      cursor: pointer;
    }
    .n-icon {
      font-size: 2rem;
    }
  }
}
</style>
