import type { SelectOption, SelectGroupOption } from "naive-ui"

export enum ArticleStatusEnum {
    "未发布",
    "已发布"
}

enum ArticleStatusTypeEnum {
    "error",
    "success"
}

export const articleStatusList = () => {
    const list: Array<SelectOption | SelectGroupOption> = []
    for (const item in ArticleStatusEnum) {
        if (!isNaN(Number(item))) continue
        list.push({
            label: item,
            value: ArticleStatusEnum[item]
        })
    }
    return list
}

export const getType = (val: number) => {
    return ArticleStatusTypeEnum[val] as "default" | "error" | "primary" | "info" | "success" | "warning"
}
