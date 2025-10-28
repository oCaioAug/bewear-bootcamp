"use client";

import Image from "next/image";
import Link from "next/link";

import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const SuccessPage = () => {
  return (
    <>
      <Header />

      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            alt="Success"
            width={300}
            height={300}
            className="mx-auto"
          />

          <DialogTitle className="mt-4 text-2xl">Pedido Efetuado!</DialogTitle>
          <DialogDescription className="font-medium">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de &quot;Meus Pedidos&quot;.
          </DialogDescription>

          <DialogFooter>
            <Button className="rounder-full" size="lg">
              Ver meus pedidos
            </Button>

            <Button
              className="rounder-full"
              size="lg"
              variant="outline"
              asChild
            >
              <Link href="/">Voltar à loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SuccessPage;
