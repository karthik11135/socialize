import { Spotlight } from '@/components/ui/Spotlight';
import { MdOutlinePostAdd } from 'react-icons/md';
import { HiMiniArrowUturnLeft } from 'react-icons/hi2';
import { CiHeart } from 'react-icons/ci';
import { CiSearch } from 'react-icons/ci';
import { RxAvatar } from 'react-icons/rx';
import { MdOutlineModeComment } from 'react-icons/md';
import Link from 'next/link';
import { GoLink } from "react-icons/go";


export default function Home() {
  return (
    <div className="w-4/6 mx-auto">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-5"
        fill="rgb(168 162 158)"
      />
      <h1 className="bg-clip-text text-center text-transparent bg-gradient-to-r mt-40 from-zinc-50 to-zinc-600 text-4xl font-extrabold tracking-tight lg:text-7xl">
        Welcome to Socialize
      </h1>
      <p className="bg-clip-text text-lg text-center font-light text-transparent bg-gradient-to-br my-5 from-slate-50 to-slate-800">
        This is a social media application that I built to improve my skills
      </p>
      <Link
        target="_blank"
        href="https://github.com/karthik11135/socialize"
        className="bg-clip-text flex items-center mx-auto w-fit space-x-2 underline font-medium text-transparent bg-gradient-to-br my-5 from-slate-50 to-slate-800"
      >
       <p> Github link </p><GoLink color="rgb(168 162 158)" className='inline space-x-2' />
      </Link>
      <ul className="border text-transparent shadow shadow-zinc-700 bg-clip-text bg-gradient-to-br from-slate-50 to-neutral-700 border-neutral-700 rounded-md w-fit mx-auto px-5 py-4 my-10">
        <p className="font-bold mb-4">Features</p>
        <li className="flex text-sm my-1 items-center gap-2">
          <span>
            <MdOutlinePostAdd size={16} color="white" />
          </span>
          <p>Posts with photos</p>
        </li>
        <li className="flex text-sm my-1 items-center gap-2">
          <span>
            <RxAvatar size={16} color="cyan" />
          </span>
          <p>Profile pics for users</p>
        </li>
        <li className="flex text-sm my-1 items-center gap-2">
          <span>
            <HiMiniArrowUturnLeft size={16} color="green" />
          </span>
          <p>Reposting others posts</p>
        </li>
        <li className="flex text-sm my-1 items-center gap-2">
          <span>
            <CiHeart size={16} color="red" />
          </span>
          <p>Like posts</p>
        </li>
        <li className="flex text-sm my-1 items-center gap-2">
          <span>
            <MdOutlineModeComment size={16} color="purple" />
          </span>
          <p>Comment on posts</p>
        </li>
        <li className="flex text-sm my-1 items-center gap-2">
          <span>
            <CiSearch size={16} color="brown" />
          </span>
          <p>Search posts</p>
        </li>
      </ul>
    </div>
  );
}
