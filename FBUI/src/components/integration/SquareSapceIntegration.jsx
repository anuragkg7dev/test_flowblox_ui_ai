import { Box, Code, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CustomClipBoard } from "../common/element/CustomClipBoard";

export default function SquarespaceIntegration(props) {

    const containerId = props.containerId
    const hostUrl = props.hostUrl
    const apiUrl = `${hostUrl}?container_id=${containerId}`

    const headScriptJs = `<Script> 
document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('code');
  codeBlocks.forEach(block => {
    const match = block.textContent.match(/{(articleid|articleidWithImg)~([^}]+)}/);   
    if (match) {
     const tagType = match[1]; 
     const articleId = match[2];
     
      const articleUrl = \`${apiUrl}&id=\${articleId}\`;

      fetch(articleUrl)
        .then(res => res.json())
        .then(data => {
          const content = data.generated_content;
          document.title = content.heading || 'Default Page Title';
          const div = document.createElement('div');

          const bannerImage = tagType == 'articleidWithImg' && data.image?.landscape?.full 
            ? \`<img src="\${data.image.landscape.full}" alt="\${content.heading}" style="width: 100%; max-height: 400px; object-fit: cover; margin-bottom: 1rem;" />\` 
            : '';

          div.innerHTML = \`
            \${bannerImage}
            <h1>\${content.heading}</h1>
            <p>\${content.introduction}</p>
            \${content.body.map(section => \`<h2>\${section.subheading}</h2><p>\${section.content}</p>\`).join('')}
            <p>\${content.conclusion}</p>
            <p>Keywords: \${content.seo_keywords}</p>
          \`;
          block.parentNode.replaceChild(div, block);
        })
        .catch(error => {
          console.error('Error fetching article:', error);
          // Optionally, display an error message in the DOM
          const div = document.createElement('div');
          div.innerHTML = '<p>Article not available.</p>';
          block.parentNode.replaceChild(div, block);
        });
    }
  });
});
</Script> `

    const childScriptJs = `<code>{articleid~YOUR_ARTICLE_ID}</code>`
    const childWithImgScriptJs = `<code>{articleidWithImg~YOUR_ARTICLE_ID}</code>`


    const headScript = () => {
        return (
            <Code bg={'brand.pureBlackBg'} variant="subtle">

                <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                    {headScriptJs}
                </SyntaxHighlighter>
            </Code>
        );
    };

    const placeholderScript = () => {

        return (
            <>
                <Code p={2} borderRadius="md" bg={'brand.pureBlackBg'}>
                    <SyntaxHighlighter language="html" style={vscDarkPlus} variant={'subtle'}>
                        {childScriptJs}
                    </SyntaxHighlighter>
                </Code>



            </>
        );
    }

    const placeholderScriptWithImg = () => {

        return (
            <>

                <Code p={2} borderRadius="md" bg={'brand.pureBlackBg'}>
                    <SyntaxHighlighter language="html" style={vscDarkPlus} variant={'subtle'}>
                        {childWithImgScriptJs}
                    </SyntaxHighlighter>
                </Code>

            </>
        );
    }

    return (<>
        <Flex mt={6} ml={6} justify="flex-start">
            <VStack align="start">
                <Box>
                    <HStack>
                        <Text mr={4} color="brand.pureWhiteTxt">Header Script</Text>
                        <CustomClipBoard cvalue={headScriptJs} />
                    </HStack>

                    <Box>{headScript()}</Box>
                </Box>
                <HStack >
                    <Box >
                        <HStack>
                            <Text mr={4} color="brand.pureWhiteTxt">Child Page Script</Text>
                            <CustomClipBoard cvalue={childScriptJs} />
                        </HStack>

                        <Box>{placeholderScript()}</Box>
                    </Box>

                    <Box >
                        <HStack>
                            <Text mr={4} color="brand.pureWhiteTxt">Child Page Script With Image</Text>
                            <CustomClipBoard cvalue={childWithImgScriptJs} />
                        </HStack>

                        <Box>{placeholderScriptWithImg()}</Box>
                    </Box>
                </HStack>
            </VStack>
        </Flex>
    </>)

}