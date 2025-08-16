export const USER_ID = 'user_id'
export const ID = 'id'
export const CREATED_AT = 'created_at'
export const UPDATED_AT = 'updated_at'
export const CONTENT_TYPE = 'content_type'

export const TBL_AI_INPUTS = 'ai_inputs'
export const TOPIC = 'topic'
export const PROMPTS = 'prompts'
export const FORMAT_TYPE = 'format_type'

export const STATUS = 'status'
export const DESCRIPTION = 'description'
export const TOPIC_KEYWORDS = 'topic_keywords'

export const TBL_AI_INPUTS_CONFIG = 'ai_inputs_config'
export const TONE_OF_VOICE = 'tone_of_voice'
export const AI_FORMALITY = 'ai_formality'
export const AI_ENGINE_W = 'ai_engine_w'
export const AI_MODEL_W = 'ai_model_w'

export const TBL_AI_INPUTS_PUBLISH_CONFIG = 'ai_inputs_publish_configs'
export const OUTPUT_SOURCE = 'output_source'
export const NO_OF_ARTICLES = 'no_of_articles'
export const FREQUENCY = 'frequency'
export const PUBLISH_DATE = 'publish_date'
export const WORD_COUNT = 'word_count'

export const TBL_PRE_PAYMENT_GATEWAY_TRANSACTION = 'pre_payment_gateway_transaction'
export const EMAIL = 'email'
export const METADATA = 'metadata'
export const AMOUNT = 'amount'
export const CURRENCY = 'currency'

export const COMMA_SEPERATOR = ", ";


export const COLUMNS_TBL_AI_INPUTS = [
    ID,
    TOPIC,
    PROMPTS,
    STATUS,
    CONTENT_TYPE,
    TOPIC_KEYWORDS,
    CREATED_AT,
    UPDATED_AT
].join(COMMA_SEPERATOR);

export const COLUMNS_TBL_AI_INPUTS_CONFIG = [
    ID,
    TONE_OF_VOICE,
    AI_FORMALITY,
    AI_ENGINE_W,
    AI_MODEL_W
].join(COMMA_SEPERATOR);

export const COLUMNS_TBL_AI_INPUTS_PUBLISH_CONFIG = [
    ID,
    OUTPUT_SOURCE,
    NO_OF_ARTICLES,
    FREQUENCY,
    PUBLISH_DATE,
    WORD_COUNT
].join(COMMA_SEPERATOR);


