import { Box, Code, Flex, Text, VStack } from "@chakra-ui/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SquarespaceIntegration(props) {

    const containerId = props.containerId
    const hostUrl = props.hostUrl
    const apiUrl = `${hostUrl}?container_id=${containerId}`

    const headScript = () => {
        return (
            <Code bg={'brand.pureBlackBg'} variant="subtle">
                <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                    {`<Script> 
document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('code');
  codeBlocks.forEach(block => {
    const match = block.textContent.match(/{articleid~([^}]+)}/);
    if (match) {
      const articleId = match[1];
      const articleUrl = \`${apiUrl}&id=\${articleId}\`;
      fetch(articleUrl)
        .then(res => res.json())
        .then(data => {
          const content = data.generated_content;
          const div = document.createElement('div');
          div.innerHTML = \`
            <h1>\${content.heading}</h1>
            <p>\${content.introduction}</p>
            \${content.body.map(section => \`<h2>\${section.subheading}</h2><p>\${section.content}</p>\`).join('')}
            <p>\${content.conclusion}</p>
            <p>Keywords: \${content.seo_keywords}</p>
          \`;
          block.parentNode.replaceChild(div, block);
        });
    }
  });
});
</Script> `}
                </SyntaxHighlighter>      </Code>
        );
    };


    const placeholderScript = () => {

        return (
            <Code p={2} borderRadius="md" bg={'brand.pureBlackBg'}>
                <SyntaxHighlighter language="html" style={vscDarkPlus} variant={'subtle'}>
                    {`<code>{articleid~YOUR_ARTICLE_ID}</code>`}
                </SyntaxHighlighter>
            </Code>
        );
    }

    return (<>
        <Flex mt={6} ml={6} justify="flex-start">
            <VStack align="start">
                <Box>
                    <Text color="brand.pureWhiteTxt">Header Script</Text>
                    <Box>{headScript()}</Box>
                </Box>

                <Box mt={6}>
                    <Text color="brand.pureWhiteTxt">Child Page Script</Text>
                    <Box>{placeholderScript()}</Box>
                </Box>
            </VStack>
        </Flex>
    </>)

}