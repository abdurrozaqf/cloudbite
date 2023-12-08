import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { CustomFormField } from "@/components/CustomForm";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

import { Loader2 } from "lucide-react";
import {
  DetailPost,
  PostPayloadSchema,
  editPosts,
  getDetailPosts,
} from "@/utils/apis/posts";
import { postPayloadSchema } from "@/utils/apis/posts/types";

interface Props {
  post_id: string;
}

const EditPostForm = (props: Props) => {
  const [detailPost, setDetailPost] = useState<DetailPost>();
  const { post_id } = props;
  const { toast } = useToast();

  const form = useForm<PostPayloadSchema>({
    resolver: zodResolver(postPayloadSchema),
    defaultValues: {
      caption: detailPost?.caption ?? "",
      image: detailPost?.image ?? "",
    },
    values: {
      caption: detailPost?.caption ?? "",
      image: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, [form.formState.isSubmitSuccessful]);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState]);

  async function fetchData() {
    try {
      const result = await getDetailPosts(post_id);
      setDetailPost(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  const fileRef = form.register("image", { required: false });
  async function onSubmit(data: PostPayloadSchema) {
    try {
      const formData = new FormData();
      formData.append("caption", data.caption);
      formData.append("image", data.image[0]);

      const result = await editPosts(post_id, formData as any);
      toast({
        description: result.message,
      });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <CustomFormField
            control={form.control}
            name="caption"
            label="Caption"
          >
            {(field) => (
              <Textarea
                {...field}
                className="resize-none"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField control={form.control} name="image" label="Image">
            {() => (
              <Input
                {...fileRef}
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                className="cursor-pointer text-black/50 dark:text-white/50"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <Button
            className="mt-4"
            type="submit"
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                <p>Please wait</p>
              </>
            ) : (
              "Edit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditPostForm;
