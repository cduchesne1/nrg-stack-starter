import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useNavigate } from "react-router-dom";
import graphqlClient from "../../graphql/client";
import { gql } from "@apollo/client";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  username: z.string(),
  password: z.string()
})

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const LOGIN_QUERY = gql`
    query Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        accessToken
      }
    }
  `;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await graphqlClient.query({
        query: LOGIN_QUERY,
        variables: values,
      });

      const { accessToken } = response.data.login;
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Could not log you in.",
        });
        form.reset();
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Card className="mx-auto w-[500px] max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-8 mb-10">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="princesse1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full mb-4" type="submit">Login</Button>
              <Button onClick={() => navigate("/signup")} className="w-full" variant="outline" type="button">Don't have an account?</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
