import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { bhandaras } from "@/lib/data";
import { PlusCircle } from "lucide-react";


export default function BhandaraPage() {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Nearby Bhandara</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Post an Event
                </Button>
            </div>
            <div className="space-y-6">
                {bhandaras.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
             {bhandaras.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                <h2 className="text-2xl font-semibold">No Bhandara Events Nearby</h2>
                <p>Check back later or consider organizing one!</p>
                </div>
            )}
        </div>
    )
}
