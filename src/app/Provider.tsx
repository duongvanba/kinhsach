'use client'

import { ChakraProvider, Container } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const Provider = (props: PropsWithChildren) => {

 
    return (
        <ChakraProvider>
            <Container
                size='5xl'
                minH='100vh'
                p='3'
            >
                {props.children}
            </Container>
        </ChakraProvider>
    )
}