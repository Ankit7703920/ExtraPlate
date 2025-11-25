import { DonationCard } from "@/components/donation-card";
import { donations, currentUser } from "@/lib/data";

export default function MyDonationsPage() {
  const myDonations = donations.filter(d => d.donor.id === currentUser.id);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">My Donations</h1>
      </div>
       {myDonations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myDonations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
            ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground bg-card rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold">You haven&apos;t made any donations yet.</h2>
          <p className="mt-2">Share your extra food to help someone in need!</p>
        </div>
      )}
    </div>
  );
}
