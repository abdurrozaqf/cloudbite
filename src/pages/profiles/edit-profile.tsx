import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useToken } from "@/utils/contexts/token";

import { CustomFormField } from "@/components/CustomForm";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout";
import Alert from "@/components/alert";

import {
  User,
  getUser,
  deleteUser,
  updateUser,
  UpdateUserSchema,
  updateUserSchema,
} from "@/utils/apis/users";
import { Loader2 } from "lucide-react";

const EditProfile = () => {
  const [profile, setProfile] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const { changeToken, user } = useToken();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: profile?.name! ?? "",
      email: profile?.email! ?? "",
      password: profile?.password! ?? "",
      image: profile?.image! ?? "",
    },
    values: {
      name: profile?.name!,
      email: profile?.email!,
      password: "",
      image: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, [form.formState.isSubmitSuccessful]);

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

  const fileRef = form.register("image", { required: false });
  async function onSubmit(data: UpdateUserSchema) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("image", data.image[0]);

      const result = await updateUser(formData as any);
      toast({ description: result.message });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  async function handleDeleteProfile() {
    try {
      const result = await deleteUser();
      toast({ description: result.message });
      changeToken();

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
    <Layout>
      <div className="h-full flex flex-col items-center justify-center gap-5">
        {isLoading ? (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Loading</p>
          </div>
        ) : (
          <>
            <div className="flex w-full md:w-2/3 lg:w-1/2 justify-between">
              <h1 className="text-4xl font-semibold">Edit Profile</h1>
              <img src={user.image} alt="" className="rounded-full w-24 h-24" />
            </div>
            <Form {...form}>
              <form
                className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <CustomFormField
                  control={form.control}
                  name="name"
                  label="Full Name"
                >
                  {(field) => (
                    <Input
                      {...field}
                      placeholder={profile?.name}
                      type="text"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                    />
                  )}
                </CustomFormField>
                <CustomFormField
                  control={form.control}
                  name="image"
                  label="Profile Picture"
                >
                  {() => (
                    <Input
                      {...fileRef}
                      type="file"
                      accept="image/jpg, image/jpeg, image/png"
                      className="cursor-pointer"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                    />
                  )}
                </CustomFormField>
                <CustomFormField
                  control={form.control}
                  name="email"
                  label="Email"
                >
                  {(field) => (
                    <Input
                      {...field}
                      placeholder={profile?.email}
                      type="email"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                    />
                  )}
                </CustomFormField>
                <CustomFormField
                  control={form.control}
                  name="password"
                  label="Password"
                >
                  {(field) => (
                    <Input
                      {...field}
                      placeholder={profile?.password}
                      type="password"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                    />
                  )}
                </CustomFormField>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-6">
                    <Button
                      className="bg-white text-black border h-fit hover:bg-gray-200 hover:text-black shadow-md"
                      type="button"
                      onClick={() => navigate("/profile")}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="h-fit border shadow-md"
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Please wait
                        </>
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                  <Button
                    className="bg-white text-black border h-fit hover:bg-gray-200 hover:text-black border-red-500 shadow-md"
                    type="button"
                  >
                    <Alert
                      title="Are you absolutely sure?"
                      description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                      onAction={handleDeleteProfile}
                    >
                      <p className="text-red-500">Delete Account</p>
                    </Alert>
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </div>
    </Layout>
  );
};

export default EditProfile;
