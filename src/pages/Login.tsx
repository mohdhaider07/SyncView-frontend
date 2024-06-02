import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { publicRequest } from "@/requestMethods";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast();
  const { setAuthState, authState } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const fields = [
    {
      label: "Email",
      id: "email",
      type: "email",
      placeholder: "Email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
    },
    {
      label: "Password",
      id: "password",
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
    },
  ];

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    if (!email || !password) {
      toast({
        title: "Empty Fields",
        description: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await publicRequest.post("/user/login", {
        email,
        password,
      });
      console.log(data);
      toast({
        title: "login Successfuly",
        variant: "default",
      });
      setIsLoading(false);
      setAuthState(data);
      navigate("/");
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      toast({
        title: "error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };
  // useEffect detect auth state then redirect to home if user is logged in
  useEffect(() => {
    if (authState) {
      navigate("/");
    }
  }, [authState]);

  return (
    <div className="bg-background text-primary">
      <div className="flex items-center justify-center h-screen">
        <div className="p-6 bg-white rounded-lg w-96">
          <h1 className="text-2xl text-center">Login</h1>
          <form onSubmit={handleSumbit} className="mt-4 space-y-4">
            {fields.map((field, index) => (
              <div key={index}>
                <label htmlFor={field.id} className="font-medium text-sm">
                  {field.label}
                </label>
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  className="w-full p-2 rounded-lg"
                />
              </div>
            ))}
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
