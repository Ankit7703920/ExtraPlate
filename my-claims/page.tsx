import { DonationCard } from "@/components/donation-card";
import { claims, currentUser } from "@/lib/data";

export default function MyClaimsPage() {
  const myClaims = claims.filter(c => c.user.id === currentUser.id);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">My Claims</h1>
      </div>
      {myClaims.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myClaims.map((claim) => (
                <DonationCard key={claim.id} donation={claim.donation} />
            ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground bg-card rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold">You haven&apos;t claimed any donations.</h2>
          <p className="mt-2">Browse nearby donations to find your next meal.</p>
        </div>
      )}
    </div>
  );
}
