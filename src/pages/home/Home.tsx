//import { ComboboxDemo } from "./components/Combobox";
import { useEffect, useState } from "react";
import JobCard from "./components/Card";
import SelectButton from "./components/SelectButton";
import axios from "axios";
// import ChatBot from "@/lib/ChatBot";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import alanBtn from "@alan-ai/alan-sdk-web";
import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

interface JobInterface {
  _id: string;
  role: string;
  company: string;
  location: string;
  applyLink: string;
  disabilityTypes: string;
  description: string;
}

function Home() {
  const [allJobs, setAllJobs] = useState<JobInterface[]>([]);
  // isLoading
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDisability, setSelectedDisability] = useState<
    string | undefined
  >();
  // selectedLocation Type
  const [selectedLocation, setSelectedLocation] = useState<
    string | undefined
  >();

  // highlight job id
  const [highlightedJobId, setHighlightedJobId] = useState<
    string | undefined
  >();

  const [cities, setCities] = useState<string[]>([]);
  const [city, setCity] = useState<string | undefined>();

  const [search, setSearch] = useState<string>("");
  // page for pagination
  const [page, setPage] = useState<number>(1);

  // pages for pagination
  const [pages, setPages] = useState<number>(0);

  // get all jobs
  const [companies, setCompanies] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>();
  const getAllJobs = async (
    selectedDisability: string | undefined,
    selectedLocation: string | undefined,
    city: string | undefined,
    selectedCompany: string | undefined,
    page: number
  ) => {
    setIsLoading(true);
    try {
      let url = "https://empower-sphere.onrender.com/job";
      // let url = "http://localhost:5000/job";
      if (selectedDisability !== undefined) {
        url += `?disability=${selectedDisability}`;
      }
      if (selectedLocation !== undefined) {
        url += `?location=${selectedLocation}`;
      }
      if (city !== undefined) {
        url += `?city=${city}`;
      }
      if (selectedCompany !== undefined) {
        url += `?company=${selectedCompany}`;
      }
      if (page != undefined) {
        url += `?page=${page}`;
      }

      const { data } = await axios.get(url);
      const { jobs, pages, locations, companies } = data;

      // console.log(jobs);
      setAllJobs(jobs);
      setCities(locations);
      setCompanies(companies);
      setPages(pages);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  // useeffec and call the funtion

  useEffect(() => {
    getAllJobs(
      selectedDisability,
      selectedLocation,
      city,
      selectedCompany,
      page
    );
  }, [selectedDisability, selectedLocation, city, selectedCompany, page]);

  // console.log("getJobs", allJobs);

  useEffect(() => {
    alanBtn({
      key: "afa391bb7d18991ed3bd3f7fd5bc94392e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        // @ts-ignore
        if (commandData?.command == "highlight") {
          // console.log("highlighting");
          // @ts-ignore
          setHighlightedJobId(commandData?.job._id);
          // const job = allJobs.find((job) => job.title === commandData.title);
          // console.log("job", job);
          // if (job) {
          // 	window.location.href = `/job/${job.id}`;
          // }
        }
        // @ts-ignore
        if (commandData?.command == "open") {
          // console.log("opeing");
          // @ts-ignore
          const link = commandData.link;
          console.log("link", link);
          if (link) {
            window.location.href = link;
          }
        }
        // @ts-ignore
        if (commandData?.command == "getData") {
          // @ts-ignore
          const { jobs, companies, locations, page } = commandData;
          console.log("jobs", jobs);
          console.log("page", page);
          console.log("companies", companies);
          console.log("locations", locations);
          setAllJobs(jobs);
          setCompanies(companies);
          setPage(page);
          setCities(locations);
        }
      },
    });
  }, []);
  return (
    <>
      {/* <ChatBot /> */}
      <div>
        <div className="flex items-center justify-center w-full">
          <img className="object-cover w-full" src="findJob.png" />
        </div>
        <div className="flex flex-col px-12 m-16">
          {/* header */}

          {/* Combobox */}
          <h6 className="mx-auto mb-8 text-3xl font-bold">
            150+ Jobs for you to explore
          </h6>
          {/* <h4 className="mx-8 text-lg text-gray-500">
					Filter by Job type, state, location, company or disability type
				</h4> */}
          <div className="grid grid-cols-3 gap-4 mx-8 my-6 sm:grid-cols-5">
            <SelectButton
              placeholder="All Disability"
              setSelectedOption={setSelectedDisability}
              options={disabilityTypes}
            />
            <SelectButton
              placeholder="All Cities"
              setSelectedOption={setCity}
              options={cities}
            />
            <SelectButton
              placeholder="All Companies"
              setSelectedOption={setSelectedCompany}
              options={companies}
            />
            <SelectButton
              placeholder="All Types"
              setSelectedOption={setSelectedLocation}
              options={locationOptions}
            />

            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search..."
            />

            {/* <SelectButton />
				<SelectButton />
				<SelectButton />
				<SelectButton /> */}
          </div>

          {/* Job Cards */}
          {allJobs.length > 0 && !isLoading ? (
            <div>
              {allJobs.map((job, index) => (
                <JobCard
                  key={index}
                  highlighted={highlightedJobId === job._id}
                  job={job}
                />
              ))}
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center text-3xl">
              {"Loading..."}
            </div>
          ) : (
            <div className="flex items-center justify-center text-2xl text-gray-300">
              {"No Jobs Found"}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center mb-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={` ${page != 1 && " cursor-pointer "}`}
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                    }
                  }}
                />
              </PaginationItem>

              {
                // pages is of number is number in 5 then run map on pages for 5 times
                Array.from({ length: pages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      className={`cursor-pointer ${
                        page === i + 1 ? "bg-teal-100" : ""
                      }`}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))
              }

              <PaginationItem>
                <PaginationNext
                  className={` ${page < pages && " cursor-pointer "}`}
                  onClick={() => {
                    if (page < pages) {
                      setPage(page - 1);
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}

export default Home;
