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
            <div>
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