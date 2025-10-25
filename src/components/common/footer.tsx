const Footer = () => {
  return (
    <div className="bg-accent w-full gap-1 p-8">
      <p className="text-xs font-medium">&copy; {new Date().getFullYear()}</p>
      <p className="text-muted-foreground text-xs font-medium">
        Todos os direitos reservados.
      </p>
    </div>
  );
};

export default Footer;
