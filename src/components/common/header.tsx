"use client";

import {
  HouseIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  TruckIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Cart from "./cart";

const Header = () => {
  const { data: session } = authClient.useSession();

  return (
    <header className="item-center flex justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="item-center flex gap-4">
        <Cart />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[330px] rounded-l-3xl">
            <SheetHeader className="px-5">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {session?.user ? (
                <div className="flex justify-between space-y-6 space-x-2">
                  <div className="flex items-center gap-3 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={session?.user?.image as string | undefined}
                        
                      />
                      <AvatarFallback>
                        {session?.user?.name?.split(" ")?.[0]?.[0]}
                        {session?.user?.name?.split(" ")?.[1]?.[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold text-nowrap">
                        {session?.user?.name}
                      </h3>
                      <span className="text-muted-foreground block text-xs">
                        {session?.user?.email}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    Olá, faça seu login!
                  </span>
                  <Button
                    className="bg-primary border-primary flex items-center justify-center gap-4 rounded-full px-5"
                    variant="outline"
                    asChild
                  >
                    <Link href="/authentication">
                      <p className="font-semibold text-white">Login </p>
                      <LogInIcon color="white" />
                    </Link>
                  </Button>
                </div>
              )}

              <div className="flex flex-col space-y-6 space-x-2 mb-6">
                <div className="px-5">
                  <Separator />
                </div>

                <div className="flex flex-col items-center justify-between">
                  <Button
                    className="w-full items-center justify-start px-5"
                    variant="ghost"
                    asChild
                  >
                    <Link href="/">
                      <HouseIcon size="icon" className="mr-2" />
                      <p>Início</p>
                    </Link>
                  </Button>

                  <Button
                    className="w-full items-center justify-start px-5"
                    variant="ghost"
                    asChild
                  >
                    <Link href="/my-orders">
                      <TruckIcon size="icon" className="mr-2" />
                      <p>Meus Pedidos</p>
                    </Link>
                  </Button>
                </div>

                <div className="px-5">
                  <Separator />
                </div>

                <div className="flex flex-col items-center justify-between space-y-6">
                  <Link
                    className="w-full items-center justify-start px-5"
                    href="/category/camisetas"
                  >
                    <p>Camisetas</p>
                  </Link>

                  <Link
                    className="w-full items-center justify-start px-5"
                    href="/category/bermudas-shorts"
                  >
                    <p>Bermudas & Shorts</p>
                  </Link>

                  <Link
                    className="w-full items-center justify-start px-5"
                    href="/category/calcas"
                  >
                    <p>Calças</p>
                  </Link>

                  <Link
                    className="w-full items-center justify-start px-5"
                    href="/category/jaquetas-moletons"
                  >
                    <p>Jaquetas & Moletons</p>
                  </Link>

                  <Link
                    className="w-full items-center justify-start px-5"
                    href="/category/tenis"
                  >
                    <p>Tênis</p>
                  </Link>

                  <Link
                    className="w-full items-center justify-start px-5"
                    href="/category/acessorios"
                  >
                    <p>Acessórios</p>
                  </Link>
                </div>
              </div>

              {session?.user && (
                <div className="flex flex-col justify-start space-y-6 mt-6">
                  <div className="px-5">
                    <Separator className="h-20"/>
                  </div>

                  <Button className="w-full items-center justify-start px-5" variant="ghost" onClick={() => authClient.signOut()}>
                    <LogOutIcon />
                    <p>Sair da conta</p>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
