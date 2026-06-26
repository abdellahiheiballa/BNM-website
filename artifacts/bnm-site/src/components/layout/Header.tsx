import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              src="https://www.bnm.mr/public/assets/images/logo.png"
              alt="BNM logo"
              className="h-10 w-10 rounded bg-white/90 object-contain p-1"
              loading="eager"
            />
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-base font-bold text-primary tracking-tight">BNM</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Banque Nationale</span>
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
          
          <Button className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-none shadow-sm h-10 px-6 font-semibold">
            <User className="mr-2 h-4 w-4" />
            E-Banking
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 absolute top-[100%] left-0 w-full shadow-lg flex flex-col gap-4">
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
          <Button className="w-full mt-4 bg-primary text-primary-foreground font-semibold h-12">
            <User className="mr-2 h-5 w-5" />
            E-Banking
          </Button>
        </div>
      )}
    </header>
  );
}
