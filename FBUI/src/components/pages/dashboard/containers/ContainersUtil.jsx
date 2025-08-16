import { DAILY, MONTHLY, WEEKLY } from "@/components/common/constants/CommonConstant";
import { clone } from "@/components/common/util/JsonUtil";
import { CONTAINERS_BLOG_BASE, CONTAINERS_KEY } from "./ContainersConstant";
import { getStringToDate } from "@/components/common/util/DateUtil";
import { isEmptyString, isNullOrUndefined } from "@/components/common/util/StringUtil";
import { aiModelOption } from "../DashboardConstant";

export const getDateTimeLabel = (value) => {
    if (value == DAILY) {
        return 'Time'
    } else if (value == WEEKLY) {
        return 'Weekday & Time'
    } else if (value == MONTHLY) {
        return 'Day & Time'
    }
    return 'Date & Time'
};


export const getBlogContainerFromresponse = (response) => {

    let container = clone(CONTAINERS_BLOG_BASE)
    container[CONTAINERS_KEY.ID] = response?.[CONTAINERS_KEY.ID]
    container[CONTAINERS_KEY.DESCRIPTION] = response?.[CONTAINERS_KEY.DESCRIPTION]
    container[CONTAINERS_KEY.CONTENT_TYPE] = response?.[CONTAINERS_KEY.CONTENT_TYPE]
    container[CONTAINERS_KEY.TAGS] = response?.[CONTAINERS_KEY.TAGS]
    container[CONTAINERS_KEY.NAME] = response?.[CONTAINERS_KEY.NAME]
    container[CONTAINERS_KEY.STATUS] = response?.[CONTAINERS_KEY.STATUS]

    container[CONTAINERS_KEY.AI_MODEL_E] = response?.[CONTAINERS_KEY.CONTAINERS_CONFIG]?.[CONTAINERS_KEY.AI_MODEL_E]
    container[CONTAINERS_KEY.AI_MODEL_W] = response?.[CONTAINERS_KEY.CONTAINERS_CONFIG]?.[CONTAINERS_KEY.AI_MODEL_W]
    container[CONTAINERS_KEY.STRICTNESS] = response?.[CONTAINERS_KEY.CONTAINERS_CONFIG]?.[CONTAINERS_KEY.STRICTNESS]
    container[CONTAINERS_KEY.AI_ENGINE_E] = response?.[CONTAINERS_KEY.CONTAINERS_CONFIG]?.[CONTAINERS_KEY.AI_ENGINE_E]
    container[CONTAINERS_KEY.AI_ENGINE_W] = response?.[CONTAINERS_KEY.CONTAINERS_CONFIG]?.[CONTAINERS_KEY.AI_ENGINE_W]
    container[CONTAINERS_KEY.TONE_OF_VOICE] = response?.[CONTAINERS_KEY.CONTAINERS_CONFIG]?.[CONTAINERS_KEY.TONE_OF_VOICE]
    container[CONTAINERS_KEY.AI_WRITER_PROMPT] = response?.[CONTAINERS_KEY.CONTAINERS_CONFIG]?.[CONTAINERS_KEY.PROMPTS]?.[CONTAINERS_KEY.AI_WRITER_PROMPT]
    container[CONTAINERS_KEY.AI_EDITOR_PROMPT] = response?.[CONTAINERS_KEY.CONTAINERS_CONFIG]?.[CONTAINERS_KEY.PROMPTS]?.[CONTAINERS_KEY.AI_EDITOR_PROMPT]

    container[CONTAINERS_KEY.AI_WRITER_STRICTNESS] = response?.[CONTAINERS_KEY.CONTAINERS_CONFIG]?.[CONTAINERS_KEY.AI_WRITER_STRICTNESS]
    container[CONTAINERS_KEY.AI_EDITOR_STRICTNESS] = response?.[CONTAINERS_KEY.CONTAINERS_CONFIG]?.[CONTAINERS_KEY.AI_EDITOR_STRICTNESS]

    container[CONTAINERS_KEY.HOUR] = Number(response?.[CONTAINERS_KEY.CONTAINERS_PUBLISH_CONFIGS]?.[CONTAINERS_KEY.HOUR] ?? 0)
    container[CONTAINERS_KEY.MINUTE] = Number(response?.[CONTAINERS_KEY.CONTAINERS_PUBLISH_CONFIGS]?.[CONTAINERS_KEY.MINUTE] ?? 0)
    container[CONTAINERS_KEY.DAY_OF_WEEK] = Number(response?.[CONTAINERS_KEY.CONTAINERS_PUBLISH_CONFIGS]?.[CONTAINERS_KEY.DAY_OF_WEEK] ?? 1)
    container[CONTAINERS_KEY.DAY_OF_MONTH] = Number(response?.[CONTAINERS_KEY.CONTAINERS_PUBLISH_CONFIGS]?.[CONTAINERS_KEY.DAY_OF_MONTH] ?? 1)

    let dateString = response?.[CONTAINERS_KEY.CONTAINERS_PUBLISH_CONFIGS]?.[CONTAINERS_KEY.PUBLISH_DATE]
    container[CONTAINERS_KEY.PUBLISH_DATE] = dateString ? getStringToDate(dateString) : new Date()

    container[CONTAINERS_KEY.FREQUENCY] = response?.[CONTAINERS_KEY.CONTAINERS_PUBLISH_CONFIGS]?.[CONTAINERS_KEY.FREQUENCY]
    container[CONTAINERS_KEY.QUANTITY] = response?.[CONTAINERS_KEY.CONTAINERS_PUBLISH_CONFIGS]?.[CONTAINERS_KEY.QUANTITY]
    container[CONTAINERS_KEY.WORD_COUNT] = response?.[CONTAINERS_KEY.CONTAINERS_PUBLISH_CONFIGS]?.[CONTAINERS_KEY.WORD_COUNT]
    container[CONTAINERS_KEY.CRON] = response?.[CONTAINERS_KEY.CONTAINERS_PUBLISH_CONFIGS]?.[CONTAINERS_KEY.CRON]
    container[CONTAINERS_KEY.TIMEZONE] = response?.[CONTAINERS_KEY.CONTAINERS_PUBLISH_CONFIGS]?.[CONTAINERS_KEY.TIMEZONE]

    return container;
}

export const getTagsArrayFromString = (ctags) => {
    return !isNullOrUndefined(ctags) && !isEmptyString(ctags) ? ctags.split(',') : []
}


