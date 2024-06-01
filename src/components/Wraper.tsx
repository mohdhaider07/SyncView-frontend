import { ReactNode } from "react";
import Navbar from "./Navbar";

interface WraperProps {
  children: ReactNode;
}

function Wraper({ children }: WraperProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Wraper;
