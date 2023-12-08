import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useTheme } from "@/utils/contexts/theme-provider";
import { useToken } from "@/utils/contexts/token";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

import { ChevronDown, Search } from "lucide-react";

const Navbar = () => {
  const [keywords, setKeywords] = useState("");
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { changeToken, user, token } = useToken();

  function handleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  function handleLogout() {
    changeToken();
    toast({
      description: "Logout Successfully",
    });
  }

  return (
    <header className="w-full sticky top-0">
      <nav className="flex py-4 px-6 xl:px-32 items-center justify-between mx-auto shadow-md dark:shadow-white/5">
        <Link to="/">
          <h1 className="md:text-xl lg:text-3xl tracking-tight">
            <span className="font-bold">Cloud</span>
            <span className="text-[#6224C3] font-black">bite</span>
          </h1>
        </Link>
        <form className="w-1/2">
          <div className="flex border rounded-full p-1 lg:p-2 shadow shadow-border items-center">
            <Button
              type="submit"
              disabled={keywords === ""}
              onClick={() => {
                navigate(`/list-post/${keywords}`);
              }}
              className="h-fit w-fit rounded-full p-2 mr-2 lg:mr-4"
            >
              <Search className="w-3 h-3 lg:w-full lg:h-full" />
            </Button>
            <input
              type="text"
              required
              placeholder="Search for posts here..."
              onChange={(e) => setKeywords(e.target.value)}
              className="rounded-full py-1 px-2 outline-none bg-transparent text-sm lg:text-base placeholder:italic w-full lg:placeholder:text-sm placeholder:text-[0.6rem]"
            />
          </div>
        </form>
        <div className="flex items-center md:gap-0 lg:gap-3 border rounded-full py-0 md:py-1 px-1 lg:px-2 shadow shadow-border bg-gradient-to-r from-indigo-600 to-indigo-400 text-white">
          <Avatar className="w-[28px] h-[28px] md:w-[30px] md:h-[30px] lg:w-[45px] lg:h-[45px]">
            <AvatarImage src={user.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="hidden md:hidden lg:block">
            <h1 className="font-medium leading-none mb-1 truncate">
              {user.name || "Guest"}
            </h1>
            <p className="text-xs font-light leading-none">
              {user.email || ""}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="h-full p-1 lg:p-3 cursor-pointer">
                <ChevronDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2" align="end">
              {token && (
                <>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/edit-profile")}>
                    Edit profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/history-post")}>
                    My post
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleTheme()}>
                Change theme
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {!token && (
                <DropdownMenuItem onClick={() => navigate("/login")}>
                  Login
                </DropdownMenuItem>
              )}
              {token && (
                <DropdownMenuItem onClick={() => handleLogout()}>
                  Logout
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
