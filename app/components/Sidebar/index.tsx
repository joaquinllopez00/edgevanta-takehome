"use client";
import { useState } from "react";
import { SidebarMenuItem } from "./SidebarMenuItem";
import Image from "next/image";

export type MenuItem = {
  title: string;
  src: string;
};

const menuItems: MenuItem[] = [
  { title: "Bob", src: "/messages/bob" },
  { title: "Alice", src: "/messages/alice" },
];

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState<MenuItem | null>(null);

  return (
    <aside>
      <div className="w-64 bg-gray-100 text-black h-full">
        <nav className="flex flex-col space-y-2">
          <div className="border-b border-b-gray-300 p-5">
            <Image src="/assets/webp/logo.webp" alt="Edgevanta Logo" width={50} height={50} />
          </div>
          <div className="p-5 flex flex-col gap-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.src} item={item} selected={item === selected} setSelected={setSelected} />
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};
