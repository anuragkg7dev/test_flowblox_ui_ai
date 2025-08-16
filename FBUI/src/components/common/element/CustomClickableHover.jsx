import { Button, Input, Popover, Portal, Text, Wrap } from "@chakra-ui/react"
import { useState } from "react"

export default function CustomClickableHover(props) {
  const ckey = props.ckey
  const cwidth = props.cwidth ?? 1
  const items = props.items ?? []
  const title = props.title
  const onClickItem = props.onClickItem
  const buttonText = props.buttonText

  const [open, setOpen] = useState(false)

  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild color={"black"}>
        <Button
          key={`bte_${ckey}`}
          variant="fbloxD"
          width={cwidth}
          height="auto"

        >
          <Text color={"white"}> {buttonText} </Text>
        </Button>
      </Popover.Trigger>
      <Portal  >
        <Popover.Positioner  >
          <Popover.Content 
          maxW={{ base: '90vw', md: '400px' }} 
          bg={"brand.pureBlackBg"} 
          borderColor="brand.greyBrandBorder"
            borderWidth="1px"
            borderStyle="solid"
            
            >
            <Popover.Arrow  bg={"brand.pureBlackBg"} />
            <Popover.Body >
              <Popover.Title id="popover-title"
                fontWeight="medium"
                textAlign="center"
                mb={1}
                color={"brand.pureWhiteTxt"}
                >
                <Text p={2}> {title}</Text>
              </Popover.Title>
              <Wrap spacing="2" justifyContent={"space-between"}>
                {items.map((x) => (
                  <Button
                    key={`bte_${x.value}`}
                    variant="asLabel"
                    width={cwidth}
                    height="auto"
                    aria-label={`Select ${x.label}`}
                    onClick={() => { onClickItem?.(x.value); setOpen(false); }}
                  >
                    {x.label}
                  </Button>
                ))}
              </Wrap>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
