enum ResultCodeEnum {
    SUCCESS = 20000, // 操作成功

    FAIL = 40000, // 操作失败

    AUTHENTICATION_FAIL = 40001, // 身份验证失败
    NO_AUTH = 40002, // 暂无权限
    LOGIN_FAIL = 40003, // 登录失败
    LOGIN_EXPIRED = 40004, // 登录过期

    VERIFY_ERROR = 40100, // 验证码错误

    ERROR = 50000, // 系统内部错误
    CERTIFICATE_FAIL = 50100, // 凭证获取失败
}

export default ResultCodeEnum;