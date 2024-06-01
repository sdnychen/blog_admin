<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import type { FormValidationError } from "naive-ui"
import { Reload } from "@vicons/ionicons5"
import userApi from "@/api/apis/userApi"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/user"

const router = useRouter()
const userStore = useUserStore()

// 验证码图片
const verifyImg = ref("")
// 验证码加载状态
const loadingVerify = ref(false)

// 获取验证码
const getVerify = async() => {
  loadingVerify.value = true
  const res = await userApi.getVerifyImg()
  loadingVerify.value = false
  if (res.success) {
    verifyImg.value = res.data
  }
}

const loginForm: LoginForm = reactive({
  username: "",
  password: "",
  verify: ""
})
const rules = reactive({
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
  verify: { required: true, message: "请输入验证码", trigger: "blur" }
})

// 记住密码
const remember = ref(false)

// 登录
const loginFormRef = ref()
const handleLogin = () => {
  loginFormRef.value.validate(async(res: Array<FormValidationError>) => {
    if (!res) {
      const res = await userStore.login(loginForm)
      if (res) {
        if (remember.value) {
          loginForm.verify = void 0
          localStorage.setItem("login_user", JSON.stringify(loginForm))
        } else {
          localStorage.removeItem("login_user")
        }
        setTimeout(() => {
          router.push({name: "Main"})
        }, 300)
      }
      loginForm.verify = ""
      getVerify()
    }
  })
}

onMounted(() => {
  getVerify()
  const user = JSON.parse(localStorage.getItem("login_user") as string)
  if (user) {
    remember.value = true
    loginForm.username = user.username
    loginForm.password = user.password
  }
})

</script>

<template>
  <div class="login-page">
    <div class="login-left" />
    <div class="login-right">
      <div class="login-form-box">
        <div class="title">登录</div>
        <n-form
          ref="loginFormRef"
          :label-width="80"
          :model="loginForm"
          :rules="rules"
        >
          <n-form-item label="用户名" path="username">
            <n-input v-model:value="loginForm.username" placeholder="请输入用户名"
              :input-props="{ autocomplete: 'username' }"/>
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input v-model:value="loginForm.password" type="password" show-password-on="mousedown" placeholder="请输入密码"
              :input-props="{ autocomplete: 'current-password' }"/>
          </n-form-item>
          <n-form-item label="验证码" path="verify">
            <n-input v-model:value="loginForm.verify" placeholder="请输入验证码" />
            <div v-if="loadingVerify" class="verify-box" style="background-color: #FFF;">
              <n-spin size="small" />
            </div>
            <div v-else-if="verifyImg" class="verify-box">
              <img class="verify-img" :src="`data:image/png;base64,${verifyImg}`" alt="验证码图片" @click="getVerify">
            </div>
            <div v-else class="verify-box" @click="getVerify">
              <span>加载失败</span>
              <n-icon :component="Reload" />
            </div>
          </n-form-item>
        </n-form>
        <div class="remember-password">
          <n-checkbox v-model:checked="remember">
            记住密码
          </n-checkbox>
        </div>
        <div class="login-btn" @click="handleLogin">登录</div>
        <div class="back-register">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scope>
.login-page {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url(@/assets/temp/boat-8614314_1280.jpg);
  background-size: cover;
  background-position: center;
}
.login-left {
  flex: 1;
}
.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-form-box {
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
  .verify-box {
    min-width: 100px;
    height: 34px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    background-color: #b9b9b9;
    color: #FFF;
    border-radius: 2px;
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
