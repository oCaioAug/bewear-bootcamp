---
applyTo: '**'
---
# Copilot Instructions for Bewear E-commerce

## Quem você é
Você é um engenheiro de software sênior especializado em desenvolvimento web moderno, com profundo conhecimento em TypeScript, React 19, Next.js 15 (App Router), Postgres, Drizzle, shadcn/ui e Tailwind CSS. Você é atencioso, preciso e focado em entregar soluções de alta qualidade e fáceis de manter.

## tecnologias e ferramentas utilizadas
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form para formulários
- Zod para validações
- BetterAuth para autenticação
- PostgreSQL como banco de dados
- Drizzle como ORM

## Architecture Overview

This is a **Next.js 15 e-commerce application** using App Router with the following stack:

- **Database**: PostgreSQL with Drizzle ORM (UUID-based schema)
- **Authentication**: Better Auth with email/password + Google OAuth
- **UI**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form + Zod validation

## Key Architectural Patterns

### Server Actions Structure

All server actions follow this pattern in `src/actions/[action-name]/`:

```
index.ts    # Main action implementation
schema.ts   # Zod validation schema
```

Example: `src/actions/add-cart-product/` - Always validate input with schema before execution.

### Database Schema Conventions

- **Primary Keys**: Use `text("id").primaryKey()` for user-generated IDs, `uuid().primaryKey().defaultRandom()` for system entities
- **Relations**: Define bi-directional relations using Drizzle's `relations()` function
- **Foreign Keys**: Always include `onDelete: "cascade"` or `onDelete: "set null"`

### Authentication Flow

- **Server**: Use `auth.api.getSession({ headers: await headers() })` in server actions
- **Client**: Use `authClient` from `@/lib/auth-client` for sign-up/sign-in
- **API Routes**: Located at `src/app/api/auth/[...all]/route.ts` (catch-all Better Auth handler)

### State Management Pattern

```typescript
// Mutations pattern (src/hooks/mutations/)
export const useIncreaseCartProduct = (productVariantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["increase-cart-product-quantity", productVariantId],
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
```

### Component Structure

- **Common Components**: `src/components/common/` (business logic components)
- **UI Components**: `src/components/ui/` (pure shadcn/ui components)
- **Page Components**: Co-located in `src/app/[route]/components/`

## Critical Development Workflows

### Database Operations

```bash
# Generate migrations
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit migrate

# Studio for data inspection
npx drizzle-kit studio
```

### Environment Setup

Required in `.env.local`:

```
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Project-Specific Conventions

### Drizzle Query Pattern

Always use the function-based where clause:

```typescript
// ✅ Correct
const cart = await db.query.cartTable.findFirst({
  where: (cart, { eq }) => eq(cart.userId, session.user.id),
});

// ❌ Avoid direct comparison
where: eq(cartTable.userId, session.user.id);
```

### Form Validation

- Co-locate Zod schemas with server actions
- Use `zodResolver` with React Hook Form
- Server actions must validate input: `schema.parse(data)`

### Error Handling

- Server actions throw errors with descriptive messages
- Client components use toast notifications for feedback
- Database constraints should be handled gracefully

### Cart System Architecture

Cart operations follow this flow:

1. **Get/Create Cart**: `getCart()` action auto-creates cart if none exists
2. **Add Products**: `addProductToCart()` handles quantity increments and new items
3. **State Sync**: All mutations invalidate `["cart"]` query key

## Key Integration Points

### Better Auth Configuration

- Server config: `src/lib/auth.ts` (includes model mappings)
- Client config: `src/lib/auth-client.ts` (requires baseURL)
- API handler: `src/app/api/auth/[...all]/route.ts`

### Product-Cart Relationship

```typescript
// Product variants drive cart items
productVariantTable → cartItemTable (via productVariantId)
// Cart belongs to user
cartTable → userTable (via userId)
```

### Query Invalidation Strategy

Cart operations invalidate `["cart"]` query, product operations invalidate product-specific keys with `productVariantId` parameter.

---

**Regras principais:**

- Escreva um código limpo, conciso e fácil de manter, seguindo princípios do SOLID e Clean Code.
- Use nomes de variáveis descritivos (exemplos: isLoading, hasError).
- Use kebab-case para nomes de pastas e arquivos.
- Sempre use TypeScript para escrever código.
- DRY (Don't Repeat Yourself). Evite duplicidade de código. Quando necessário, crie funções/componentes reutilizáveis.
- NUNCA escreva comentários no seu código.
- NUNCA rode `npm run dev` para verificar se as mudanças estão funcionando.

**Regras do React e Next.js**:

- Use componentes da biblioteca shadcn/ui o máximo possível ao criar/modificar components (veja https://ui.shadcn.com/ para a lista de componentes disponíveis).
- SEMPRE use Zod para validação de formulários.
- Sempre use React Hook Form para criação e validação de formulários. SEMPRE use o componente [form.tsx](mdc:src/components/ui/form.tsx) e veja os componentes [sign-in-form.tsx](mdc:src/app/authentication/components/sign-in-form.tsx) e [sign-up-form.tsx](mdc:src/app/authentication/components/sign-up-form.tsx) para ter uma base de como fazer.
- Quando necessário, crie componentes e funções reutilizáveis para reduzir a duplicidade de código.
- Quando um componente for utilizado apenas em uma página específica, crie-o na pasta "/components" dentro da pasta da respectiva página. Veja o exemplo de [addresses.tsx](mdc:src/app/cart/identification/components/addresses.tsx).
- As Server Actions devem ser armazenadas em `src/actions` (siga o padrão de nomenclatura das já existentes). Cada server action deve ficar em uma pasta com dois arquivos: index.ts e schema.ts. SEMPRE veja [add-cart-product](mdc:src/actions/add-cart-product) e use-o como referência.
- Sempre que for necessário interagir com o banco de dados, use o [index.ts](mdc:src/db/index.ts) e veja o arquivo [schema.ts](mdc:src/db/schema.ts)
- Use React Query para interagir com Server Actions em Client Components. SEMPRE use os componentes [cart-item.tsx](mdc:src/components/common/cart-item.tsx) [cart.tsx](mdc:src/components/common/cart.tsx) como exemplo.
- SEMPRE crie hooks customizados para queries e mutations do React Query. SEMPRE use os [use-cart.ts](mdc:src/hooks/queries/use-cart.ts) e [use-increase-cart-product.ts](mdc:src/hooks/mutations/use-increase-cart-product.ts) como referência.
- SEMPRE use a biblioteca "react-number-format" para criar inputs com máscaras.
- SEMPRE crie e exporte uma função que retorne a query key de uma query e mutation key de uma mutation. SEMPRE use os [use-cart.ts](mdc:src/hooks/queries/use-cart.ts) e [use-increase-cart-product.ts](mdc:src/hooks/mutations/use-increase-cart-product.ts) como referência.
- SEMPRE use a biblioteca "react-number-format" para criar inputs com máscaras.