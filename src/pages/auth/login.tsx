import LoginForm from "@/components/form/login-form";
import { Toaster } from "@/components/ui/toaster";

const Login = () => {
  return (
    <div className="w-full h-screen flex flex-col font-inter transition-all overflow-auto">
      <div className="grow overflow-auto flex flex-col items-center justify-center p-6">
        <div className="container w-full md:w-[34.75rem] h-full md:h-fit p-8 md:p-14 lg:py-20 lg:px-14 flex flex-col items-center justify-center bg-white dark:bg-black/25 dark:border rounded-md border shadow">
          <h1 className="text-5xl tracking-tight mb-16">
            <span className="font-bold">Cloud</span>
            <span className="text-[#6224C3] font-black">bite</span>
          </h1>
          <p className="font-inter text-center text-3xl font-semibold mb-2">
            Login
          </p>
          <p className="text-[#ABABAB] dark:text-white text-base font-normal mb-10">
            Sign in to continue
          </p>
          <LoginForm />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
