import { TfiBag } from "react-icons/tfi";
import { SlLocationPin } from "react-icons/sl";
import { CiGlobe } from "react-icons/ci";
import { TbDisabled2 } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ListBox from "./components/ListComp";

function JobPage() {
    return (
    <div className="flex flex-col py-8 px-8 border border-gray-300 m-8 gap-6">
        <section className="flex flex-col">
            <div className="text-lg font-bold"> Job Role Name Example</div>
            <div className="text-sm">Company Name</div>
        </section>

        <section className="grid sm:grid-cols-12 gap4 gap-y-4">

            <div className="col-span-4 flex flex-row gap-x-4">
                <TfiBag />
                <div className="flex flex-col">
                    <div className="text-gray-500">Experience</div>
                    <div>Fresher</div>
                </div>
            </div>

            <div className="col-span-4 flex flex-row gap-x-4">
                <SlLocationPin />
                <div className="flex flex-col">
                    <div className="text-gray-500">Locations</div>
                    <div>Remote</div>
                </div>
            </div>

            <div className="col-span-4 flex flex-row gap-x-4">
                <CiGlobe />
                <div className="flex flex-col">
                    <div className="text-gray-500">Website</div>
                    <div>Not Specified</div>
                </div>
            </div>

            <div className="col-span-4 flex flex-row gap-x-4">
                <TbDisabled2 />
                <div className="flex flex-col">
                    <div className="text-gray-500">Disabilities</div>
                    <div>Blindness, Low Vision</div>
                </div>
            </div>
        </section>

        <span>
            <p className="text-gray-500">Posted 6 hours ago</p>
        </span>

        <Button className="max-w-24">Apply Now</Button>
        
        <Separator />

        <span>
            <h2 className="font-medium">Job Description</h2>
        </span>

        <section className="flex flex-col gap-12">
            <ListBox />
            <ListBox />
        </section>

    </div>
    
    );
}

export default JobPage;