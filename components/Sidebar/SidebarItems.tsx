import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaUserFriends } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import Link from 'next/link';

const items = [
  {
    name: 'Home',
    href: '/feed',
    icon: <FaHome color='white' size={25} />,
  },
  {
    name: 'Post',
    href: '/post',
    icon: <FaPen size={20} />,
  },
  {
    name: 'Friends',
    href: '/friends',
    icon: <FaUserFriends size={25} />,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: <FaRegUser size={25} />,
  },
];

const SidebarItems = () => {
  return (
    <div className="col-span-2 px-5 relative border-r border-neutral-800">
      <div className="mt-20 ms-auto w-4/6">
        {items.map((item) => {
          return (
            <div className="grid grid-cols-4 gap-4 mb-10 text-slate-50">
              <div className="flex col-span-1 items-center"> {item.icon}</div>
              <Link
                className="scroll-m-20 text-xl font-medium tracking-tight"
                href={item.href}
              >
                {item.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarItems;
