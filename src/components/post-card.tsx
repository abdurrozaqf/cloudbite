import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { Post, deletePosts } from "@/utils/apis/posts";
import { useToken } from "@/utils/contexts/token";

import EditPostForm from "@/components/form/edit-post-form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/dialog";
import Alert from "@/components/alert";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MessageCircle, MoreVerticalIcon } from "lucide-react";

interface Props {
  data: Post;
}

const PostCard = (props: Props) => {
  const { user, token } = useToken();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data } = props;

  async function handleDeletePost(post_id: string) {
    try {
      const result = await deletePosts(post_id);
      toast({ description: result.message });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <div className=" w-full md:w-3/4 lg:w-1/2 h-fit">
      <div className="flex bg-white dark:bg-indigo-950/20 border p-4 md:p-6 gap-2 md:gap-4 rounded-lg justify-center shadow">
        <div className="flex-none">
          <img
            src={data.user.image}
            alt={data.user.name}
            className="rounded-full w-10 h-10 md:w-12 md:h-12 object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 grow">
          <div>
            <h1 className="font-medium">{data.user.name}</h1>
            <p className=" text-neutral-500 font-light text-xs">
              {format(new Date(data.created_at), "dd MMM Y - p")}
            </p>
          </div>
          <p>{data.caption}</p>
          {data.image && (
            <img
              src={data.image}
              alt={data.image}
              className="rounded-lg w-fit"
            />
          )}
          <div className="flex gap-1 cursor-pointer w-fit hover:text-indigo-300">
            <MessageCircle
              onClick={() => navigate(`/detail-post/${data.post_id}`)}
            />
            <p>{data.comment_count}</p>
          </div>
          <hr />
          <Button
            className="h-fit justify-start italic shadow-md"
            onClick={() => navigate(`/detail-post/${data.post_id}`)}
          >
            {token ? "Add comment..." : "See comment..."}
          </Button>
        </div>
        <div>
          {token && user.user_id === data.user.user_id ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <MoreVerticalIcon className="cursor-pointer" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="mt-2 flex flex-col items-center"
                align="end"
              >
                <DropdownMenuItem asChild>
                  <CustomDialog
                    description={
                      <EditPostForm post_id={data.post_id.toString()} />
                    }
                  >
                    <p className="hover:bg-indigo-100 dark:hover:bg-white/25 rounded px-10">
                      Edit
                    </p>
                  </CustomDialog>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Alert
                    title="Are you sure delete this post?"
                    onAction={() => handleDeletePost(data.post_id.toString())}
                  >
                    <p className="hover:bg-indigo-100 dark:hover:bg-white/25 rounded px-8">
                      Delete
                    </p>
                  </Alert>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="invisible">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <MoreVerticalIcon className="cursor-pointer" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="mt-2 flex flex-col items-center"
                  align="end"
                >
                  <DropdownMenuItem asChild>
                    <CustomDialog
                      description={
                        <EditPostForm post_id={data.post_id.toString()} />
                      }
                    >
                      <p className="dark:hover:bg-white/25 rounded px-10">
                        Edit
                      </p>
                    </CustomDialog>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Alert
                      title="Are you sure delete this post?"
                      onAction={() => handleDeletePost(data.post_id.toString())}
                    >
                      <p className="dark:hover:bg-white/25 rounded px-8">
                        Delete
                      </p>
                    </Alert>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
