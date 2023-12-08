import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Register, RegisterSchema, registerSchema } from "@/utils/apis/auth";

import { CustomFormField } from "@/components/CustomForm";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

import { Loader2 } from "lucide-react";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
    },
  });

  async function onSubmit(data: RegisterSchema) {
    try {
      const result = await Register(data);
      toast({ description: result.message });

      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CustomFormField control={form.control} name="name" label="Full Name">
          {(field) => (
            <Input
              {...field}
              placeholder="Full Name"
              type="text"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
            />
          )}
        </CustomFormField>
        <CustomFormField control={form.control} name="email" label="Email">
          {(field) => (
            <Input
              {...field}
              placeholder="name@mail.com"
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
              placeholder="Password"
              type="password"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
            />
          )}
        </CustomFormField>
        <CustomFormField
          control={form.control}
          name="repassword"
          label="Confirm Password"
        >
          {(field) => (
            <Input
              {...field}
              placeholder="Confirm Password"
              type="password"
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="text-center text-sm text-gray-600 dark:text-white">
          Already a User? &nbsp;
          <Link to="/login" className="text-blue-500 hover:underline">
            Login now
          </Link>
        </p>
        <Link
          to="/"
          className="text-center text-sm text-gray-600 dark:text-white hover:text-blue-500 dark:hover:text-blue-500"
        >
          Use as Guest
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;
