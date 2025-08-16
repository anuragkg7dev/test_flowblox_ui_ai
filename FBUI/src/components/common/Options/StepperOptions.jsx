import { GiAbstract074 } from "react-icons/gi"
import { GrDocumentConfig } from "react-icons/gr"
import { IoCreateOutline } from "react-icons/io5"
import { TbNotes } from "react-icons/tb"

export const STEP0 = 0
export const STEP1 = 1
export const STEP2= 2
export const STEP3 = 3
export const STEP4 = 4
export const STEP5 = 5


export const createContentSteps = [
    {
        title: "Define Content",
        description: "Define Content",
        icon: <IoCreateOutline />,
    },
    {
        title: "Content Configuration",
        description: "Content Configuration",
        icon: <GiAbstract074 />,
    },
    {
        title: "Publication Settings",
        description: "Publication Settings",
        icon: <GrDocumentConfig />,
    },

    {
        title: "Summary",
        description: "Summary",
        icon: <TbNotes />,
    },]