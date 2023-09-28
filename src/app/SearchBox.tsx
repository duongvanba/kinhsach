import { InputGroup, Input, InputRightElement, CloseButton } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { Subject, debounceTime, throttleTime } from 'rxjs'


export type SearchBox = {
  onChange?: (value: string) => void
}


export const SearchBox = (props: SearchBox) => {

  const [search, set_search] = useState<string>()

  const $ = useRef(new Subject<string>())

  useEffect(() => {
    const s = $.current.pipe(throttleTime(500)).subscribe(props.onChange)
    return () => s.unsubscribe()
  }, [])

  return (
    <InputGroup>
      <Input
        placeholder='Tìm tên kinh'
        onChange={e => {
          set_search(e.target.value)
          $.current.next(e.target.value)
          console.log(e.target.value)
        }}
        value={search}
      />
      {
        search && (
          <InputRightElement>
            <CloseButton onClick={() =>{
               set_search('')
               props.onChange?.('')
            }} />
          </InputRightElement>
        )
      }
    </InputGroup>
  )
}