import { AI_ENGINE_W, AI_FORMALITY, AI_MODEL_W, CONTENT_TYPE, CREATED_AT, FREQUENCY, ID, NO_OF_ARTICLES, OUTPUT_SOURCE, PROMPTS, PUBLISH_DATE, TBL_AI_INPUTS_CONFIG, TBL_AI_INPUTS_PUBLISH_CONFIG, TONE_OF_VOICE, TOPIC, TOPIC_KEYWORDS, UPDATED_AT, WORD_COUNT } from "@/components/client/SuperbaseRepositoryConstants"
import { clone } from "@/components/common/util/JsonUtil"

export const initContentConfiguration = {

    createConfig: {
        id:undefined,
        topic: undefined,
        description: undefined,
        selectedType: undefined,
        keywords: undefined,

    },
    aiConfigure: {
        id:undefined,
        toneOfVoice: undefined,
        aiFormality: undefined,
        aiEngine: undefined,
        aiModel: undefined
    },
    publishConfig: {
        id:undefined,
        outputSource: undefined,
        noOfArticles: 1,
        frequency: 1,
        avgWordCount: 20,
        publishDate: undefined,
    },
    status:"draft"

}

export const initializeMasterDataFormDBData = (data) => {
    let masterData = clone(initContentConfiguration)

    masterData[UPDATED_AT]=data[UPDATED_AT]
    masterData[CREATED_AT]=data[CREATED_AT]

    masterData.createConfig.id=data[ID]
    masterData.createConfig.topic=data[TOPIC]
    masterData.createConfig.description=data[PROMPTS]?.description
    masterData.createConfig.selectedType=data[CONTENT_TYPE]
    masterData.createConfig.keywords=data[TOPIC_KEYWORDS]

   
    masterData.aiConfigure.id=data[TBL_AI_INPUTS_CONFIG][ID]
    masterData.aiConfigure.aiModel=data[TBL_AI_INPUTS_CONFIG][AI_MODEL_W]
    masterData.aiConfigure.aiEngine=data[TBL_AI_INPUTS_CONFIG][AI_ENGINE_W]
    masterData.aiConfigure.aiFormality=data[TBL_AI_INPUTS_CONFIG][AI_FORMALITY]
    masterData.aiConfigure.toneOfVoice=data[TBL_AI_INPUTS_CONFIG][TONE_OF_VOICE]

    masterData.publishConfig.id=data[TBL_AI_INPUTS_PUBLISH_CONFIG][ID]
    masterData.publishConfig.outputSource=data[TBL_AI_INPUTS_PUBLISH_CONFIG][OUTPUT_SOURCE]
    masterData.publishConfig.noOfArticles=data[TBL_AI_INPUTS_PUBLISH_CONFIG][NO_OF_ARTICLES]
    masterData.publishConfig.frequency=data[TBL_AI_INPUTS_PUBLISH_CONFIG][FREQUENCY]
    masterData.publishConfig.avgWordCount=data[TBL_AI_INPUTS_PUBLISH_CONFIG][WORD_COUNT]
    masterData.publishConfig.publishDate=data[TBL_AI_INPUTS_PUBLISH_CONFIG][PUBLISH_DATE]

    return masterData;
   
}


