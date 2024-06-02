/* eslint-disable no-unused-vars */
// 登录表单
interface LoginForm {
  username: string,
  password: string,
  verify: string | undefined
}

// popupMenu组件数据类型
interface popupMenu {
  label: string,
  icon?: Component,
  callback: Function | null,
  disable: Boolean
}
