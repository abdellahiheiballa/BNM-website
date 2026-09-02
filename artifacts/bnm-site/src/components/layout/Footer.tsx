import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubscribeNewsletter } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const subscribe = useSubscribeNewsletter();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    subscribe.mutate(
      { data: { email } },
      {
        onSuccess: () => {
          toast({
            title: "Inscription réussie",
            description: "Merci de vous être inscrit à notre newsletter.",
          });
          setEmail("");
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Erreur",
            description: "Une erreur est survenue lors de l'inscription.",
          });
        }
      }
    );
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-secondary text-primary font-serif font-bold text-xl">
                B
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-white tracking-tight">BNM</span>
                <span className="text-[10px] text-white/70 uppercase tracking-widest">La Banque Nationale de Mauritanie</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              La Banque Nationale de Mauritanie vous accompagne dans tous vos projets avec des solutions bancaires innovantes et adaptées à vos besoins.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="rounded-full bg-primary-foreground/10 p-2 hover:bg-secondary hover:text-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-primary-foreground/10 p-2 hover:bg-secondary hover:text-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-primary-foreground/10 p-2 hover:bg-secondary hover:text-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-primary-foreground/10 p-2 hover:bg-secondary hover:text-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary">Accès Rapide</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/particuliers" className="hover:text-secondary transition-colors">Particuliers</Link></li>
              <li><Link href="/professionnels" className="hover:text-secondary transition-colors">Professionnels</Link></li>
              <li><Link href="/entreprises" className="hover:text-secondary transition-colors">Entreprises</Link></li>
              <li><Link href="/finance-islamique" className="hover:text-secondary transition-colors">Finance Islamique</Link></li>
              <li><Link href="/simulateur" className="hover:text-secondary transition-colors">Simulateurs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary">Contact</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0" />
                <span>Avenue Gamal Abdel Nasser<br />BP 614, Nouakchott, Mauritanie</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <span>+222 45 25 26 02</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <span>contact@bnm.mr</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary">Newsletter</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Restez informé de nos dernières offres et actualités.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input 
                type="email" 
                placeholder="Votre adresse email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-white placeholder:text-white/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-secondary text-primary hover:bg-secondary/90 font-semibold"
                disabled={subscribe.isPending}
              >
                {subscribe.isPending ? "Inscription..." : "S'inscrire"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Banque Nationale de Mauritanie. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <Link href="/tarification" className="hover:text-white transition-colors">Tarification</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
