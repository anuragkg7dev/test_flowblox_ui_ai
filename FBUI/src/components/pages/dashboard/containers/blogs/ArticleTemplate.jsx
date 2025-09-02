import CustomeCloseIcon from "@/components/common/element/CustomeCloseIcon";
import { Box, Center, Container, Heading, HStack, Text, VStack, Wrap } from "@chakra-ui/react";
import { getTagsArrayFromString } from "../ContainersUtil";
import CustomTag from "@/components/common/element/CustomTag";
import { trimString } from "@/components/common/util/StringUtil";

export default function ArticleTemplate(props) {

    const articleMaster = props.articleMaster ?? {}
    const setOpenDrawer = props.setOpenDrawer
    const article = articleMaster?.generated_content

    const enableRandomColor = props.enableRandomColor ?? true;
    const badgeColor = props.badgeColor ?? "brand.subBrandBg";
    const badgeTextColor = props.badgeColor ?? "brand.pureWhiteTxt";


    const onClose = () => {
        setOpenDrawer(false)
    };

    const colors = ["#873AE1", "#3A85E1", "#C013D7", "#E55340", "#FF9500"];
    const startIndex = Math.floor(Math.random() * colors.length);

    const getRandomColor = (index) => {
        if (enableRandomColor) {
            return colors[(startIndex + index) % colors.length]
        }
        return badgeColor
    }

    return (
        <Container maxW="container.lg" py={8}>
            <VStack spacing={8} align="stretch">

                <HStack
                    key="aeHeader"
                    justifyContent="space-between"
                    width="100%"
                    height={"auto"}
                    borderBottom="0.1px solid"
                    borderBottomColor="brand.greyBrandBorder"
                    // position="sticky"
                    top="0"
                    zIndex="10"
                    bg="brand.bg">

                    {/* Main Heading */}
                    <Heading as="h1" size="2xl" fontWeight="bold" textAlign="center" color="brand.pureWhiteTxt">
                        {article.heading}
                    </Heading>
                    <CustomeCloseIcon onClose={onClose} />

                </HStack>
                {/* Introduction */}
                <Text fontSize="lg" color="brand.pureWhiteTxt" lineHeight="1.8">
                    {article.introduction}
                </Text>

                {/* Body Sections */}
                {article.body.map((section, index) => (
                    <Box key={index} p={6} boxShadow="md" >
                        <Heading as="h4" size="lg" fontWeight="bold" mb={4} >
                            {section.subheading}
                        </Heading>
                        <Text fontSize="md" color="brand.pureWhiteTxt" lineHeight="1.8">
                            {section.content}
                        </Text>
                    </Box>
                ))}

                {/* Conclusion */}
                <Box p={6} boxShadow="md" >
                    <Heading as="h2" size="lg" fontWeight="bold" mb={4}>
                        Conclusion
                    </Heading>
                    <Text fontSize="md" color="brand.pureWhiteTxt" lineHeight="1.8">
                        {article.conclusion}
                    </Text>
                </Box>

                {/* SEO Keywords */}



                <HStack spacing={1} alignItems="center" justifyContent="center" maxWidth="auto">
                    <Wrap>
                        {getTagsArrayFromString(article.seo_keywords)?.map(
                            (badge, index) =>
                                badge.trim() && (
                                    <CustomTag
                                        key={`bdg_art_${index}`}
                                        cbg={getRandomColor(index)}
                                        txtColor={badgeTextColor}
                                        name={trimString(badge, 20)}
                                        cpx={1}
                                        cmt={1}
                                        csize={"sm"} />

                                )
                        )}
                    </Wrap>
                </HStack>
            </VStack>
        </Container >
    );
};
