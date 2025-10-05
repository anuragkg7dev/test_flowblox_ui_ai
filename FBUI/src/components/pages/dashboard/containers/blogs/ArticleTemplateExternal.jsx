import { getArticleExternalUid } from "@/components/client/EdgeFunctionRepository";
import { tagColors } from "@/components/common/constants/CommonConstant";
import { CustomBrandLogoMiniBlackBG } from "@/components/common/element/CustomBrandLogo";
import CustomTag from "@/components/common/element/CustomTag";
import { trimString } from "@/components/common/util/StringUtil";
import { Box, Button, ClientOnly, Container, DownloadTrigger, EmptyState, Flex, Float, Heading, HStack, IconButton, Image, Skeleton, SkeletonText, Stack, Text, VStack, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuImageDown, LuMoon, LuSun } from "react-icons/lu";
import { TbMoodEmpty } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { getTagsArrayFromString } from "../ContainersUtil";

export default function ArticleTemplateExternal(props) {
    const [searchParams] = useSearchParams();

    const [articleMaster, setArticleMaster] = useState()
    const [article, setArticle] = useState()
    const [bannerUrl, setBannerUrl] = useState()

    const [dark, setDark] = useState(false)

    //const article = articleMaster?.generated_content

    const enableRandomColor = props.enableRandomColor ?? true;
    const badgeColor = props.badgeColor ?? "brand.subBrandBg";
    const badgeTextColor = props.badgeColor ?? "brand.darkBrandTxt";

    const colors = [...tagColors];
    const startIndex = Math.floor(Math.random() * colors.length);

    const [loader, setLoader] = useState(false)
    const [articleAvailable, setArticleAvailable] = useState(false)
    const [showDefaultBanner, setShowDefaultBanner] = useState(true)


    console.log("articleMaster ", articleMaster)



    useEffect(() => {
        setLoader(true)
        const articleId = searchParams.get("uid");
        console.log(articleId)

        if (articleId) {
            getArticleExternalUid(articleId, getArticleExternalUidCallback)

        } else {
            setLoader(false)
            setArticleAvailable(false)
        }
    }, []);

    const getArticleExternalUidCallback = (flag, data) => {
        if (flag) {
            setArticleMaster(data)
            setArticle(data?.generated_content)
            const img = data?.image?.landscape?.regular ?? data?.image?.landscape?.raw
            setBannerUrl(img)
            setShowDefaultBanner(!img)
        }
        setArticleAvailable(flag)
        setLoader(false)
    }


    const getRandomColor = (index) => {
        if (enableRandomColor) {
            return colors[(startIndex + index) % colors.length]
        }
        return badgeColor
    }



    const getImageAsBlob = async () => {
        const res = await fetch(bannerUrl)
        return res.blob()
    }

    const getDownloadComponent = () => {
        return (
            <DownloadTrigger
                data={getImageAsBlob}
                fileName="banner.jpg"
                mimeType="image/jpeg"
                asChild
                width={4}
                zIndex={10}
            >
                <Button variant="subtle" >
                    <LuImageDown color="brand.subBrandBg" />
                </Button>
            </DownloadTrigger>
        )
    }

    return (
        <Flex minHeight="100vh" width="100%" bg={dark ? "brand.OffBlackBg" : "brand.pureWhiteBg"} >
            <Container  >

                <ClientOnly fallback={<Skeleton boxSize="8" />}>
                    <Flex justify="flex-end"  top="4" right="4" zIndex="10">
                        <IconButton onClick={() => setDark(prev => !prev)} variant="outline" size="sm" color={!dark ? "brand.OffBlackBg" : "brand.pureWhiteBg"}>
                            {!dark ? <LuSun /> : <LuMoon />}
                        </IconButton>
                    </Flex>
                </ClientOnly>


                {!loader && articleAvailable && (<>
                    <VStack spacing={8} align="stretch">


                        <Box
                            border="0.1px solid"
                            borderColor={dark ? "brand.greyBrandBorder" : "brand.whiteBrandBorderLight"}
                            height={"250px"}
                            width={"100%"}
                            mb={4}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            bg={'brand.OffBlackBg'}
                            position="relative"
                            overflow="hidden"
                        >
                            {showDefaultBanner && (<>
                                <CustomBrandLogoMiniBlackBG
                                    ch="60px"
                                    cw="60px"
                                    ccolor="brand.pureWhiteBg"
                                />
                            </>)}

                            {showDefaultBanner && (<>
                                <Float placement={'bottom-center'} offset="4" ><Text>Banner</Text></Float>
                            </>)}


                            {!showDefaultBanner && (<>
                                <Image src={bannerUrl}
                                    alt="Banner Image"
                                    width="100%"
                                    height="auto"
                                    objectFit="fill" />
                            </>)}

                            {!showDefaultBanner && false && (<>
                                <Float placement={'bottom-end'} offset="4">
                                    {getDownloadComponent()}
                                </Float>
                            </>)}

                            {loader && (<> <Box mt={"100px"} position={"absolute"}>
                                <PropagateLoader color="#D2B5F9" />
                            </Box>
                            </>)}


                        </Box>





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
                            <Heading as="h1" size="2xl" fontWeight="bold" textAlign="center" color={dark ? "brand.pureWhiteTxt" : "brand.pureBlackTxt"}>
                                {article.heading}
                            </Heading>


                        </HStack>


                        {/* Introduction */}
                        <Text fontSize="lg" color={dark ? "brand.pureWhiteTxt" : "brand.pureBlackTxt"} lineHeight="1.8">
                            {article.introduction}
                        </Text>

                        {/* Body Sections */}
                        {article.body.map((section, index) => (
                            <Box key={index} p={6} >
                                <Heading as="h4" size="lg" fontWeight="bold" mb={4} color={dark ? "brand.pureWhiteTxt" : "brand.pureBlackTxt"} >
                                    {section.subheading}
                                </Heading>
                                <Text fontSize="md" color={dark ? "brand.pureWhiteTxt" : "brand.pureBlackTxt"} lineHeight="1.8">
                                    {section.content}
                                </Text>
                            </Box>
                        ))}

                        {/* Conclusion */}
                        <Box p={6}  >
                            <Heading as="h2" size="lg" fontWeight="bold" mb={4} color={dark ? "brand.pureWhiteTxt" : "brand.pureBlackTxt"}>
                                Conclusion
                            </Heading>
                            <Text fontSize="md" color={dark ? "brand.pureWhiteTxt" : "brand.pureBlackTxt"} lineHeight="1.8">
                                {article.conclusion}
                            </Text>
                        </Box>

                        {/* SEO Keywords */}



                        <HStack spacing={1} alignItems="center" justifyContent="center" maxWidth="auto" mb={10}>
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
                </>)}

                {loader && (<>

                    <Stack gap="6" width={"90%"}>
                        <Skeleton height="100px" />
                        <HStack width="full">

                            <SkeletonText noOfLines={2} />
                        </HStack>
                        <Skeleton height="700px" />
                    </Stack>

                </>)}

                {!loader && !articleAvailable && (<>

                    <EmptyState.Root width={"90%"}>
                        <EmptyState.Content>
                            <EmptyState.Indicator>
                                <TbMoodEmpty />
                            </EmptyState.Indicator>
                            <VStack textAlign="center">
                                <EmptyState.Title color={dark ? "brand.pureWhiteTxt" : "brand.pureBlackTxt"}>Article Not Available</EmptyState.Title>
                                {/* <EmptyState.Description>
            Explore our products and add items to your cart
          </EmptyState.Description> */}
                            </VStack>
                        </EmptyState.Content>
                    </EmptyState.Root>

                </>)}

            </Container >
        </Flex>
    );
};
