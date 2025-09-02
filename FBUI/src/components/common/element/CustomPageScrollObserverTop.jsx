import { Text, VisuallyHidden } from "@chakra-ui/react"
import { useCallback, useEffect } from "react"

export default function CustomPageScrollObserverTop(props) {
    const disableScrollLoad = props.disableScrollLoad
    const showLoadMore = props.showLoadMore
    const cloadMoreRef = props.cloadMoreRef
    const isFetching = props.isFetching
    const pageMetadata = props.pageMetadata
    const setIsFetching = props.setIsFetching
    const onClickLoadMore = props.onClickLoadMore


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

    return (<><VisuallyHidden><Text>{`ASP is ${disableScrollLoad ? 'disabled' : 'enabled'}`}</Text></VisuallyHidden> </>)
}