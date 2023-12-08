import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axiosWithConfig from "@/utils/apis/axiosWithConfig";

import { useToast } from "@/components/ui/use-toast";
import PostCard from "@/components/post-card";
import Layout from "@/components/layout";

import { Loader2 } from "lucide-react";

const ListPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPost] = useState([]);
  const { toast } = useToast();
  const params = useParams();

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await axiosWithConfig.get(
        `/posts?start=0&limit=100&keyword=${params.keyword!}`
      );
      setPost(result.data.data);

      setIsLoading(false);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, [params.keyword!]);

  return (
    <Layout>
      <div className="w-full flex flex-col items-center gap-8">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Loading</p>
          </>
        ) : (
          <>
            {posts == null ? (
              <div>
                <p>Not found</p>
              </div>
            ) : (
              <>
                {posts?.map((post, i) => (
                  <PostCard key={i} data={post} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ListPost;
