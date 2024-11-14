import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'

export const Oauth = () => {
  return (
    <div className='grid grid-cols-2 gap-4 mb-5 border-b pb-5 border-neutral-700'>
        <Button variant={'secondary'} className="flex gap-3">
          <Image
            src={'/github.png'}
            width={25}
            height={25}
            alt="githubimage"
          ></Image>
          <h4 className='scroll-m-20 text-lg font-semibold tracking-tight'>Github</h4>
        </Button>
        <Button variant={'secondary'} className="flex gap-3">
          <Image
            src={'/googlecolor.png'}
            width={25}
            height={25}
            alt="githubimage"
          ></Image>
          <h4 className='scroll-m-20 text-lg font-semibold tracking-tight'>Google</h4>
        </Button>
      </div>
  )
}

export default Oauth