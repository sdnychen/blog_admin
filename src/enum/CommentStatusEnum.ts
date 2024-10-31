import type { SelectOption, SelectGroupOption } from "naive-ui"

export enum CommentStatusEnum {
    "未审核",
    "通过",
    "不通过"
}

enum CommentStatusTypeEnum {
    "primary",
    "success",
    "error",
}

export const articleStatusList = () => {
    const list: Array<SelectOption | SelectGroupOption> = []
    for (const item in CommentStatusEnum) {
        if (!isNaN(Number(item))) continue
        list.push({
            label: item,
            value: CommentStatusEnum[item]
        })
    }
    return list
}

export const getType = (val: number) => {
    return CommentStatusTypeEnum[val] as "default" | "error" | "primary" | "info" | "success" | "warning"
}
