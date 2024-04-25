import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
interface Job {
	role: string;
	company: string;
	location?: string; // Optional property
	applyLink: string;
	disabilityTypes?: string; // Optional property
	description: string;
}
function JobCard({ job }: { job: Job }) {
	console.log("job", job);
	return (
		<Card className="grid gap-4 mx-8 my-4 sm:grid-cols-12">
			<CardHeader className="sm:col-span-3">
				<div>
					<CardTitle>{job.role}</CardTitle>
					<CardDescription>{job.company}</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="flex items-center justify-center sm:col-span-6">
				<p>{job.location}</p>
			</CardContent>

			<div className="flex items-center justify-end px-4 sm:col-span-3">
				<Link to={job.applyLink} target="_blank">
					<Button variant="outline">Apply</Button>
				</Link>
			</div>
		</Card>
	);
}

export default JobCard;
