import OSS from 'ali-oss'
import baseApi from '@/api/apis/baseApi'
import { sha256 } from 'js-sha256'
import type { SettledFileInfo } from 'naive-ui/es/upload/src/interface'

const createOssClient = async () => {
    const { data } = await baseApi.sts()
    return new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: 'oss-cn-hangzhou',
        // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
        accessKeyId: data.accessKeyId,
        accessKeySecret: data.accessKeySecret,
        // 从STS服务获取的安全令牌（SecurityToken）。
        stsToken: data.securityToken,
        refreshSTSToken: async () => {
            // 向您搭建的STS服务获取临时访问凭证。
            const { data } = await baseApi.sts()
            return {
                accessKeyId: data.accessKeyId,
                accessKeySecret: data.accessKeySecret,
                stsToken: data.securityToken
            }
        },
        // 刷新临时访问凭证的时间间隔，单位为毫秒。
        refreshSTSTokenInterval: import.meta.env.VITE_REFRESH_TOKEN_STS * 1000,
        // 填写Bucket名称。
        bucket: import.meta.env.VITE_OSS_BUCKET
    })
}

/**
 * 头像上传
 * @param file naive上传组件返回的file对象
 * @returns oss返回结果
 */
export const avatarUpload = async (file: SettledFileInfo) => {
    const oss = await createOssClient()
    const fileName = `avatar/${sha256(JSON.stringify(file)).slice(0, 5)}_${new Date().getTime()}.${file.name.split('.').pop()}`
    return oss.put(fileName, file.file)
}

/**
 * 图片上传
 * @param file naive上传组件返回的file对象
 * @returns oss返回结果
 */
export const sysFileUpload = async (file: SettledFileInfo) => {
    const oss = await createOssClient()
    const fileName = `sys/${sha256(JSON.stringify(file)).slice(0, 5)}_${new Date().getTime()}.${file.name.split('.').pop()}`
    return oss.put(fileName, file.file)
}

/**
 * 文章文件上传
 * @param file naive上传组件返回的file对象
 * @returns oss返回结果
 */
export const articleFileUpload = async (file: SettledFileInfo) => {
    const oss = await createOssClient()
    const fileName = `article/${sha256(JSON.stringify(file)).slice(0, 5)}_${new Date().getTime()}.${file.name.split('.').pop()}`
    return oss.put(fileName, file.file)
}
