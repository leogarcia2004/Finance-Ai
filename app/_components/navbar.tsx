"use client";


import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"


const Navbar = () => {
    const pathName = usePathname(); // Controle de estado para mostrar que o link está ativo, colocar uma cor verde nele. Esse hook vai pegar a url atual.
  return (
    <nav className="flex justify-between px-8 py-4 border-b border-solid">
        <div className="flex items-center gap-10">
            <Image src="/logo.svg" alt="Logo Finance Ai" width={173} height={39} />
            <Link href="/" className={
                pathName === "/" ? "text-primary font-bold" : "text-muted-foreground"
            }>
                Dashboard
            </Link>
            <Link href="/transactions" className={
                pathName === "/transactions" ? "text-primary font-bold" : "text-muted-foreground"
            }>
                Transações
            </Link>
            <Link href="/subscription" className={
                pathName === "/subscription" ? "text-primary font-bold" : "text-muted-foreground"
            }>
                Assinatura
            </Link>
        </div>
        <UserButton showName/> {/* showName para exibir o nome do usuário */}
    </nav>
  )
}

export default Navbar