"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z
  .object({
    name: z.string("Nome inválido.").trim().min(1, "Nome é obrigatório."),
    email: z.email("Email inválido."),
    password: z
      .string("Senha inválida.")
      .min(8, "Senha deve ter pelo menos 8 caracteres."),
    passwordValidation: z
      .string("Confirmação de senha inválida.")
      .min(8, "Confirmação de senha deve ter pelo menos 8 caracteres."),
  })
  .refine(
    (data) => {
      return data.password === data.passwordValidation;
    },
    {
      error: "As senhas não coincidem.",
      path: ["passwordValidation"],
    },
  );

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordValidation: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      console.info(values);

      await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
          onError: (error) => {
            if (
              error.error.code === authClient.$ERROR_CODES.USER_ALREADY_EXISTS
            ) {
              toast.error("Usuário já existe.");

              return form.setError("email", {
                message: "E-mail já está cadastrado.",
              });
            }

            toast.error(error.error.message);
          },
        },
      });
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Criar Conta</CardTitle>
          <CardDescription>Crie uma conta para continuar.</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordValidation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmação de Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirme sua senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Criar Conta</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignUpForm;
