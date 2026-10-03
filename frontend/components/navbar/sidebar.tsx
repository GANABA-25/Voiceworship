"use client";
import { usePathname } from "next/navigation";
import ListItem from "./list-item";
import { items, serviceResources } from "@/data/navBar";
import ServiceResources from "./service-resources";
import Button from "@/components/ui/button";

import { Plus } from "lucide-react";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed w-53 top-0 left-0 z-50 shadow-sm transition-all duration-300 hidden lg:flex flex-col h-screen border-r border-border mt-16`}
    >
      <span className="p-4">
        <Button label="Create" icon={<Plus size={15} />} />
      </span>

      <div className="space-y-3 pb-4">
        {items.map((item) => (
          <ListItem
            isActive={pathname === item.href}
            key={item.href}
            label={item.label}
            icon={item.icon}
            href={item.href}
            isOpen={true}
          />
        ))}
      </div>

      <div className="space-y-2 py-4 border-t border-border">
        <h1 className="px-4 text-muted uppercase">Service Resources</h1>
        <div>
          {serviceResources.map((resource) => (
            <ServiceResources
              key={resource.label}
              label={resource.label}
              icon={resource.icon}
              item={resource.item}
              number={resource.number}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
