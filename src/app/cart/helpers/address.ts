interface formatAddressProps {
  recipientName: string;
  street: string;
  number: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export const formatAddress = (address: formatAddressProps) => {
return `${address.recipientName} • ${address.street}, ${address.number}
    ${address.complement && `, ${address.complement}`}, ${address.neighborhood}
    , ${address.city} - ${address.state} • CEP: ${address.zipCode}`;
}