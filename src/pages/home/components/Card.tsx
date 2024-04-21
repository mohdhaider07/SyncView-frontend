import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

function JobCard() {
    return (
        <Card className="grid mx-8 my-4 gap-4 sm:grid-cols-12">
            <CardHeader className="sm:col-span-3">
                <div>
                    <CardTitle >Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex sm:col-span-6 justify-center items-center">
                <p>Card Content</p>
            </CardContent>

            <div className="flex sm:col-span-3 items-center justify-end px-4">
                <Button variant="outline">
                  Apply
                    </Button>
            </div>


        </Card>
    );
}

export default JobCard;
