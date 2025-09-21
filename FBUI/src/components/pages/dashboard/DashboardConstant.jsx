import { DESTINATION_TYPE } from "@/components/client/EdgeConstant";
import { CUSTOM, DAILY, MONTHLY, WEEKLY } from "@/components/common/constants/CommonConstant";

export const CARD_LAYOUT = "card_layout"
export const LIST_LAYOUT = "list_layout"

export const frquencyOption = [
  { label: "Daily", value: DAILY },
  { label: "Weekly", value: WEEKLY },
  { label: "Monthly", value: MONTHLY },
  { label: "Custom", value: CUSTOM },
];

export const sourceOutputOption = [
  { label: "Squarespace", value: DESTINATION_TYPE.SQUARESPACE },
 
  { label: "WordPress (Business plan or higher)", value: DESTINATION_TYPE.WORDPRESS }
];


export const ALL = "all"
export const DRAFT = "draft"
export const ARCHIVED = "archived"
export const PUBLISHED = "published"
export const UNPUBLISHED = "unpublished"
export const GENERATED = "generated"

export const filterOptions = [
  { label: "All", value: ALL },
  { label: "Draft", value: DRAFT },
  { label: "Archived", value: ARCHIVED },
  { label: "Published", value: PUBLISHED },
];

export const typeLabels = {
  rssFeed: "RSS Feed",
  facebook: "Facebook",
  instagram: "Instagram",
  x: "X",
  linkedIn: "LinkedIn",
  youtube: "YouTube",
  tiktok: "TikTok",
  blog: "Blog",
  news: "News",
  website: "Website",
};

export const FREQUENCY = "frequency"
export const AI_AGENTS = "aiagents"
export const ARTICLE_DETAILS = "articleDetails"
export const CONFIGURABLE = "configurable"
export const PREFRENCES = "prefrences"
export const SUBSCRIPTIONS_BOLTONS = "subscriptionNboltons"
export const ACCOUNT_DETAILS = "accountDetails"

export const articleSettingOptions = [
  { label: "Frequency", value: FREQUENCY },
  { label: "AI Agents", value: AI_AGENTS },
  { label: "Article Details", value: ARTICLE_DETAILS },
  { label: "Configurable", value: CONFIGURABLE },
];

export const accountPrefrenceOptions = [
  { label: "Account Details", value: ACCOUNT_DETAILS },
  { label: "Prefrences", value: PREFRENCES },
  { label: "Subscriptions & Bolt ons", value: SUBSCRIPTIONS_BOLTONS },
];

export const toneOfVoiceOption = [
  { label: "Professional", value: "professional" },
  { label: "Casual", value: "casual" },
  { label: "Friendly", value: "friendly" },
  { label: "Formal", value: "formal" },
  { label: "Conversational", value: "conversational" },
  { label: "Humorous", value: "humorous" },
  { label: "Authoritative", value: "authoritative" },
  { label: "Empathetic", value: "empathetic" },
];

export const strictnessOption = [
  { label: "Exactly", value: "exactly" },
  { label: "Firm", value: "firm" },
  { label: "Authoritative", value: "authoritative" },
  { label: "Commanding", value: "commanding" },
  { label: "Stern", value: "stern" },
  { label: "Direct", value: "direct" }
];

export const aiEngineOption = [
  { label: "OpenAI", value: "openAI" },
  // { label: "Google AI", value: "googleAI" },
  // { label: "Anthropic", value: "anthropic" },
  // { label: "DeepSeek", value: "deepSeek" },
  // { label: "Mistral AI", value: "mistralAI" },
  // { label: "xAI", value: "xAI" },
  // { label: "Meta AI", value: "metaAI" },
  // { label: "Alibaba Cloud", value: "alibabaCloud" },
  // { label: "Cohere", value: "cohere" },
  // { label: "Microsoft AI", value: "microsoftAI" },
];

export const aiModelOption = [
  // OpenAI Models  
  { label: "GPT-4o", value: "gpt-4o", engine: "openAI" },
  // { label: "o3-mini", value: "o3-mini", engine: "openAI" },
  // { label: "GPT-4.1", value: "gpt-4.1", engine: "openAI" },
  // { label: "GPT-4.5", value: "gpt-4.5", engine: "openAI" },
  // { label: "GPT-5", value: "gpt-5", engine: "openAI" },
  // Google AI Models
  { label: "Gemini 2.5 Pro", value: "gemini-2.5-pro", engine: "googleAI" },
  { label: "Gemini 2.0 Flash", value: "gemini-2.0-flash", engine: "googleAI" },
  { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro", engine: "googleAI" },
  // Anthropic Models
  { label: "Claude 3.7 Sonnet", value: "claude-3.7-sonnet", engine: "anthropic" },
  { label: "Claude 3.5 Haiku", value: "claude-3.5-haiku", engine: "anthropic" },
  // DeepSeek Models
  { label: "DeepSeek R1", value: "deepseek-r1", engine: "deepSeek" },
  { label: "DeepSeek V3", value: "deepseek-v3", engine: "deepSeek" },
  // Mistral AI Models
  { label: "Mistral 7B", value: "mistral-7b", engine: "mistralAI" },
  { label: "Mixtral 8x22B", value: "mixtral-8x22b", engine: "mistralAI" },
  // xAI Models
  { label: "Grok 4", value: "grok-4", engine: "xAI" },
  { label: "Grok 3", value: "grok-3", engine: "xAI" },
  // Meta AI Models
  { label: "Llama 4 Maverick", value: "llama-4-maverick", engine: "metaAI" },
  { label: "Llama 3.2", value: "llama-3.2", engine: "metaAI" },
  // Alibaba Cloud Models
  { label: "Qwen3-235B", value: "qwen3-235b", engine: "alibabaCloud" },
  { label: "Qwen2.5-72B", value: "qwen2.5-72b", engine: "alibabaCloud" },
  // Cohere Models
  { label: "Command R+", value: "command-r-plus", engine: "cohere" },
  { label: "Aya Vision", value: "aya-vision", engine: "cohere" },
  // Microsoft AI Models
  { label: "Turing-NLG", value: "turing-nlg", engine: "microsoftAI" },
];


export const LABELS = {
  ADD_CONTAINER: "Add Blox",
  EDIT_CONTAINER: 'Edit Blox',
  ADD_SOURCE: "Add Source",
  EDIT_SOURCE: 'Edit Source',
  ADD_DESTINATION: "Add Destination",
  EDIT_DESTINATION: 'Edit Destination',
  CONFIRM: "confirm",
  CLOSE: "close",
  CANCEL: "cancel",
  MANAGE: "manage"
}

export const sourceOption = [
  { label: "RSS Feed", value: "rssFeed" },
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "X", value: "x" },
  { label: "LinkedIn", value: "linkedIn" },
  { label: "YouTube", value: "youtube" },
  { label: "TikTok", value: "tiktok" },
  { label: "Blog", value: "blog" },
  { label: "News", value: "news" },
  { label: "Website", value: "website" },
];

export const destinationOption = [
  { label: "Squarespace", value: "squarespace" },
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "X", value: "x" },
  { label: "LinkedIn", value: "linkedIn" },
  { label: "YouTube", value: "youtube" },
  { label: "TikTok", value: "tiktok" },
  { label: "Blog", value: "blog" },
  { label: "News", value: "news" },
  { label: "Website", value: "website" },
];

