import Image from 'next/image';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import type { Bhandara } from '@/lib/types';
import { MapPin, Clock } from 'lucide-react';

type EventCardProps = {
  event: Bhandara;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-1 relative aspect-video md:aspect-auto">
          <Image
            alt={event.title}
            className="w-full h-full object-cover"
            src={event.imageUrl}
            fill
            data-ai-hint={event.imageHint}
          />
        </div>
        <div className="md:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
            <CardDescription>{event.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{event.location.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{format(event.startTime, 'EEE, MMM d, p')}</span>
            </div>
             <div className="flex items-center gap-2">
              <div className='w-4 h-4' />
              <span>{event.distance.toFixed(1)} km away</span>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
