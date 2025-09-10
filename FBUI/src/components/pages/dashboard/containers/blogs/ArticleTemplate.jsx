import { getMediaAssets } from "@/components/client/EdgeFunctionRepository";
import { APP_CONFIG_KEYS, tagColors } from "@/components/common/constants/CommonConstant";
import CustomeCloseIcon from "@/components/common/element/CustomeCloseIcon";
import CustomTag from "@/components/common/element/CustomTag";
import { trimString } from "@/components/common/util/StringUtil";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { Box, Button, Container, DownloadTrigger, Float, Heading, HStack, Image, Text, VStack, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTagsArrayFromString } from "../ContainersUtil";
import { CustomBrandLogoMiniBlackBG } from "@/components/common/element/CustomBrandLogo";
import { ClimbingBoxLoader, PropagateLoader } from "react-spinners";
import { toast } from "@/components/common/Notification";
import { Link } from "react-router-dom";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { LuImageDown } from "react-icons/lu";

export default function ArticleTemplate(props) {

    const articleMaster = props.articleMaster ?? {}
    const setOpenDrawer = props.setOpenDrawer
    const article = articleMaster?.generated_content

    const enableRandomColor = props.enableRandomColor ?? true;
    const badgeColor = props.badgeColor ?? "brand.subBrandBg";
    const badgeTextColor = props.badgeColor ?? "brand.darkBrandTxt";

    const { config, setConfig, updateConfig } = useAppConfigStore();
    const authkeyBearer = config[APP_CONFIG_KEYS.JWT_TOKEN];

    const colors = [...tagColors];
    const startIndex = Math.floor(Math.random() * colors.length);

    const [bannerLoader, setBannerLoader] = useState(false)
    const [showDefaultBanner, setShowDefaultBanner] = useState(true)
    const [bannerUrl, setBannerUrl] = useState()

    console.log("articleMaster ", articleMaster)



    useEffect(() => {
        loadBanner(articleMaster?.container_id, articleMaster?.id)
    }, []);


    const onClose = () => {
        setOpenDrawer(false)
    };

    const getRandomColor = (index) => {
        if (enableRandomColor) {
            return colors[(startIndex + index) % colors.length]
        }
        return badgeColor
    }

    const loadBanner = (container_id, article_id) => {
        setBannerLoader(true)
        getMediaAssets(container_id, article_id, loadBannerCallback, authkeyBearer)
    };

    const loadBannerCallback = (flag, data) => {
        if (flag) {
            if (data?.assets?.metadata?.landscape?.regular || data?.assets?.metadata?.landscape?.raw) {
                setBannerUrl(data?.assets?.metadata?.landscape?.regular ?? data?.assets?.metadata?.landscape?.raw)
                setShowDefaultBanner(false)
            } else {
                toast.warning('Banner not available')
            }
        }
        setBannerLoader(false);
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
        <Container maxW="container.lg" py={8}>
            <VStack spacing={8} align="stretch">
                <HStack justifyContent="end"><CustomeCloseIcon onClose={onClose} /> </HStack>

                <Box
                    border="0.1px solid"
                    borderColor="brand.greyBrandBorder"
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

                    {!showDefaultBanner && (<>
                        <Float placement={'bottom-end'} offset="4">
                            {getDownloadComponent()}
                        </Float>
                    </>)}

                    {bannerLoader && (<> <Box mt={"100px"} position={"absolute"}>
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
                    <Heading as="h1" size="2xl" fontWeight="bold" textAlign="center" color="brand.pureWhiteTxt">
                        {article.heading}
                    </Heading>


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

                <Button
                    key={`bte_${'close'}`}
                    variant={"fbloxD"}
                    width="fit"
                    //height="25px"
                    aria-label="Close"
                    onClick={() => onClose()}
                    alignSelf={"center"}
                    mt={4}
                >
                    Close
                </Button>
            </VStack>
        </Container >
    );
};
