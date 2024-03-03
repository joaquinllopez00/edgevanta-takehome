"use client";
import Link from "next/link";

import type { MenuItem } from "./index";

interface SidebarMenuItemProps {
  item: MenuItem;
  selected: boolean;
  setSelected: (item: MenuItem) => void;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ item, selected, setSelected }) => {
  return (
    <Link
      href={item.src}
      className={`hover:bg-gray-300 ${selected && "bg-gray-300"} rounded-md p-3`}
      onClick={() => setSelected(item)}
    >
      {item.title}
    </Link>
  );
};
