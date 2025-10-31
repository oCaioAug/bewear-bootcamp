import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = () => {
  return (
    <>
      <Header />
      <div className="flex w-full flex-col gap-6 p-5 lg:items-center lg:justify-center">
        <Tabs defaultValue="sign-in" className="lg:h-full lg:w-2/6">
          <TabsList>
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Criar Conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignInForm />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12 absolute bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
};

export default Authentication;
