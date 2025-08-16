import { supabase } from "./SuperbasClient"
import { AI_ENGINE_W, AI_FORMALITY, AI_MODEL_W, COLUMNS_TBL_AI_INPUTS, COLUMNS_TBL_AI_INPUTS_CONFIG, COLUMNS_TBL_AI_INPUTS_PUBLISH_CONFIG, CONTENT_TYPE, CREATED_AT, DESCRIPTION, FREQUENCY, ID, NO_OF_ARTICLES, OUTPUT_SOURCE, PROMPTS, PUBLISH_DATE, STATUS, TBL_AI_INPUTS, TBL_AI_INPUTS_CONFIG, TBL_AI_INPUTS_PUBLISH_CONFIG, TONE_OF_VOICE, TOPIC, TOPIC_KEYWORDS, USER_ID, WORD_COUNT } from "./SuperbaseRepositoryConstants"

export async function getLoggedInUser(callback) {
    const { data: { user }, error: userError, } = await supabase.auth.getUser()

    if (userError || !user) {
        console.error("User not logged in", userError)
        if (callback) callback(false, "User not logged in " + userError)
    } else {
        if (callback) callback(true, user)
    }

}

export async function getAiInputs(columns, callback) {

    supabase.auth.getUser()
        .then((result) => {
            console.log("AAKG result ", result)
            return getScribeByUserId(result?.data?.user, columns, callback)
        })
        .catch((error) => {
            console.error("Error inserting ai_input:", error)
            if (callback) callback(false, "")
        });
}

async function getScribeByUserId(user, columns, callback) {



    supabase
        .from(TBL_AI_INPUTS)
        .select(`
        ${COLUMNS_TBL_AI_INPUTS},
        
        ${TBL_AI_INPUTS_CONFIG} (
          ${COLUMNS_TBL_AI_INPUTS_CONFIG}
        ),

        ${TBL_AI_INPUTS_PUBLISH_CONFIG} (
          ${COLUMNS_TBL_AI_INPUTS_PUBLISH_CONFIG}
        )
      `)
        .eq(USER_ID, user.id)
        .order(CREATED_AT, { ascending: false })
        .then((result) => {

            if (result?.error) {
                console.error("Error fetching ai_input:", result?.error)
                if (callback) callback(false, "Something went wrong : E5")
            } else {              
                result["email"] = user?.user_metadata?.email
                if (callback) callback(true, result)
                return result;
            }
        })
        .catch((error) => {
            console.error("Error fetch ai_input:", error)
            if (callback) callback(false, "Something went wrong : E6")
        });

}


//---------------------------------------


export async function saveCreateContentData(ccdata, callback) {

    supabase.auth.getUser()
        .then((result) => {
            console.log("getUser", result)
            return saveCreateContentByUser(result?.data?.user, ccdata, callback)
        })
        .catch((error) => {
            console.error("Error inserting ai_input:", error)
            if (callback) callback(false, "Something went wrong: E7")
        });
}


async function saveCreateContentByUser(user, data, callback) {
    try {

        if (!user) throw new Error('No authenticated user found');

        let promptJson = {}
        promptJson[DESCRIPTION] = data.description

        let ccData = {}
        if (data.id) {
            ccData[ID] = data.id
        }

        ccData[USER_ID] = user.id
        ccData[TOPIC] = data.topic
        ccData[PROMPTS] = promptJson
        ccData[STATUS] = 'draft'
        ccData[CONTENT_TYPE] = data.selectedType
        ccData[TOPIC_KEYWORDS] = data.keywords

        const { data: insertedData, error } = await supabase
            .from(TBL_AI_INPUTS)
            .upsert([ccData], { onConflict: ID })
            .select()
            .single();

        if (error) {
            if (callback) callback(false, 'Error saving step 1 data')
            throw new Error(`Error saving step 1 data: ${error.message}`);
        } else {
            if (callback) callback(true, insertedData)
        }
        return insertedData;
    } catch (error) {
        console.error('Error in saveStep1Data:', error);
        if (callback) callback(false, insertedData)
        throw error;
    }
}


export async function saveContentAiConfiguration(data, callback) {

    if (!data || !data.id) throw new Error('Something went wrong: E8');

    try {
        let cacData = {}
        if (data.id) {
            cacData[ID] = data.id
        }
        cacData[TONE_OF_VOICE] = data.toneOfVoice
        cacData[AI_FORMALITY] = data.aiFormality
        cacData[AI_ENGINE_W] = data.aiEngine
        cacData[AI_MODEL_W] = data.aiModel

       
        const { data: insertedData, error } = await supabase
            .from(TBL_AI_INPUTS_CONFIG)
            .upsert([cacData], { onConflict: ID })
            .select()
            .single();

        if (error) {
            if (callback) callback(false, 'Error saving step 2 data')
            throw new Error(`Error saving step 2 data: ${error.message}`);
        } else {
            if (callback) callback(true, insertedData)
        }
        return insertedData;
    } catch (error) {
        console.error('Error in saveStep2Data:', error);
        if (callback) callback(true, insertedData)
        throw error;
    }
}



export async function saveContentPublicationConfiguration(data, callback) {

    if (!data || !data.id) throw new Error('Something went wrong: E10');

    try {
        let cpcData = {}
        if (data.id) {
            cpcData[ID] = data.id
        }
        cpcData[OUTPUT_SOURCE] = data.outputSource
        cpcData[NO_OF_ARTICLES] = String(data.noOfArticles)
        cpcData[FREQUENCY] = data.frequency
        cpcData[PUBLISH_DATE] = data.publishDate
        cpcData[WORD_COUNT] = String(data.avgWordCount)

        const { data: insertedData, error } = await supabase
            .from(TBL_AI_INPUTS_PUBLISH_CONFIG)
            .upsert([cpcData], { onConflict: ID })
            .select()
            .single();

        if (error) {
            if (callback) callback(false, 'Error saving step 3 data')
            throw new Error(`Error saving step 3 data: ${error.message}`);
        } else {
            if (callback) callback(true, insertedData)
        }
        return insertedData;
    } catch (error) {
        console.error('Error in saveStep3Data:', error);
        if (callback) callback(true, insertedData)
        throw error;
    }
}
