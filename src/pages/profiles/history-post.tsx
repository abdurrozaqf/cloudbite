import { useEffect, useState } from "react";

import { User, getUser } from "@/utils/apis/users";

import PostCardHistory from "@/components/post-card-history";
import { toast } from "@/components/ui/use-toast";
import Layout from "@/components/layout";

import { Loader2 } from "lucide-react";

const HistoryPost = () => {
  const [historyPosts, setHistoryPosts] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await getUser();
      setHistoryPosts(result.data);

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
      <div className="w-full flex flex-col gap-8 items-center">
        {isLoading ? (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Loading</p>
          </div>
        ) : (
          <>
            {historyPosts?.posts == null ? (
              "No History Posts"
            ) : (
              <>
                {historyPosts?.posts.map((datas) => (
                  <PostCardHistory data={datas} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default HistoryPost;
