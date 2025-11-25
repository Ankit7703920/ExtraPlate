import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Donation } from "@/lib/types";
import { ArrowRight, Clock, MapPin, University, Users } from "lucide-react";

type DonationCardProps = {
  donation: Donation;
};

const LeafIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M11 20A7 7 0 0 1 4 13V8a5 5 0 0 1 5-5h1" />
        <path d="M11 20v-1a4 4 0 0 0-4-4H4" />
        <path d="M13 8H8" />
        <path d="M18 20a4 4 0 0 0 4-4V8h-1a5 5 0 0 0-5 5v1" />
        <path d="M18 20v-1" />
    </svg>
)

export function DonationCard({ donation }: DonationCardProps) {
  const expiryText = donation.status === 'Expired' 
    ? 'Expired' 
    : `Expires in ${formatDistanceToNow(donation.expiry)}`;

  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            alt={donation.title}
            className="aspect-[4/3] w-full object-cover"
            height={300}
            src={donation.imageUrl}
            width={400}
            data-ai-hint={donation.imageHint}
          />
          <div className="absolute top-3 right-3 flex gap-2">
            {donation.category === 'Veg' ? (
                <Badge variant="secondary" className="bg-accent text-accent-foreground gap-1 items-center border-green-500/50">
                    <LeafIcon className="h-3 w-3" /> Veg
                </Badge>
            ) : (
                <Badge variant="destructive">Non-Veg</Badge>
            )}
            <Badge variant="outline" className="bg-card/80 backdrop-blur-sm gap-1 items-center">
              {donation.visibility === 'College' ? <University className="h-3 w-3"/> : <Users className="h-3 w-3" />}
              {donation.visibility}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{donation.distance.toFixed(1)} km away</span>
            </div>
            <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span title={donation.expiry.toLocaleString()}>{expiryText}</span>
            </div>
        </div>
        <CardTitle className="text-xl font-headline mb-2">{donation.title}</CardTitle>
        <CardDescription>{donation.description.substring(0, 100)}...</CardDescription>
        
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="font-bold text-lg text-primary">{donation.plates} Plates</div>
        <Button asChild>
          <Link href={`/donations/${donation.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
