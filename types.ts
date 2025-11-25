export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  imageHint: string;
  collegeId?: string;
};

export type Donation = {
  id: string;
  title: string;
  description: string;
  plates: number;
  imageUrl: string;
  imageHint: string;
  category: 'Veg' | 'Non-Veg';
  distance: number;
  location: {
    address: string;
  };
  expiry: Date;
  visibility: 'Public' | 'College';
  donor: User;
  status: 'Available' | 'Claimed' | 'Expired';
  createdAt: Date;
};

export type Bhandara = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  location: {
    address: string;
  };
  startTime: Date;
  endTime: Date;
  organizer: User;
  distance: number;
};

export type Claim = {
  id:string;
  donation: Donation;
  user: User;
  claimedAt: Date;
  status: 'Pending' | 'Picked Up';
};
