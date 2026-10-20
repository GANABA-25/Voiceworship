"use client";

import { usePathname } from "next/navigation";
import ListItem from "./list-item";
import { items, serviceResources } from "@/data/navBar";
import ServiceResources from "./service-resources";
import Button from "@/components/ui/button";
import { useAuth } from "@/store/auth-context";

import { Plus } from "lucide-react";

export default function SideBar() {
  const { logout } = useAuth();
  const pathname = usePathname();

  return (
    <aside className="fixed top-16 bottom-0 left-0 z-50 hidden w-60 flex-col border-r border-border bg-card shadow-sm transition-all duration-300 lg:flex">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <span className="block p-4">
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
            />
          ))}
        </div>

        <div className="space-y-2 border-t border-border py-4">
          <h1 className="px-4 uppercase text-muted">Service Resources</h1>
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
      </div>

      <div className="border-t border-border p-4">
        <Button onClick={logout} label="Log out" />
      </div>
    </aside>
  );
}
