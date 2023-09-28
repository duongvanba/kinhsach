"use client"

import { useColorMode, HStack, Button } from "@chakra-ui/react"
import { BiMoon, BiSolidSun } from "react-icons/bi"


export const ChangeColorMode = () => {


    const { colorMode, setColorMode } = useColorMode()


    return (
        <HStack w='full' justify='flex-end'>
            {
                colorMode == 'dark' ? (
                    <Button
                        leftIcon={<BiMoon />}
                        onClick={() => setColorMode('light')}
                        size='sm'
                    >
                        Sáng
                    </Button>
                ) : (
                    <Button
                        leftIcon={<BiSolidSun />}
                        onClick={() => setColorMode('dark')}
                        size='sm'
                    >
                        Tối
                    </Button>
                )
            }

        </HStack>
    )
}