'use client';

import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';


interface SidebarProps {
    title: string;
    navItems: Array<NavItems>;
}

interface NavItems {
    name: string;
    href: string;
    nestedItems?: NavItems[];
     //making nested items optional and recursive for unlimited depth
}

export default function Sidebar({ title, navItems }: SidebarProps) {
    return (
        <div className="bg-[#384859] w-64 h-screen">

            <div>{title}</div>
            {navItems.map((item) => (
                <div key={item.name}>
                    <NavItem item={item} />
                </div>
            ))}
        </div>
    );
}

function NavItem({ item, depth = 1 }: { item: NavItems, depth?: number }) {

    const paddings = ["px-1", "px-2", "px-3", "px-4"];//paddings for depths

    //useStates to manage opening and closing nested nav items
    const [visible, setVisible] = useState(false); 

    const [isOpen, setOpen] = useState(false);

    return (
        <div className={`${paddings[depth] || "px-4"}`}>
            <div className="flex justify-between py-3 hover:bg-[#979da0] rounded transition-colors border-b border-[#2D3A47]">
                <div>
                    <Link href={item.href} className="text-white">
                        {item.name}
                    </Link>
                </div>
                
                {item?.nestedItems && <span>
                    {!isOpen ? <ChevronRightIcon className="w-4 h-4" onClick={() => {
                    setVisible(!visible); 
                    setOpen(!isOpen);
                }} /> : <ChevronDownIcon className="w-4 h-4" onClick={() => {
                    setVisible(!visible); 
                    setOpen(!isOpen);
                }} />}
                </span>
                }
                
                
                
            </div>

            {item.nestedItems && visible &&//truthy for if the nav has nested nav display it
                <div>
                    {item.nestedItems.map((nestedItem) => (
                        <NavItem key={nestedItem.name} item={nestedItem} depth={depth + 1} />
                    ))}
                </div>
            }
        </div>
    );

}