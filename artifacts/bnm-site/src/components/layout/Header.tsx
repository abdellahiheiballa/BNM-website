import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    function onDocClick(e: MouseEvent | TouchEvent) {
      const target = e.target as Node | null;
      if (!target) return;
      if (menuRef.current && !menuRef.current.contains(target) && toggleRef.current && !toggleRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    }

    function onScroll() {
      setIsMobileMenuOpen(false);
    }

    document.addEventListener("click", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    document.addEventListener("wheel", onScroll, { passive: true });
    document.addEventListener("touchmove", onScroll, { passive: true });

    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
      document.removeEventListener("wheel", onScroll);
      document.removeEventListener("touchmove", onScroll);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/particuliers", label: "Particuliers" },
    { href: "/professionnels", label: "Professionnels" },
    { href: "/entreprises", label: "Entreprises" },
    { href: "/finance-islamique", label: "Finance Islamique" },
  ];

  const topLinks = [
    { href: "/a-propos", label: "À propos de la BNM" },
    { href: "/actualites", label: "Actualités" },
    { href: "/agences", label: "Nos Agences" },
    { href: "/simulateur", label: "Simulateurs" },
    { href: "/contact", label: "Contact" },
    { href: "/devenir-client", label: "Devenir client" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Top bar for secondary links */}
      <div className="hidden border-b bg-muted/40 px-4 py-1.5 md:block">
        <div className="container mx-auto flex items-center justify-end space-x-6 text-xs font-medium text-muted-foreground">
          {topLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
          <div className="flex items-center space-x-2 border-l pl-6">
            <span className="cursor-pointer hover:text-primary">FR</span>
            <span className="text-muted-foreground/30">|</span>
            <span className="cursor-pointer hover:text-primary">AR</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/assets/images/logo.png"
              alt="BNM logo"
              className="h-10 w-10 rounded bg-white/90 object-contain p-1"
              loading="eager"
            />
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-base font-bold text-primary tracking-tight">BNM</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">La Banque Nationale de Mauritanie</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = location.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-semibold transition-colors rounded-md ${
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground hover:bg-muted hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex text-primary">
            <Search className="h-5 w-5" />
            <span className="sr-only">Rechercher</span>
          </Button>
          
          <a
            href="https://www.click.mr/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 rounded-none shadow-sm h-10 px-4 font-semibold"
            style={{ backgroundColor: "#EEEef1", color: "#131311" }}
          >
            <img
              src="/assets/images/logoclick.png"
              alt="Click"
              className="h-6 w-6 object-contain"
            />
            <span>Click</span>
          </a>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            ref={(el: HTMLButtonElement) => (toggleRef.current = el)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div ref={(el) => (menuRef.current = el)} className="md:hidden border-t bg-background p-4 absolute top-[100%] left-0 w-full shadow-lg flex flex-col gap-4">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-lg font-medium rounded-md hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="h-px bg-border my-2" />
          <nav className="flex flex-col space-y-2">
            {topLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href="https://www.click.mr/"
            target="_blank"
            rel="noreferrer"
            className="w-full mt-4 flex items-center justify-center gap-2 font-semibold h-12 rounded-none"
            style={{ backgroundColor: "#EEEef1", color: "#131311" }}
          >
            <img
              src="/assets/images/logoclick.png"
              alt="Click"
              className="h-6 w-6 object-contain"
            />
            <span>Click</span>
          </a>
        </div>
      )}
    </header>
  );
}
