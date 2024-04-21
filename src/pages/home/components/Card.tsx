import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

function JobCard() {
	return (
		<Card>
			<CardHeader>
				<div className="flex">
					{" "}
					<CardTitle>Card Title</CardTitle>
					<CardDescription>Card Description</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
}

export default JobCard;
