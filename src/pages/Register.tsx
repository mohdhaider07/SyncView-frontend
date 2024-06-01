import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { publicRequest } from "@/requestMethods";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { authState } = useAuth();
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
      label: "Username",
      id: "username",
      type: "text",
      placeholder: "Username",
      value: username,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value),
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
    {
      label: "Confirm Password",
      id: "passwordConfirm",
      type: "password",
      placeholder: "Confirm Password",
      value: passwordConfirm,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPasswordConfirm(e.target.value),
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !username || !passwordConfirm) {
      toast({
        title: "Empty Fields",
        description: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    }
    if (password !== passwordConfirm) {
      toast({
        title: "Password does not match",
        description: "Please enter the same password",
        variant: "destructive",
      });
      return;
    }
    try {
      const { data } = await publicRequest.post("/user/register", {
        username,
        email,
        password,
      });
      console.log(data);
      toast({
        title: "Registered Successfuly",
        variant: "default",
      });
      navigate("/login");
    } catch (error: any) {
      console.log(error);
      toast({
        title: "error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    if (authState) {
      navigate("/");
    }
  }, [authState]);

  return (
    <div className="bg-background">
      <div className="flex items-center text-primary justify-center h-screen">
        <div className="p-6 bg-white rounded-lg w-96">
          <h1 className="text-2xl text-center">Register</h1>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {fields.map((field, index) => (
              <div key={index}>
                <label htmlFor={field.id} className="text-sm font-medium">
                  {field.label}
                </label>
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
            <Button variant="default" type="submit" className="w-full">
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
