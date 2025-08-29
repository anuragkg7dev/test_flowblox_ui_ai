import { CONTENT_TYPE } from "@/components/client/EdgeConstant"

const TIME_TAKEN_PER_ARTICLE = 90
const TIME_TAKEN_PER_PODCAST = 125

export const getTimeSavedOnArticle = (noOfArticles) => {
    if (noOfArticles) {
        return noOfArticles * TIME_TAKEN_PER_ARTICLE
    }

    return 0
}

export const getTimeSavedOnPodcast = (noOfPodcast) => {
    if (noOfPodcast) {
        return noOfPodcast * TIME_TAKEN_PER_PODCAST
    }

    return 0
}

export const calculateTotalTimeSavedFroAllContainers = (data) => {
    let totalMinutes = 0;
    console.log(data)
    console.log(data[CONTENT_TYPE.ARTICLE_BLOG])
    if (data) {
        if (data[CONTENT_TYPE.ARTICLE_BLOG]) {
            totalMinutes = totalMinutes + (Number(data[CONTENT_TYPE.ARTICLE_BLOG]) * TIME_TAKEN_PER_ARTICLE)
        }
    }
    console.log(totalMinutes)
    return getTimeInHours(totalMinutes)
}

export const getTimeInHours = (minutes) => {
    if (minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours} : ${mins}`;
    }

    return 0
}