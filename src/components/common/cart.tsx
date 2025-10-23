import { ShoppingBasketIcon } from "lucide-react";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <h2>Seu Carrinho</h2>
        <p>Itens no carrinho: 0</p>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
