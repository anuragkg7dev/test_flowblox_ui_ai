import { API_PARAM_KEY } from "@/components/pages/dashboard/containers/ContainersConstant"
import { Text, VisuallyHidden } from "@chakra-ui/react"
import { useCallback, useEffect } from "react"

export default function CustomPageScrollObserverTop(props) {
    const disableScrollLoad = props.disableScrollLoad
    const showLoadMore = props.showLoadMore
    const cloadMoreRef = props.cloadMoreRef
    const isFetching = props.isFetching
    const setIsFetching = props.setIsFetching
    const pageMetadata = props.pageMetadata
    const pageConfigParams = props.pageConfigParams
    const setPageConfigParams = props.setPageConfigParams
    const loadData = props.loadData
    const setShowLoadMore = props.setShowLoadMore


    useEffect(() => {

        if (!cloadMoreRef.current || !showLoadMore || disableScrollLoad || isFetching) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && showLoadMore) {
                    debouncedLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (cloadMoreRef.current) {
            observer.observe(cloadMoreRef.current);
        }

        return () => {
            if (cloadMoreRef.current) {
                observer.unobserve(cloadMoreRef.current);
            }
        };
    }, [showLoadMore, pageMetadata]);

    // Debounced load more function
    const debouncedLoadMore = useCallback(() => {
        if (!isFetching && showLoadMore) {
            setIsFetching?.(true);
            onClickLoadMore?.();
        }
    }, [isFetching, showLoadMore, pageMetadata]);

    const onClickLoadMore = () => {
        let totalPages = pageMetadata?.total_pages ?? 0
        let currentPage = pageMetadata?.current_page ?? 0
        let incrementor = currentPage < totalPages ? 1 : 0
        let tempMap = new Map(pageConfigParams.set(API_PARAM_KEY.PAGE, Number(currentPage) + incrementor))
        setPageConfigParams(tempMap);
        loadData(tempMap)
        setShowLoadMore(false)
    }

    return (<><VisuallyHidden><Text>{`ASP is ${disableScrollLoad ? 'disabled' : 'enabled'}`}</Text></VisuallyHidden> </>)
}