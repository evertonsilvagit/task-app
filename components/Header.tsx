import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-around items-center h-20 shadow-sm">
        <Link className="text-2xl" href="/">Dashboard</Link>
        <Link className="text-2xl" href="/tasks">Tarefas</Link>
        <Link className="text-2xl" href="/contabilidade">Contabilidade</Link>
        <Link className="text-2xl" href="/treino">Treino</Link>
        <Link className="text-2xl" href="/dieta">Dieta</Link>
        <Link className="text-2xl" href="/calendario">Calendario</Link>
    </header>
  );
}
 