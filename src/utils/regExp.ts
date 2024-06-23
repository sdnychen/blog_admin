/**
 * 手机号
 */
export const mobileRegExp = () => new RegExp(/^1[3456789]\d{9}$/, "g")

/**
 * 邮箱
 */
export const emailRegExp = () => new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, "g")
