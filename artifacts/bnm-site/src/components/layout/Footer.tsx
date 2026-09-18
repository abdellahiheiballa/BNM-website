import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubscribeNewsletter } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
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
            title: t("footer.subscribedTitle"),
            description: t("footer.subscribedDescription"),
          });
          setEmail("");
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: t("common.error"),
            description: t("footer.subscribeError"),
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
                <span className="text-[10px] text-white/70 uppercase tracking-widest">{t("common.bankName")}</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex gap-4 pt-4">
              <a href="https://www.facebook.com/Banque.Nationale.de.Mauritanie/" target="_blank" rel="noopener noreferrer" aria-label={t("common.bankName") + " Facebook"} className="rounded-full bg-primary-foreground/10 p-2 hover:bg-secondary hover:text-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com/la_bnm" target="_blank" rel="noopener noreferrer" aria-label={t("common.bankName") + " Twitter"} className="rounded-full bg-primary-foreground/10 p-2 hover:bg-secondary hover:text-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/company/banque-nationale-de-mauritanie-bnm/" target="_blank" rel="noopener noreferrer" aria-label={t("common.bankName") + " LinkedIn"} className="rounded-full bg-primary-foreground/10 p-2 hover:bg-secondary hover:text-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/banque.nationale.de.mauritanie" target="_blank" rel="noopener noreferrer" aria-label={t("common.bankName") + " Instagram"} className="rounded-full bg-primary-foreground/10 p-2 hover:bg-secondary hover:text-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary">{t("footer.quickAccess")}</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/particuliers" className="hover:text-secondary transition-colors">{t("navigation.individuals")}</Link></li>
              <li><Link href="/professionnels" className="hover:text-secondary transition-colors">{t("navigation.professionals")}</Link></li>
              <li><Link href="/entreprises" className="hover:text-secondary transition-colors">{t("navigation.businesses")}</Link></li>
              <li><Link href="/finance-islamique" className="hover:text-secondary transition-colors">{t("navigation.islamicFinance")}</Link></li>
              <li><Link href="/simulateur" className="hover:text-secondary transition-colors">{t("navigation.simulators")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary">{t("footer.contact")}</h3>
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
            <h3 className="text-lg font-semibold mb-6 text-secondary">{t("footer.newsletter")}</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              {t("footer.newsletterDescription")}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input 
                type="email" 
                placeholder={t("footer.emailPlaceholder")} 
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
                {subscribe.isPending ? t("footer.subscribing") : t("footer.subscribe")}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} {t("common.bankName")}. {t("footer.allRights")}</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">{t("footer.legalNotice")}</Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">{t("footer.privacy")}</Link>
            <Link href="/tarification" className="hover:text-white transition-colors">{t("footer.pricing")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
