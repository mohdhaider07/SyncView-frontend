//import { ComboboxDemo } from "./components/Combobox";
import { useEffect, useState } from "react";
import JobCard from "./components/Card";
import SelectButton from "./components/SelectButton";
import axios from "axios";

const disabilityTypes: string[] = [
	"Blindness",
	"Low Vision",
	"Leprosy Cured Persons",
	"Locomotor Disability",
	"Dwarfism",
	"Intellectual Disability",
	"Mental Illness",
	"Cerebral Palsy",
	"Specific Learning Disabilities",
	"Speech and Language Disability",
	"Hearing Impairment (Deaf and Hard of Hearing)",
	"Muscular Dystrophy",
	"Acid Attack Victim",
	"Parkinson's Disease",
	"Multiple Sclerosis",
	"Thalassemia",
	"Hemophilia",
	"Sickle Cell Disease",
	"Autism Spectrum Disorder",
	"Chronic Neurological Conditions",
	"Multiple Disabilities including Deaf Blindness",
	"Down Syndrome",
	"Epilepsy",
	"Spinal Cord Injury",
	"Others",
];

const locationOptions = ["Location Based", "Hybrid", "Remote"];

function Home() {
	const [allJobs, setAllJobs] = useState([]);
	const [selectedDisability, setSelectedDisability] = useState<
		string | undefined
	>();
	// selectedLocation Type
	const [selectedLocation, setSelectedLocation] = useState<
		string | undefined
	>();

	const getAllJobs = async (
		selectedDisability: string | undefined,
		selectedLocation: string | undefined
	) => {
		try {
			let url = "http://localhost:5000/job";
			if (selectedDisability !== undefined) {
				url += `?disability=${selectedDisability}`;
			}
			if (selectedLocation !== undefined) {
				url += `?location=${selectedLocation}`;
			}
			const response = await axios.get(url);
			console.log(response.data);
			setAllJobs(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	// useeffec and call the funtion

	useEffect(() => {
		getAllJobs(selectedDisability, selectedLocation);
	}, [selectedDisability, selectedLocation]);

	console.log("getJobs", allJobs);
	return (
		<div>
			{/* header */}

			{/* Combobox */}
			<div className="grid grid-cols-3 gap-4 mx-8 my-8 sm:grid-cols-5">
				<SelectButton
					placeholder="All Disability"
					setSelectedOption={setSelectedDisability}
					options={disabilityTypes}
				/>
				{/* <SelectButton
					placeholder="All Types"
					setSelectedOption={setSelectedLocation}
					options={locationOptions}
				/> */}
				{/* <SelectButton />
				<SelectButton />
				<SelectButton />
				<SelectButton /> */}
			</div>

			{/* Job Cards */}
			{allJobs.length > 0 ? (
				<div>
					{allJobs.map((job, index) => (
						<JobCard key={index} job={job} />
					))}
				</div>
			) : (
				<div>No Jobs Found</div>
			)}
		</div>
	);
}

export default Home;
