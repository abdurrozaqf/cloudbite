import { ReactNode } from "react";

import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";

interface Props {
  children: ReactNode;
}

const Layout = (props: Readonly<Props>) => {
  const { children } = props;

  return (
    <div className="w-full h-screen flex flex-col font-inter transition-all overflow-auto">
      <Navbar />
      <div className="grow overflow-auto flex flex-col p-6">{children}</div>
      <Toaster />
    </div>
  );
};

export default Layout;
