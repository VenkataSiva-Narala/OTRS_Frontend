import { useNavigate } from "react-router-dom";

import { logout, removeToken } from "./api/authApi";

import { Home, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./mode-toggle";
import { toast } from "./ui/use-toast";

const TopBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      removeToken();
      navigate("/login", { replace: true });
    } catch (error) {
      toast({
        title: "Authentication",
        description: "Something went wrong. Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleHome = () => {
    navigate("/");
  }

  return (
    <div className="sticky top-0 backdrop-blur-md z-[50] flex justify-between items-center px-8 py-3 border-b border-zinc-500">
      <p className="text-xl font-extrabold">OTRS</p>

      <div className="flex gap-4 items-center">
        <Button className=" hover:bg-amber-700" variant="outline" size="icon">
          <Home onClick={handleHome} className="h-4 w-4 cursor-pointer " />
        </Button>
        <ModeToggle />
        <Popover>
          <PopoverTrigger asChild>
          <Button className="hover:bg-red-700" variant="outline" size="icon">
          <LogOut className="h-4 w-4 cursor-pointer" />
          </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex justify-between items-center">
              <p>Are you sure?</p>
              <Button variant={"default"} onClick={handleLogout}>
                OK
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TopBar;
