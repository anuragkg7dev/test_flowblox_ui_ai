import { Input, InputGroup } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { getSearchTriggerFlag } from "../constants/CommonUtilityAndOptions";
import { IoMdSearch } from "react-icons/io";

export default function CustomSearchInput(props) {
  const [xsearchQuery, setXSearchQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  const searchQuery = props.searchQuery ?? xsearchQuery
  const setSearchQuery = props.setSearchQuery ?? setXSearchQuery
  const loadData = props.loadData
  const urlParam = props.urlParam
  const setUrlParam = props.setUrlParam
  const urlKey = props.urlKey
  const cheight = props.cheight
  const cwidth = props.cwidth
  const cvariant = props.cvariant ?? "fbloxD"
  const cmt = props.cmt


  const fetchResults = useCallback(async (searchQuery) => {
    if(searchQuery == "" || searchQuery == undefined){
      // do nothing and continue
    }
    else if (!getSearchTriggerFlag(searchQuery)) {
      return;
    }
    let tempMap = new Map(urlParam.set(urlKey, searchQuery))
    setUrlParam(tempMap)
    loadData(tempMap)

  }, []);


  // Handle input change with timeout
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (newQuery == "") {
      fetchResults(newQuery);
    }
    else if (getSearchTriggerFlag(newQuery)) {
      setTypingTimeout(
        setTimeout(() => {
          fetchResults(newQuery);
        }, 500)
      );
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && getSearchTriggerFlag(searchQuery)) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      fetchResults(query);
    }
  };

  return (<>
    <InputGroup endElement={<IoMdSearch />} width={cwidth} mt={cmt}>
      <Input
        placeholder="Search"
        variant={cvariant}
        height={cheight}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  </>)

}