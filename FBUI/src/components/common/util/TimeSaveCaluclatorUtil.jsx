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

    // Collect all non-zero units in descending order (largest first)
    const parts = [];
    if (years) parts.push(`${years} Y`);
    if (months) parts.push(`${months} M`);
    if (days) parts.push(`${days} D`);
    if (hours) parts.push(`${hours} Hr`);
    if (mins) parts.push(`${mins} Min`);

    // Take only the first 2 (largest) or all if fewer
    const displayParts = parts.slice(0, 2);

    // If no parts, fallback to "0 minutes"
    if (!displayParts.length) return "0 minutes";

    // Join with space (no comma)
    return displayParts.join(' ');
}

export const getTimeInHours = (minutes) => {
    if (minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours} : ${mins < 10 ? mins + '0' : mins}`;
    }

    return 0
}