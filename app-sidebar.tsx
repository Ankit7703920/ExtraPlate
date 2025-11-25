'use client';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from './ui/sidebar';
import { Button } from './ui/button';
import { Home, Package, UtensilsCrossed, HeartHandshake, CookingPot, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/my-donations', label: 'My Donations', icon: Package },
  { href: '/my-claims', label: 'My Claims', icon: HeartHandshake },
  { href: '/bhandara', label: 'Bhandara', icon: CookingPot },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <UtensilsCrossed className="size-8 text-primary" />
          <span className="text-xl font-bold font-headline">ExtraPlate</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{
                    children: item.label,
                    className: "bg-primary font-body text-primary-foreground",
                  }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button asChild size="lg" className="m-2">
            <Link href="/donations/new">
                <PlusCircle className="mr-2" />
                Create Donation
            </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
