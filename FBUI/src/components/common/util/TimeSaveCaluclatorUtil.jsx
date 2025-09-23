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
    if (data && data[CONTENT_TYPE.ARTICLE_BLOG]) {
        totalMinutes = Number(data[CONTENT_TYPE.ARTICLE_BLOG]) * TIME_TAKEN_PER_ARTICLE;
    }
    return getTimeInYearsMonthsDaysHoursMinutes(totalMinutes);
}

export const getTimeInYearsMonthsDaysHoursMinutes = (minutes) => {
    if (!minutes) return "0 minutes";

    const minutesInYear = 365 * 24 * 60;
    const minutesInMonth = 30 * 24 * 60;
    const minutesInDay = 24 * 60;
    const minutesInHour = 60;

    const years = Math.floor(minutes / minutesInYear);
    minutes %= minutesInYear;
    const months = Math.floor(minutes / minutesInMonth);
    minutes %= minutesInMonth;
    const days = Math.floor(minutes / minutesInDay);
    minutes %= minutesInDay;
    const hours = Math.floor(minutes / minutesInHour);
    const mins = minutes % minutesInHour;

    const parts = [];
    if (years) parts.push(`${years} Y`);
    if (months && (years || months)) parts.push(`${months} M`);
    if (days && (years || months || days)) parts.push(`${days} D`);
    if (hours && (years || months || days || hours)) parts.push(`${hours} Hr`);
    if (mins || !parts.length) parts.push(`${mins} Min`);

    return parts.join(', ');
}

export const getTimeInHours = (minutes) => {
    if (minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours} : ${mins < 10 ? mins + '0' : mins}`;
    }

    return 0
}