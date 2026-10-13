import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cupons Ifood — Descontos para seu pedido" },
      { name: "description", content: "Encontre e copie cupons de desconto para pedir no iFood." },
      { property: "og:title", content: "Cupons Ifood" },
      { property: "og:description", content: "Cupons de desconto para seu próximo pedido." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const cupons = [
  { codigo: "PRIMEIRA20", desc: "R$ 20 off no primeiro pedido", min: "Pedido mínimo R$ 30", cat: "Novos usuários" },
  { codigo: "FRETEGRATIS", desc: "Entrega grátis", min: "Pedido mínimo R$ 25", cat: "Entrega" },
  { codigo: "PIZZA15", desc: "15% off em pizzarias", min: "Pedido mínimo R$ 40", cat: "Pizza" },
  { codigo: "MERCADO10", desc: "R$ 10 off no mercado", min: "Pedido mínimo R$ 60", cat: "Mercado" },
  { codigo: "LANCHE8", desc: "R$ 8 off em lanches", min: "Pedido mínimo R$ 20", cat: "Lanches" },
  { codigo: "DOCE5", desc: "R$ 5 off em sobremesas", min: "Pedido mínimo R$ 15", cat: "Doces" },
];

function Index() {
  const [copiado, setCopiado] = useState<string | null>(null);
  const copiar = (c: string) => {
    navigator.clipboard.writeText(c);
    setCopiado(c);
    setTimeout(() => setCopiado(null), 1500);
  };
  return (
    <main className="min-h-screen">
      <header className="bg-primary px-6 py-16 text-center text-primary-foreground">
        <h1 className="text-5xl font-extrabold">Cupons Ifood</h1>
        <p className="mt-3 text-lg opacity-90">Copie um cupom e economize no seu próximo pedido.</p>
      </header>
      <section className="mx-auto grid max-w-5xl gap-5 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {cupons.map((c) => (
          <article key={c.codigo} className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
            <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">{c.cat}</span>
            <h2 className="mt-4 text-2xl font-bold">{c.desc}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{c.min}</p>
            <div className="mt-6 flex items-center gap-2 rounded-xl border-2 border-dashed border-primary p-2">
              <code className="flex-1 pl-2 font-bold tracking-wider text-primary">{c.codigo}</code>
              <button onClick={() => copiar(c.codigo)} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90">
                {copiado === c.codigo ? "Copiado!" : "Copiar"}
              </button>
            </div>
          </article>
        ))}
      </section>
      <footer className="pb-10 text-center text-xs text-muted-foreground">Cupons ilustrativos. Confira as regras no app.</footer>
    </main>
  );
}
