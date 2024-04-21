// import {
//     NavigationMenu,
//     NavigationMenuContent,
//     NavigationMenuIndicator,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     NavigationMenuTrigger,
//     NavigationMenuViewport,
// } from "@/components/ui/navigation-menu"
import { ComboboxDemo } from "./components/Combobox";
import JobCard from "./components/Card";


function Home() {
    return (
        <div>
            {/* header */}
            <div>
                {/* <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu> */}
            </div>

            {/* Combobox */}
            <div className="grid my-8 mx-8 sm:grid-cols-5 gap-4 grid-cols-3">
                <ComboboxDemo />
                <ComboboxDemo />
                <ComboboxDemo />
                <ComboboxDemo />
                <ComboboxDemo />
            </div>

            {/* Job Cards */}
            <div>
                <JobCard />
            </div>
        </div>
    );
}

export default Home;