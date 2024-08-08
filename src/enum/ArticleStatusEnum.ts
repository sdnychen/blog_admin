export enum ArticleStatusEnum {
    "未发布" = 1,
    "已发布" = 2
}

enum ArticleStatusTypeEnum {
    "error" = 1,
    "success" = 2
}

export const getType = (val: number) => {
    return ArticleStatusTypeEnum[val] as "default" | "error" | "primary" | "info" | "success" | "warning"
}
