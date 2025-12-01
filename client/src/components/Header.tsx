import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Soluções", href: "#features" },
    { name: "Números", href: "#numbers" },
    { name: "Como funciona", href: "#how" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b",
        isScrolled
          ? "bg-[#040406]/80 backdrop-blur-md border-white/10 py-3 shadow-lg shadow-black/20"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/images/logo-flowcargo-v2.png" 
              alt="FlowCargo Logo" 
              className="h-12 md:h-14 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-[0_0_10px_rgba(123,97,255,0.3)]"
              onError={(e) => {
                e.currentTarget.src = "/images/logo-flowcargo.png";
              }}
            />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-all duration-300 relative group/link"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#7b61ff] to-[#18d4d4] transition-all duration-300 group-hover/link:w-full" />
            </a>
          ))}
          <Button
            asChild
            className="bg-gradient-to-r from-[#7b61ff] to-[#18d4d4] hover:opacity-90 text-white font-bold border-0 shadow-[0_0_20px_rgba(123,97,255,0.3)] hover:shadow-[0_0_30px_rgba(123,97,255,0.5)] transition-all duration-300"
          >
            <a href="#contact">Agende uma demo</a>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#040406]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-muted-foreground hover:text-white py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#7b61ff] to-[#18d4d4] transition-all duration-300 group-hover/link:w-full" />
            </a>
          ))}
          <Button
            asChild
            className="w-full bg-gradient-to-r from-[#7b61ff] to-[#18d4d4] text-white font-bold mt-2"
          >
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              Agende uma demo
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
