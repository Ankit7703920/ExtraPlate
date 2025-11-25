'use client';
import Image from "next/image";
import { useState } from "react";
import { format } from 'date-fns';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { donations } from "@/lib/data";
import { Check, CheckCircle, Clock, HeartHandshake, MapPin, University, Users, Utensils, AlertTriangle } from "lucide-react";

const LeafIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M11 20A7 7 0 0 1 4 13V8a5 5 0 0 1 5-5h1" /><path d="M11 20v-1a4 4 0 0 0-4-4H4" /><path d="M13 8H8" /><path d="M18 20a4 4 0 0 0 4-4V8h-1a5 5 0 0 0-5 5v1" /><path d="M18 20v-1" />
    </svg>
)

export default function DonationDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const [isClaimed, setIsClaimed] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const donation = donations.find(d => d.id === params.id);

  if (!donation) {
    return <div className="text-center py-12">Donation not found.</div>;
  }

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      setIsClaiming(false);
      setIsClaimed(true);
      toast({
        title: "Donation Claimed!",
        description: `You have claimed "${donation.title}". Please coordinate pickup with the donor.`,
        variant: 'default',
        className: 'bg-accent text-accent-foreground border-green-500/50',
      });
    }, 1500);
  };

  const userInitials = donation.donor.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <Card className="overflow-hidden shadow-lg">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-video md:aspect-square">
            <Image
              alt={donation.title}
              src={donation.imageUrl}
              fill
              className="object-cover"
              data-ai-hint={donation.imageHint}
            />
            <div className="absolute top-4 right-4 flex gap-2">
               {donation.category === 'Veg' ? (
                <Badge variant="secondary" className="bg-accent text-accent-foreground gap-1 items-center border-green-500/50">
                    <LeafIcon className="h-3 w-3" /> Veg
                </Badge>
                ) : (
                    <Badge variant="destructive">Non-Veg</Badge>
                )}
            </div>
          </div>
          <div className="flex flex-col p-6">
            <h1 className="text-3xl font-bold font-headline mb-2">{donation.title}</h1>
            <div className="text-muted-foreground mb-4">
              Posted on {format(donation.createdAt, 'PPp')}
            </div>
            <p className="text-lg mb-6 flex-grow">{donation.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="flex items-center gap-2"><Utensils className="h-5 w-5 text-primary" /> <strong>{donation.plates} Plates</strong></div>
                <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Expires {format(donation.expiry, 'p, PP')}</div>
                <div className="flex items-center gap-2 col-span-2"><MapPin className="h-5 w-5 text-primary" /> {donation.location.address}</div>
                <div className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Visible to {donation.visibility}</div>
            </div>

            <Card className="mb-6 bg-secondary/50">
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                    <Avatar className="h-12 w-12">
                         <AvatarImage src={donation.donor.avatarUrl} alt={donation.donor.name} data-ai-hint={donation.donor.imageHint} />
                        <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-base">Donated by {donation.donor.name}</CardTitle>
                    </div>
                </CardHeader>
            </Card>

            <div className="mt-auto flex flex-col sm:flex-row gap-2">
                <Button 
                    size="lg" 
                    className="flex-1 transition-all duration-300" 
                    onClick={handleClaim}
                    disabled={isClaiming || isClaimed || donation.status !== 'Available'}
                >
                    {isClaiming ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                            Claiming...
                        </>
                    ) : isClaimed || donation.status === 'Claimed' ? (
                        <>
                            <CheckCircle className="mr-2" />
                            Claimed
                        </>
                    ) : donation.status === 'Expired' ? (
                        'Expired'
                    ) : (
                        <>
                           <HeartHandshake className="mr-2" />
                           Claim Now
                        </>
                    )}
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Report Post
                </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
