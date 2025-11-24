import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currentUser } from "@/lib/data";
import { User, Mail, University } from "lucide-react";


export default function ProfilePage() {
    const userInitials = currentUser.name.split(' ').map(n => n[0]).join('');

    return (
        <div className="container mx-auto max-w-2xl py-8">
            <Card className="shadow-lg">
                <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint={currentUser.imageHint}/>
                        <AvatarFallback className="text-3xl">{userInitials}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl font-headline">{currentUser.name}</CardTitle>
                    <CardDescription>{currentUser.email}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input id="name" defaultValue={currentUser.name} className="pl-10" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                             <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input id="email" type="email" defaultValue={currentUser.email} disabled className="pl-10"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="collegeId">College ID</Label>
                             <div className="relative">
                                <University className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input id="collegeId" defaultValue={currentUser.collegeId || ''} placeholder="e.g., C12345" className="pl-10" />
                            </div>
                            <p className="text-xs text-muted-foreground">Optional. Add your college ID to join college-only sharing groups.</p>
                        </div>
                        <Button type="submit" className="w-full">Save Changes</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
