"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { SidebarMenuItem } from "./SidebarMenuItem";
import { MenuItemsFixture } from "./fixture/MenuItemsFixture";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type MenuItem = {
  title: string;
  src: string;
};

export const Sidebar = () => {
  const [open, setOpen] = useState(true); // TODO: Implement open/close sidebar
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const pathname = usePathname();
  const usernameFromPath = pathname.split("/").pop() || "";
  const selectedItem = MenuItemsFixture.find((item) => item.title.toLowerCase() === usernameFromPath.toLowerCase());

  useEffect(() => {
    if (selectedItem) {
      setSelected(selectedItem);
    }
  }, [selectedItem]);

  return (
    <aside>
      <div className="w-64 bg-gray-100 text-black h-full">
        <nav className="flex flex-col space-y-2">
          <div className="border-b border-b-gray-300 p-5">
            <Link href="/" onClick={() => setSelected(null)}>
              <div className="flex gap-3 items-center">
                <Image src="/assets/webp/logo.webp" alt="Edgevanta Logo" width={50} height={50} />
                <h5>Joaquin Takehome</h5>
              </div>
            </Link>
          </div>
          <div className="p-5 flex flex-col gap-2">
            {MenuItemsFixture.map((item) => (
              <SidebarMenuItem key={item.src} item={item} selected={item === selected} setSelected={setSelected} />
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};
