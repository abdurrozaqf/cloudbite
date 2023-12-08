import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { User, getUser } from "@/utils/apis/users";
import { useToken } from "@/utils/contexts/token";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

import { Loader2 } from "lucide-react";

const Profie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<User>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useToken();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await getUser();
      setProfile(result.data);

      setIsLoading(false);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }
  return (
    <Layout>
      <div className="h-full flex flex-col items-center justify-center space-y-5">
        {isLoading ? (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Loading</p>
          </div>
        ) : (
          <>
            <div className="flex w-full md:w-2/3 lg:w-1/2 justify-between">
              <h1 className="text-4xl font-semibold">Profile</h1>
              <img src={user.image} alt="" className="rounded-full w-24 h-24" />
            </div>
            <div className="w-full md:w-2/3 lg:w-1/2">
              <p className="font-semibold dark:font-normal tracking-wide mb-2">
                Full Name
              </p>
              <div className="px-4 py-2 border border-slate-300 dark:border-white/30 rounded-md">
                <p>{profile?.name}</p>
              </div>
            </div>
            <div className="w-full md:w-2/3 lg:w-1/2">
              <p className="font-semibold dark:font-normal tracking-wide mb-2">
                Email
              </p>
              <div className="px-4 py-2 border border-slate-300 dark:border-white/30 rounded-md">
                <p>{profile?.email}</p>
              </div>
            </div>
            <div className="w-full md:w-2/3 lg:w-1/2">
              <Button
                className="bg-white text-black border h-fit hover:bg-gray-200 hover:text-black shadow-md"
                onClick={() => navigate("/edit-profile")}
              >
                Edit
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profie;
