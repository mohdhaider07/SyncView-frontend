//import { ComboboxDemo } from "./components/Combobox";
import JobCard from "./components/Card";
import SelectButton from "./components/Select";

function Home() {
    return (
        <div>
            {/* header */}
        
            {/* Combobox */}
            <div className="grid my-8 mx-8 sm:grid-cols-5 gap-4 grid-cols-3">
                <SelectButton />
                <SelectButton />
                <SelectButton />
                <SelectButton />
                <SelectButton />
            </div>

            {/* Job Cards */}
            <div>
                <JobCard />
            </div>
        </div>
    );
}

export default Home;