import { useAppRouterStore } from '@/components/store/AppRouterStore';
import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function HomeNavigatorBar(props) {

    let navState = useAppRouterStore((state) => state.data);
    const updateRouter = useAppRouterStore((state) => state.updateRouter);

    return (
        <Flex p="4" borderBottom="1px" borderColor="gray.200">

            <Box fontWeight="bold">AI Dashboard {navState.dashboard ? "TRUE":"FALSE"}</Box>
            
            <Spacer />

            {navState?.home && (<>
                <Button as={Link} to="/" variant="ghost">Home</Button>
            </>)}

            {navState?.signIn && (<>
                <Button as={Link} to="/signIn" variant="ghost">Sign In</Button>
            </>)}

            {navState?.signUp && (<>
                <Button as={Link} to="/signUp" variant="ghost">Sign Up</Button>
            </>)}

            {navState?.dashboard && (<>
                <Button as={Link} to="/dashboard" variant="ghost">Dashboard</Button>
            </>)}
        </Flex>
    );
}
