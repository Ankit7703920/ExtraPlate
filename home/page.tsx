import { DonationCard } from "@/components/donation-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { donations } from "@/lib/data";
import { ListFilter, Map } from "lucide-react";

export default function HomePage() {
  const availableDonations = donations.filter(d => d.status === 'Available');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Nearby Donations</h1>
        <div className="flex items-center gap-2">
           <Tabs defaultValue="all" className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="veg">Veg</TabsTrigger>
              <TabsTrigger value="non-veg">Non-Veg</TabsTrigger>
            </TabsList>
          </Tabs>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ListFilter className="mr-2 h-4 w-4" />
                Sort By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Distance</DropdownMenuItem>
              <DropdownMenuItem>Expiry Time</DropdownMenuItem>
              <DropdownMenuItem>Plates Count</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <Map className="mr-2 h-4 w-4" />
            Map
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {availableDonations.map((donation) => (
          <DonationCard key={donation.id} donation={donation} />
        ))}
      </div>
      {availableDonations.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <h2 className="text-2xl font-semibold">No donations nearby</h2>
          <p>Check back later or expand your search area.</p>
        </div>
      )}
    </div>
  );
}
