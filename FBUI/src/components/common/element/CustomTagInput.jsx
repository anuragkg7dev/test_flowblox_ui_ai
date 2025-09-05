import { HStack, Input, Tag, Text, VStack, Wrap } from "@chakra-ui/react"
import { useCallback, useState } from "react";
import CustomTag from "./CustomTag";
import { splitString } from "../util/StringUtil";
import { tagColors } from "../constants/CommonConstant";

export default function CustomTagInput(props) {
    let cmt = props.cmt

    let cpx = props.cpx
    let csize = props.csize
    let cml = props.cml
    let cwidth = props.cwidth

    let cvariant = props.cvariant
    let closeSize = props.closeSize
    let onRemoveTag = props.onRemoveTag
    let iconColorPalette = props.iconColorPalette

    let validate = props.validate
    const enableRandomColor = props.enableRandomColor ?? true;
    const badgeColor = props.badgeColor ?? "brand.subBrandBg";
    const badgeTextColor = props.badgeColor ?? "brand.darkBrandTxt";
    const colors = [...tagColors];
    const startIndex = Math.floor(Math.random() * colors.length);

    let [itags, setITags] = useState([]);
    let [tagInput, setTagInput] = useState("");

    let tags = props.tags ?? itags
    let setTags = props.setTags ?? setITags

    const COMMA = ','

    const getRandomColor = (index) => {
        if (enableRandomColor) {
            return colors[(startIndex + index) % colors.length]
        }
        return badgeColor
    }

    const onChangeTagInput = (e) => {
        let tagVal = e.target.value
        setTagInput(tagVal)

        if (tagVal?.includes(COMMA) && tagVal.endsWith(COMMA)) {
            let result = splitString(tagVal, COMMA)

            const tagSet = new Set([...tags, ...result]);

            setTags([...Array.from(tagSet)])

            const lastPart = tagVal.slice(tagVal.lastIndexOf(",") + 1).trim();
            setTagInput(lastPart)
        }
    }

    const onKeyDownTagInput = (e) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault(); // Prevent form submission if inside a form
            const newTag = tagInput.trim();
            if (newTag?.includes(COMMA)) {
                let result = splitString(newTag, COMMA)
                const tagSet = new Set([...tags, ...result]);
                setTags([...Array.from(tagSet)])
                setTagInput(""); // Clear input
            } else if (newTag && !tags.includes(newTag)) { // Avoid duplicates
                setTags([...tags, newTag]);
                setTagInput(""); // Clear input
            }
        }
    };


    const onClickClose = useCallback(
        (id) => {
            if (onRemoveTag) {
                onRemoveTag(id);
            }
            let updatedTags = [...tags];
            updatedTags.splice(id, 1);
            setTags(updatedTags);
            validate?.()
        },
        [tags, setTags, onRemoveTag]
    );

    return (<>

        <VStack ml={cml} width={cwidth}>
            <Input
                placeholder="Tags"
                onChange={(e) => onChangeTagInput(e)}
                onKeyDown={onKeyDownTagInput}
                variant={"fbloxD"}
                value={tagInput}
                onBlur={() => validate?.()}

            />
            <HStack justify="flex-start" width="100%">
                <Wrap justify="flex-start">
                    {tags?.map(
                        (tag, index) =>
                            tag.trim() && (
                                <CustomTag
                                    id={index}
                                    ckey={"ct_" + index}
                                    cmt={cmt}
                                    name={tag}
                                    cbg={getRandomColor(index)}
                                    txtColor={badgeTextColor}
                                    cpx={cpx}
                                    cvariant={cvariant}
                                    csize={csize}
                                    onClick={onClickClose}
                                    iconColorPalette={iconColorPalette}
                                    closeSize={closeSize}
                                />
                            )
                    )}
                </Wrap>
            </HStack>

        </VStack>

    </>)
}
