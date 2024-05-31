import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast();

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

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
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
  };

  return (
    <div className="bg-gray-100">
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 p-6 bg-white rounded-lg">
          <h1 className="text-2xl text-center">Login</h1>
          <form onSubmit={handleSumbit} className="mt-4 space-y-4">
            {fields.map((field, index) => (
              <div key={index}>
                <label htmlFor={field.id} className="text-sm text-gray-600">
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
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
