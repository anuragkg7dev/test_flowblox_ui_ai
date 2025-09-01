import { Box } from "@chakra-ui/react"
import { PropagateLoader } from "react-spinners"

export default function CustomPageScrollObserverBottom(props) {
    const showLoadMore = props.showLoadMore
    const cloadMoreRef = props.cloadMoreRef
    const isFetching = props.isFetching
    return (<>
        {showLoadMore && (<Box ref={cloadMoreRef} style={{ height: '20px', visibility: 'hidden' }} />)}
        {isFetching && (<Box mb={5} mt={5} justifySelf={'center'} color={'brand.pureWhiteTxt'}><PropagateLoader color="#D2B5F9" /></Box>)}
    </>)
}