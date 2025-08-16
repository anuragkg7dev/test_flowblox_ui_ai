import { FaPodcast } from "react-icons/fa";
import { LuImages } from "react-icons/lu";
import { TbBrandBlogger } from "react-icons/tb";
import { TiSocialFlickr } from "react-icons/ti";

export const scribeTypes = [
    {
        name: "Blog",
        description: "Text artical only",
        icon: () => { return ( <TbBrandBlogger />) }
    },
    {
        name: "Blog + Images",
        description: "Artical with images",
        icon: () => { return (<LuImages />) }
    },
    {
        name: "Podcast",
        description: "Audio connect",
        icon: () => { return (<FaPodcast />) }
    },
    {
        name: "Social Media",
        description: "Sort form post",
        icon: () => { return (<TiSocialFlickr />) }
    }
];
