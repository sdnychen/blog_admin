export enum ArticleStatusEnum {
    "未发布",
    "已发布"
}

enum ArticleStatusTypeEnum {
    "error",
    "success"
}

export const getType = (val: number) => {
    return ArticleStatusTypeEnum[val] as "default" | "error" | "primary" | "info" | "success" | "warning"
}
