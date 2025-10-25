"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";

import { getCart } from "@/actions/get-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { useCreateShippingAddress } from "@/hooks/mutations/use-create-shipping-address";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";
import { useUserAddresses } from "@/hooks/queries/use-user-addresses";

const addressFormSchema = z.object({
  email: z.email("Email inválido."),
  fullName: z.string().trim().min(1, "Nome completo é obrigatório."),
  cpf: z.string().min(11, "CPF é obrigatório."),
  phone: z.string().min(11, "Celular é obrigatório."),
  zipCode: z.string().min(8, "CEP é obrigatório."),
  address: z.string().trim().min(1, "Endereço é obrigatório."),
  number: z.string().trim().min(1, "Número é obrigatório."),
  complement: z.string().optional(),
  neighborhood: z.string().trim().min(1, "Bairro é obrigatório."),
  city: z.string().trim().min(1, "Cidade é obrigatório."),
  state: z.string().trim().min(1, "Estado é obrigatório."),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
  defaultShippingAddressId: string | null;
}

const Addresses = ({
  shippingAddresses,
  defaultShippingAddressId,
}: AddressesProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    defaultShippingAddressId || null,
  );
  const createShippingAddressMutation = useCreateShippingAddress();
  const updateCartShippingAddressMutation = useUpdateCartShippingAddress();
  const { data: addresses, isLoading } = useUserAddresses({
    initialData: shippingAddresses,
  });

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      email: "",
      fullName: "",
      cpf: "",
      phone: "",
      zipCode: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = async (values: AddressFormValues) => {
    try {
      const newAddress =
        await createShippingAddressMutation.mutateAsync(values);
      toast.success("Endereço criado com sucesso!");

      // Vincular o novo endereço ao carrinho
      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: newAddress.id,
      });

      form.reset();
      setSelectedAddress(null);
      toast.success("Endereço selecionado para entrega!", {position: 'top-center'});
    } catch (error) {
      toast.error("Erro ao criar endereço. Tente novamente.");
      console.error("Error creating address:", error);
    }
  };

  const handleGoToPayment = async () => {
    if (!selectedAddress || selectedAddress === "add_new") {
      toast.error("Selecione um endereço de entrega.");
      return;
    }

    try {
      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: selectedAddress,
      });
      toast.success("Endereço vinculado ao carrinho!", {position: 'top-center'});
      // Aqui você pode redirecionar para a próxima etapa do checkout
    } catch (error) {
      toast.error("Erro ao vincular endereço. Tente novamente.");
      console.error("Error updating cart:", error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Identificação</CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-gray-500">
                Carregando endereços...
              </div>
            </div>
          ) : (
            <RadioGroup
              value={selectedAddress}
              onValueChange={setSelectedAddress}
            >
              {/* Renderizar endereços existentes */}
              {addresses?.map((address) => (
                <Card key={address.id}>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={address.id} id={address.id} />
                      <Label
                        htmlFor={address.id}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="text-sm">
                          {address.recipientName} - {address.street},{" "}
                          {address.number}
                          {address.complement &&
                            `, ${address.complement}`} - {address.neighborhood},{" "}
                          {address.city} - {address.state} - CEP:{" "}
                          {address.zipCode}
                        </div>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Botão para adicionar novo endereço */}
              <Card>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="add_new" id="add_new" />
                    <Label htmlFor="add_new">Adicionar novo endereço</Label>
                  </div>
                </CardContent>
              </Card>
            </RadioGroup>
          )}

          {/* Botão Ir para pagamento - aparece quando um endereço existente está selecionado */}
          {selectedAddress && selectedAddress !== "add_new" && (
            <div className="mt-4">
              <Button
                onClick={handleGoToPayment}
                className="w-full"
                disabled={updateCartShippingAddressMutation.isPending}
              >
                {updateCartShippingAddressMutation.isPending
                  ? "Processando..."
                  : "Ir para pagamento"}
              </Button>
            </div>
          )}

          {selectedAddress === "add_new" && (
            <Card className="mt-4">
              <CardContent className="pt-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Digite seu email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome completo</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Digite seu nome completo"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CPF</FormLabel>
                            <FormControl>
                              <PatternFormat
                                customInput={Input}
                                format="###.###.###-##"
                                mask="_"
                                placeholder="000.000.000-00"
                                value={field.value}
                                onValueChange={(values) => {
                                  field.onChange(values.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Celular</FormLabel>
                            <FormControl>
                              <PatternFormat
                                customInput={Input}
                                format="(##) #####-####"
                                mask="_"
                                placeholder="(00) 00000-0000"
                                value={field.value}
                                onValueChange={(values) => {
                                  field.onChange(values.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <PatternFormat
                              customInput={Input}
                              format="#####-###"
                              mask="_"
                              placeholder="00000-000"
                              value={field.value}
                              onValueChange={(values) => {
                                field.onChange(values.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Endereço</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Digite o endereço"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número</FormLabel>
                            <FormControl>
                              <Input placeholder="Número" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="complement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complemento (opcional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Apartamento, bloco, casa..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="neighborhood"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bairro</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite o bairro" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite a cidade" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite o estado" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={
                        createShippingAddressMutation.isPending ||
                        updateCartShippingAddressMutation.isPending
                      }
                    >
                      {createShippingAddressMutation.isPending ||
                      updateCartShippingAddressMutation.isPending
                        ? "Salvando..."
                        : "Salvar e continuar"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Addresses;
