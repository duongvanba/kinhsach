

import type { Metadata } from 'next'
import * as React from 'react'
import { Box, ChakraProvider, Container, useColorMode } from '@chakra-ui/react'
import { Provider } from './Provider'



export const metadata: Metadata = {
  title: 'Học kinh online'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
