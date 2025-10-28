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

const CancelPage = () => {
  return (
    <>
      <Header />

      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            alt="Erro"
            width={300}
            height={300}
            className="mx-auto"
          />

          <DialogTitle className="mt-4 text-2xl">Pedido Cancelado</DialogTitle>
          <DialogDescription className="font-medium">
            Seu pedido foi cancelado. Você pode tentar novamente ou continuar
            navegando pela nossa loja.
          </DialogDescription>

          <DialogFooter>
            <Button className="rounder-full" size="lg" asChild>
              <Link href="/cart">Voltar ao carrinho</Link>
            </Button>

            <Button
              className="rounder-full"
              size="lg"
              variant="outline"
              asChild
            >
              <Link href="/">Continuar comprando</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CancelPage;
