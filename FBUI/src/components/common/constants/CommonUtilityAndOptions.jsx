import { COMMON_STATUS } from "@/components/client/EdgeConstant";

export const actions = {
    VIEW: 'view',
    DELETE: 'delete',
    PUBLISH: 'publish',
    UNPUBLISH: 'unpublish',
    ARCHIVE: 'archive',
    UNARCHIVE: 'unarchive',
}

export const articleOptions = [
    { label: "Archive", value: actions.ARCHIVE },
    { label: "Delete", value: actions.DELETE },
];

export const articleUarchiveOptions = [
    { label: "Unarchive", value: actions.UNARCHIVE },
    { label: "Delete", value: actions.DELETE },
];

export const articleOptionUnPublish = [
    { label: "Unpublish", value: actions.UNPUBLISH }
]

export const getArticleOptions = (flag) => {

    if (flag == COMMON_STATUS.PUBLISHED) {
        return [...articleOptionUnPublish, ...articleOptions]
    } else if (flag == COMMON_STATUS.ARCHIVED) {
        return articleUarchiveOptions
    }
    return articleOptions
}

export const dot = {
    SUCCESS: 'green',
    INFO: 'blue',
    WARNING: 'orange',
    ERROR: 'red'
}

export const getSearchTriggerFlag = (searchQuery) => {
    return searchQuery && (searchQuery.length >= 3 || searchQuery.toLowerCase() === 'ai')
}