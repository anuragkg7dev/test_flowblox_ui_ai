import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo1.png';
import bgImage from '../../assets/bg1.jpg';
import { PRODUCT_PRICING_PRELAUNCH_URL, PRODUCT_PRICING_URL, PRODUCT_SELECTION_URL } from '../common/constants/AppRouterConstant';

export default function Home() {
    return (
        <Box
            minH="100vh"
            backgroundImage={`url(${bgImage})`}
            backgroundSize="cover"
            backgroundPosition="center"
            bgRepeat="no-repeat"
        >
            {/* Header */}           
            <Flex
                as="header"
                justify="space-between"
                align="center"
                px={{ base: 4, md: 8 }}
                py={4}               
                backdropFilter="blur(10px)"
                position="sticky"
                top="0"
                zIndex="10"
            >
                <Flex align="center">
                    <Image
                        src={logo}
                        alt="BlogPilot Logo"
                        height={{ base: '70px', md: '80px' }}
                        objectFit="contain"
                        mr={3}
                    />
                   
                </Flex>

                <Stack direction="row" spacing={4}>
                    <Button as={Link} to={PRODUCT_PRICING_PRELAUNCH_URL} colorPalette="purple" variant="solid">
                        Prelaunch
                    </Button>
                    <Button as={Link} to={PRODUCT_PRICING_URL} colorPalette="purple" variant="solid">
                        Product
                    </Button>
                    <Button as={Link} to="/signIn" colorPalette="purple" variant="solid">
                        Sign In
                    </Button>
                    <Button as={Link} to="/signUp"colorPalette="purple"  variant="solid">
                        Sign Up
                    </Button>
                </Stack>
            </Flex>


            {/* Bottom Feature Cards */}
            <Flex
                py={{ base: 10, md: 16 }}
                px={{ base: 4, md: 12 }}
                justify="center"
                align="center"
              
                mt={{ base: 8, md: 'auto' }}
            >
                <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 4 }}
                    spacing={6}
                    w="100%"
                    maxW="1200px"
                >
                    {[
                        {
                            title: 'Automated Blog Generation',
                            desc: 'Create blog posts with AI in seconds.',
                        },
                        {
                            title: 'Custom Prompts',
                            desc: 'Train your blog tone using custom prompts.',
                        },
                        {
                            title: 'Integrations',
                            desc: 'Push content directly to your CMS or app.',
                        },
                        {
                            title: 'Easy Scheduling',
                            desc: 'Plan and automate your publishing workflow.',
                        },
                    ].map((card, i) => (
                        <Box
                            key={i}
                            p={6}
                            bg="white"
                            rounded="lg"
                            shadow="md"
                            textAlign="center"
                            transition="all 0.2s"
                            _hover={{ shadow: 'lg', transform: 'translateY(-4px)' }}
                        >
                            <Heading size="sm" mb={2}>
                                {card.title}
                            </Heading>
                            <Text fontSize="sm" color="gray.600">
                                {card.desc}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Flex>
        </Box>
    );
}
