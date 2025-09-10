import { COMMON_STATUS, DESTINATION_TYPE, FREQUENCY_TYPE, SOURCE_TYPE } from "@/components/client/EdgeConstant";


export const CONTAINERS_KEY = {
    ID: 'id',
    NAME: 'name',
    DESCRIPTION: 'description',
    CONTENT_TYPE: 'content_type',
    TAGS: 'tags',
    TONE_OF_VOICE: 'tone_of_voice',
    AI_ENGINE_W: 'ai_engine_w',
    AI_MODEL_W: 'ai_model_w',
    AI_ENGINE_E: 'ai_engine_e',
    AI_MODEL_E: 'ai_model_e',
    STRICTNESS: 'strictness',
    AI_WRITER_PROMPT: 'ai_writer_prompt',
    AI_EDITOR_PROMPT: 'ai_editor_prompt',
    AI_WRITER_STRICTNESS: 'ai_writer_strictness',
    AI_EDITOR_STRICTNESS: 'ai_editor_strictness',
    QUANTITY: 'quantity',
    FREQUENCY: 'frequency',
    PUBLISH_DATE: 'publish_date',
    WORD_COUNT: 'word_count',
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY_OF_MONTH: 'day_of_month',
    MONTH: 'month',
    DAY_OF_WEEK: 'day_of_week',
    CRON: 'cron',
    TIMEZONE: 'timezone',
    PROMPTS: 'prompts',
    CONTAINERS_CONFIG: 'containers_config',
    CONTAINERS_PUBLISH_CONFIGS: 'containers_publish_configs',
    STATUS: 'status',
    SOURCES: 'sources',
    AUTO_PUBLISH: 'auto_publish',
};

export const CONTAINERS_BLOG_BASE = {
    [CONTAINERS_KEY.NAME]: 'My Article Blox',
    [CONTAINERS_KEY.DESCRIPTION]: '',
    [CONTAINERS_KEY.TAGS]: '',
    [CONTAINERS_KEY.QUANTITY]: 1,
    [CONTAINERS_KEY.WORD_COUNT]: 100,
    [CONTAINERS_KEY.FREQUENCY]: FREQUENCY_TYPE.CUSTOM,
    [CONTAINERS_KEY.PUBLISH_DATE]: new Date(),
    [CONTAINERS_KEY.HOUR]: () => { const now = new Date(); return new Date(now.setHours(now.getHours() + 2)).getHours(); },
    [CONTAINERS_KEY.MINUTE]: 0,

}

export const SOURCE_DESTINATION_KEY = {
    ID: 'id',
    TITLE: 'title',
    DESCRIPTION: 'description',
    TYPE: 'type',
    CONFIG: 'config',
    URL: 'url',
    STATUS: 'status',
    KIND: 'kind',
    CONTAINERS_ID: "containers_id",
    PROCESSING: "processing",
}

export const DESTINATION_BASE = {
    [SOURCE_DESTINATION_KEY.TITLE]: 'My New Destination',
    [SOURCE_DESTINATION_KEY.DESCRIPTION]: '',
    [SOURCE_DESTINATION_KEY.TYPE]: DESTINATION_TYPE.SQUARESPACE,
    [SOURCE_DESTINATION_KEY.STATUS]: COMMON_STATUS.ACTIVE,
    [SOURCE_DESTINATION_KEY.KIND]: "containers_destination",
    [SOURCE_DESTINATION_KEY.CONFIG]: {},

}

export const SOURCE_BASE = {
    [SOURCE_DESTINATION_KEY.TITLE]: 'My New Source',
    [SOURCE_DESTINATION_KEY.DESCRIPTION]: '',
    [SOURCE_DESTINATION_KEY.TYPE]: SOURCE_TYPE.RSS_FEED,
    [SOURCE_DESTINATION_KEY.STATUS]: COMMON_STATUS.ACTIVE,
    [SOURCE_DESTINATION_KEY.KIND]: "containers_destination",
    [SOURCE_DESTINATION_KEY.CONFIG]: {},

}

export const API_PARAM_KEY = {
    LIMIT: 'limit',
    CONTAINER_TYPE: 'container_type',
    CONTAINERS_ID: "containers_id",
    PAGE: 'page',
    SORT: 'sort',
    HEADING: 'heading',
    STATUS: 'status',
    CURRENT_PAGE: 'current_page',
    TOTAL_COUNT: 'total_count',
    TOTAL_PAGES: 'total_pages',
    NAME: 'name',
    TAGS: 'tags',
    CONTENT_TYPE: 'content_type',
    ID: 'id',
    SEARCH_TXT:'searchTxt',
    SUB_ID:"sub_id",
}