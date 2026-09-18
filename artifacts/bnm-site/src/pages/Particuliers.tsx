import { useListOffres } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CreditCard, PiggyBank, Home, Car, Smartphone,
  Sparkles, Star, Zap, ArrowUpRight, Diamond, Rocket,
  ChevronRight, Award, FileText, Check, Users, Compass,
  MapPin, Wallet, Landmark, BookOpen, ShoppingBag, ShieldCheck,
  TrendingUp, LineChart, Heart, CheckCircle, HelpCircle, Phone,
  Palette, Sun, Moon
} from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

const iconMap = {
  Wallet, CreditCard, PiggyBank, Home, Car, Smartphone,
  Sparkles, Star, Zap, ArrowUpRight, Diamond, Rocket,
  ChevronRight, Award, FileText, Check, Users, Compass,
  MapPin, Landmark, BookOpen, ShoppingBag, ShieldCheck,
  TrendingUp, LineChart, Heart, CheckCircle, HelpCircle, Phone,
  Palette, Sun, Moon
};

type SubOffre = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaLink: string;
  icon: keyof typeof iconMap;
  gradient: string;
  avantages: string[];
  documents: string[];
  stats?: { label: string; value: string }[];
};

type Section = {
  id: string;
  title: string;
  tagline: string;
  icon: keyof typeof iconMap;
  gradient: string;
  subOffres: SubOffre[];
};

function SubOffreCard({ subOffre, active, onClick }: { subOffre: SubOffre; active: boolean; onClick: () => void }) {
  const Icon = iconMap[subOffre.icon];
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-controls={`suboffre-${subOffre.id}`}
      className={`group relative flex items-center gap-4 w-full box-border max-w-full p-3 md:p-5 text-left transition-all duration-300 ${
        active
          ? "bg-primary text-white shadow-xl lg:scale-[1.02] origin-left border-l-4 border-secondary"
          : "bg-white text-foreground hover:bg-primary/5 border border-border hover:border-primary/30 hover:shadow-md"
      }`}
    >
      <div className={`p-3 rounded-xl transition-all ${
        active ? "bg-white/15" : "bg-gradient-to-br " + subOffre.gradient + " shadow-sm"
      }`}>
        <Icon className={`w-5 h-5 ${active ? "text-secondary" : "text-primary"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm truncate">{subOffre.title}</p>
        <p className={`text-xs mt-0.5 truncate ${active ? "text-white/70" : "text-muted-foreground"}`}>
          {subOffre.subtitle}
        </p>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
          active ? "text-secondary rotate-0" : "text-muted-foreground group-hover:translate-x-1"
        }`} />
      </div>
    </button>
  );
}

function OffreContent({ offre }: { offre: SubOffre }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"avantages" | "documents">("avantages");
  const Icon = iconMap[offre.icon];

  return (
    <div id={`suboffre-${offre.id}`} className="space-y-8">
      {/* Hero mini-section */}
      <div className={`bg-gradient-to-br ${offre.gradient} rounded-none p-6 md:p-8 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <Icon className="w-full h-full" />
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 backdrop-blur rounded-xl shrink-0">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{offre.title}</h3>
            <p className="text-white/80 text-sm">{offre.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Stats mini-cards */}
      {offre.stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {offre.stats.map((stat, i) => (
            <div key={i} className="bg-muted/50 border border-border p-3 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-sm font-bold text-primary">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">{offre.description}</p>

      {/* Tabs */}
      <div className="bg-muted/30 border border-border">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("avantages")}
            className={`flex-1 py-3 px-4 text-sm font-semibold transition-all relative ${
              activeTab === "avantages"
                ? "text-primary bg-white"
                : "text-muted-foreground hover:text-primary hover:bg-white/50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Award className="w-4 h-4" />
              <span>{t("individuals.advantages")}</span>
            </div>
            {activeTab === "avantages" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />}
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`flex-1 py-3 px-4 text-sm font-semibold transition-all relative ${
              activeTab === "documents"
                ? "text-primary bg-white"
                : "text-muted-foreground hover:text-primary hover:bg-white/50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{t("individuals.documents")}</span>
            </div>
            {activeTab === "documents" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />}
          </button>
        </div>

        <div className="p-6">
          {activeTab === "avantages" ? (
            <div className="space-y-3">
              {offre.avantages.map((av, i) => (
                <div key={i} className="flex gap-3 items-start group hover:translate-x-1 transition-transform">
                  <div className="p-1 rounded-full bg-secondary/10 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <p className="text-sm text-foreground/80">{av}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {offre.documents.map((doc, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground/80">{doc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <Link href={offre.ctaLink}>
        <Button className="bg-primary text-white hover:bg-primary/90 rounded-none group w-full md:w-auto">
          <span>{offre.cta}</span>
          <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Button>
      </Link>
    </div>
  );
}

export default function Particuliers() {
  const { t, i18n } = useTranslation();
  const { data: offres, isLoading } = useListOffres({ categorie: "particuliers" });
  const offresArray = Array.isArray(offres) ? offres : [];

  const sections: Section[] = useMemo(() => [
    {
      id: "comptes",
      title: t("products.particuliers.sections.comptes"),
      tagline: t("products.particuliers.sections.comptesTagline"),
      icon: "Wallet",
      gradient: "from-[#0E6B4B] to-[#0A4A36]",
      subOffres: [
        {
          id: "ouvrir-compte",
          title: t("products.particuliers.compte.title"),
          subtitle: t("products.particuliers.compte.subtitle"),
          description: t("products.particuliers.compte.description"),
          cta: t("products.particuliers.compte.cta"),
          ctaLink: "/contact",
          icon: "Diamond",
          gradient: "from-[#0E6B4B]/10 to-[#0A4A36]/10",
          avantages: t("products.particuliers.compte.advantages", { returnObjects: true }),
          documents: t("products.particuliers.compte.documents", { returnObjects: true }),
          stats: t("products.particuliers.compte.stats", { returnObjects: true }),
        },
        {
          id: "mastercard-business",
          title: t("products.particuliers.mastercards.business.title"),
          subtitle: t("products.particuliers.mastercards.business.subtitle"),
          description: t("products.particuliers.mastercards.business.description"),
          cta: t("products.particuliers.mastercards.business.cta"),
          ctaLink: "/contact",
          icon: "CreditCard",
          gradient: "from-[#D9C3A0]/30 to-[#B68C4A]/20",
          avantages: t("products.particuliers.mastercards.business.advantages", { returnObjects: true }),
          documents: t("products.particuliers.mastercards.business.documents", { returnObjects: true }),
          stats: t("products.particuliers.mastercards.business.stats", { returnObjects: true }),
        },
        {
          id: "mastercard-classic",
          title: t("products.particuliers.mastercards.classic.title"),
          subtitle: t("products.particuliers.mastercards.classic.subtitle"),
          description: t("products.particuliers.mastercards.classic.description"),
          cta: t("products.particuliers.mastercards.classic.cta"),
          ctaLink: "/contact",
          icon: "CreditCard",
          gradient: "from-[#D9C3A0]/30 to-[#B68C4A]/20",
          avantages: t("products.particuliers.mastercards.classic.advantages", { returnObjects: true }),
          documents: t("products.particuliers.mastercards.classic.documents", { returnObjects: true }),
          stats: t("products.particuliers.mastercards.classic.stats", { returnObjects: true }),
        },
        {
          id: "mastercard-platinum",
          title: t("products.particuliers.mastercards.platinum.title"),
          subtitle: t("products.particuliers.mastercards.platinum.subtitle"),
          description: t("products.particuliers.mastercards.platinum.description"),
          cta: t("products.particuliers.mastercards.platinum.cta"),
          ctaLink: "/contact",
          icon: "CreditCard",
          gradient: "from-[#D9C3A0]/30 to-[#B68C4A]/20",
          avantages: t("products.particuliers.mastercards.platinum.advantages", { returnObjects: true }),
          documents: t("products.particuliers.mastercards.platinum.documents", { returnObjects: true }),
          stats: t("products.particuliers.mastercards.platinum.stats", { returnObjects: true }),
        },
        {
          id: "mastercard-travel",
          title: t("products.particuliers.mastercards.travel.title"),
          subtitle: t("products.particuliers.mastercards.travel.subtitle"),
          description: t("products.particuliers.mastercards.travel.description"),
          cta: t("products.particuliers.mastercards.travel.cta"),
          ctaLink: "/contact",
          icon: "CreditCard",
          gradient: "from-[#D9C3A0]/30 to-[#B68C4A]/20",
          avantages: t("products.particuliers.mastercards.travel.advantages", { returnObjects: true }),
          documents: t("products.particuliers.mastercards.travel.documents", { returnObjects: true }),
          stats: t("products.particuliers.mastercards.travel.stats", { returnObjects: true }),
        },
        {
          id: "carnet-cheque",
          title: t("products.particuliers.carnetCheque.title"),
          subtitle: t("products.particuliers.carnetCheque.subtitle"),
          description: t("products.particuliers.carnetCheque.description"),
          cta: t("products.particuliers.carnetCheque.cta"),
          ctaLink: "/contact",
          icon: "Landmark",
          gradient: "from-[#B68C4A]/15 to-[#D9C3A0]/30",
          avantages: t("products.particuliers.carnetCheque.advantages", { returnObjects: true }),
          documents: t("products.particuliers.carnetCheque.documents", { returnObjects: true }),
          stats: t("products.particuliers.carnetCheque.stats", { returnObjects: true }),
        }
      ]
    },
    {
      id: "epargne",
      title: t("products.particuliers.sections.epargne"),
      tagline: t("products.particuliers.sections.epargneTagline"),
      icon: "PiggyBank",
      gradient: "from-[#0A4A36] to-[#0E6B4B]",
      subOffres: [
        {
          id: "epargne-classique",
          title: t("products.particuliers.epargne.classique.title"),
          subtitle: t("products.particuliers.epargne.classique.subtitle"),
          description: t("products.particuliers.epargne.classique.description"),
          cta: t("products.particuliers.epargne.classique.cta"),
          ctaLink: "/contact",
          icon: "PiggyBank",
          gradient: "from-[#0E6B4B]/10 to-[#6E8F6B]/20",
          avantages: t("products.particuliers.epargne.classique.advantages", { returnObjects: true }),
          documents: t("products.particuliers.epargne.classique.documents", { returnObjects: true }),
          stats: t("products.particuliers.epargne.classique.stats", { returnObjects: true }),
        },
        {
          id: "epargne-islamique",
          title: t("products.particuliers.epargne.islamique.title"),
          subtitle: t("products.particuliers.epargne.islamique.subtitle"),
          description: t("products.particuliers.epargne.islamique.description"),
          cta: t("products.particuliers.epargne.islamique.cta"),
          ctaLink: "/contact",
          icon: "Star",
          gradient: "from-[#B68C4A]/15 to-[#D9C3A0]/30",
          avantages: t("products.particuliers.epargne.islamique.advantages", { returnObjects: true }),
          documents: t("products.particuliers.epargne.islamique.documents", { returnObjects: true }),
          stats: t("products.particuliers.epargne.islamique.stats", { returnObjects: true }),
        }
      ]
    },
    {
      id: "emprunter",
      title: t("products.particuliers.sections.emprunter"),
      tagline: t("products.particuliers.sections.emprunterTagline"),
      icon: "TrendingUp",
      gradient: "from-[#B68C4A] to-[#0E6B4B]",
      subOffres: [
        {
          id: "credit-consommation",
          title: t("products.particuliers.credits.consommation.title"),
          subtitle: t("products.particuliers.credits.consommation.subtitle"),
          description: t("products.particuliers.credits.consommation.description"),
          cta: t("products.particuliers.credits.consommation.cta"),
          ctaLink: "/contact",
          icon: "ShoppingBag",
          gradient: "from-[#B68C4A]/15 to-[#0E6B4B]/10",
          avantages: t("products.particuliers.credits.consommation.advantages", { returnObjects: true }),
          documents: t("products.particuliers.credits.consommation.documents", { returnObjects: true }),
          stats: t("products.particuliers.credits.consommation.stats", { returnObjects: true }),
        },
        {
          id: "credit-equipement",
          title: t("products.particuliers.credits.equipement.title"),
          subtitle: t("products.particuliers.credits.equipement.subtitle"),
          description: t("products.particuliers.credits.equipement.description"),
          cta: t("products.particuliers.credits.equipement.cta"),
          ctaLink: "/contact",
          icon: "Car",
          gradient: "from-[#0E6B4B]/10 to-[#6E8F6B]/20",
          avantages: t("products.particuliers.credits.equipement.advantages", { returnObjects: true }),
          documents: t("products.particuliers.credits.equipement.documents", { returnObjects: true }),
          stats: t("products.particuliers.credits.equipement.stats", { returnObjects: true }),
        },
        {
          id: "credit-oxygene",
          title: t("products.particuliers.credits.fetes.title"),
          subtitle: t("products.particuliers.credits.fetes.subtitle"),
          description: t("products.particuliers.credits.fetes.description"),
          cta: t("products.particuliers.credits.fetes.cta"),
          ctaLink: "/contact",
          icon: "Zap",
          gradient: "from-[#B68C4A]/20 to-[#D9C3A0]/30",
          avantages: t("products.particuliers.credits.fetes.advantages", { returnObjects: true }),
          documents: t("products.particuliers.credits.fetes.documents", { returnObjects: true }),
          stats: t("products.particuliers.credits.fetes.stats", { returnObjects: true }),
        },
        {
          id: "credit-investissement",
          title: t("products.particuliers.credits.immobilier.title"),
          subtitle: t("products.particuliers.credits.immobilier.subtitle"),
          description: t("products.particuliers.credits.immobilier.description"),
          cta: t("products.particuliers.credits.immobilier.cta"),
          ctaLink: "/contact",
          icon: "Rocket",
          gradient: "from-[#0E6B4B]/10 to-[#6E8F6B]/20",
          avantages: t("products.particuliers.credits.immobilier.advantages", { returnObjects: true }),
          documents: t("products.particuliers.credits.immobilier.documents", { returnObjects: true }),
          stats: t("products.particuliers.credits.immobilier.stats", { returnObjects: true }),
        }
      ]
    }
  ], [i18n.language]);

  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [activeSubOffre, setActiveSubOffre] = useState<string>(sections[0].subOffres[0].id);

  const currentSection = sections.find(s => s.id === activeSection)!;
  const currentSubOffre = currentSection.subOffres.find(s => s.id === activeSubOffre)!;
  const currentIndex = currentSection.subOffres.findIndex(s => s.id === activeSubOffre);

  const heroImage = "/assets/images/particuliers.jpg.jpeg";

  const quickActions = [
    {
      title: t("products.particuliers.quickActions.constiuer.title"),
      desc: t("products.particuliers.quickActions.constiuer.desc"),
      icon: "PiggyBank" as keyof typeof iconMap,
      gradient: "from-[#0E6B4B] to-[#6E8F6B]",
      section: "epargne",
      sub: "epargne-classique"
    },
    {
      title: t("products.particuliers.quickActions.islamique.title"),
      desc: t("products.particuliers.quickActions.islamique.desc"),
      icon: "Star" as keyof typeof iconMap,
      gradient: "from-[#B68C4A] to-[#D9C3A0]",
      section: "epargne",
      sub: "epargne-islamique"
    }
  ];

  const borrowActions = [
    {
      title: t("products.particuliers.borrowActions.consommation.title"),
      desc: t("products.particuliers.borrowActions.consommation.desc"),
      icon: "ShoppingBag" as keyof typeof iconMap,
      gradient: "from-[#0E6B4B] to-[#0A4A36]",
      section: "emprunter",
      sub: "credit-consommation"
    },
    {
      title: t("products.particuliers.borrowActions.fetes.title"),
      desc: t("products.particuliers.borrowActions.fetes.desc"),
      icon: "Heart" as keyof typeof iconMap,
      gradient: "from-[#B68C4A] to-[#D9C3A0]",
      section: "emprunter",
      sub: "credit-oxygene"
    },
    {
      title: t("products.particuliers.borrowActions.immobilier.title"),
      desc: t("products.particuliers.borrowActions.immobilier.desc"),
      icon: "Home" as keyof typeof iconMap,
      gradient: "from-[#6E8F6B] to-[#0E6B4B]",
      section: "emprunter",
      sub: "credit-investissement"
    }
  ];

  // Handle language change by resetting sections
  const handleLanguageChange = () => {
    setActiveSection(sections[0].id);
    setActiveSubOffre(sections[0].subOffres[0].id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute top-10 right-10 w-72 h-72 border border-white/10 rounded-full z-10" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 border border-white/5 rounded-full z-10" />
        <div className="container relative z-20 mx-auto px-4 py-20">
          <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/20 text-secondary text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              {t("individuals.badge")}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              {t("individuals.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
              {t("individuals.heroDescription")}
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 group">
                  {t("individuals.start")} <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
              <Link href="#sections">
                <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 bg-transparent">
                  {t("individuals.explore")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Tabs - Sticky */}
      <section id="sections" className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-3 overflow-x-auto hide-scrollbar">
            {sections.map((section) => {
              const Icon = iconMap[section.icon];
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setActiveSubOffre(section.subOffres[0].id);
                    handleLanguageChange();
                  }}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all duration-300 shrink-0 ${
                    isActive
                      ? "bg-primary text-white shadow-lg"
                      : "bg-muted/50 text-foreground/70 hover:text-primary hover:bg-muted border border-border"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-secondary" : ""}`} />
                  <span>{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Banner */}
      <section className={`bg-gradient-to-r ${currentSection.gradient} text-white`}>
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/15 backdrop-blur rounded-xl">
              {(() => { const Icon = iconMap[currentSection.icon]; return <Icon className="w-8 h-8" />; })()}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{currentSection.title}</h2>
              <p className="text-white/80 mt-1">{currentSection.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="relative lg:sticky lg:top-28 space-y-6">
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{t("individuals.navigation")}</p>
                  <p className="text-sm text-muted-foreground">{t("individuals.youWant")}</p>
                </div>
                <div className="space-y-1">
                  {currentSection.subOffres.map((sub) => {
                    const subWithIcon: SubOffre = { ...sub };
                    return (
                      <SubOffreCard
                        key={sub.id}
                        subOffre={subWithIcon}
                        active={activeSubOffre === sub.id}
                        onClick={() => setActiveSubOffre(sub.id)}
                      />
                    );
                  })}
                </div>
                <div className="bg-muted/30 border border-border p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {currentIndex + 1} / {currentSection.subOffres.length}
                  </p>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                      style={{ width: `${((currentIndex + 1) / currentSection.subOffres.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="lg:col-span-8">
              <OffreContent offre={{
                ...currentSubOffre,
                icon: currentSubOffre.icon,
                gradient: currentSubOffre.gradient
              } as SubOffre} />
            </div>
          </div>
        </div>
      </section>

      {/* Vous souhaitez... - Épargne actions */}
      <section className="py-16 bg-gradient-to-br from-muted/50 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary">{t("individuals.savingsActionsTitle")}</h2>
            <p className="text-muted-foreground mt-2">{t("individuals.savingsActionsDescription")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {quickActions.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <button
                  key={i}
                  onClick={() => {
                    setActiveSection(item.section);
                    setActiveSubOffre(item.sub);
                  }}
                  className="group relative overflow-hidden border border-border bg-white hover:shadow-xl transition-all duration-500 text-left"
                >
                  <div className={`h-2 bg-gradient-to-r ${item.gradient}`} />
                  <div className="p-8">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{item.desc}</p>
                    <div className="flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                      {t("individuals.learnMore")} <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <h3 className="text-2xl font-bold text-primary text-center mb-8">{t("individuals.alsoWant")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {borrowActions.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <button
                  key={i}
                  onClick={() => {
                    setActiveSection(item.section);
                    setActiveSubOffre(item.sub);
                  }}
                  className="group relative overflow-hidden border border-border bg-white hover:shadow-xl transition-all duration-500 text-left"
                >
                  <div className={`h-2 bg-gradient-to-r ${item.gradient}`} />
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                      {t("individuals.learnMore")} <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* API Offres */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">{t("individuals.allOffers")}</h2>
              <p className="text-muted-foreground">{t("individuals.allOffersDescription")}</p>
            </div>
            <Link href="/contact" className="hidden sm:flex items-center text-sm font-semibold text-primary hover:text-secondary transition-colors">
              {t("individuals.viewAll")} <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="rounded-none border-0 shadow-sm">
                  <CardHeader>
                    <Skeleton className="h-12 w-12 mb-4" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : offresArray.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offresArray.map(offre => {
                let Icon = Smartphone;
                let gradient = "from-[#0E6B4B] to-[#0A4A36]";
                if (offre.titre.toLowerCase().includes('carte')) {
                  Icon = CreditCard; gradient = "from-[#B68C4A] to-[#D9C3A0]";
                } else if (offre.titre.toLowerCase().includes('epargne') || offre.titre.toLowerCase().includes('épargne')) {
                  Icon = PiggyBank; gradient = "from-[#0A4A36] to-[#6E8F6B]";
                } else if (offre.titre.toLowerCase().includes('immo') || offre.titre.toLowerCase().includes('investissement') || offre.titre.toLowerCase().includes('logement') || offre.titre.toLowerCase().includes('maison')) {
                  Icon = Home; gradient = "from-[#0E6B4B] to-[#6E8F6B]";
                } else if (offre.titre.toLowerCase().includes('auto') || offre.titre.toLowerCase().includes('voiture') || offre.titre.toLowerCase().includes('consommation')) {
                  Icon = Car; gradient = "from-[#B68C4A] to-[#0E6B4B]";
                } else if (offre.titre.toLowerCase().includes('oxygène') || offre.titre.toLowerCase().includes('oxygene')) {
                  Icon = Heart; gradient = "from-[#D9C3A0] to-[#B68C4A]";
                }
                return (
                  <div key={offre.id} className="group border border-border bg-white hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
                    <div className="p-6 flex flex-col flex-1">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} p-0.5 mb-4`}>
                        <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-primary mb-2">{offre.titre}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">
                        {offre.description || t("individuals.tailoredOffer")}
                      </p>
                      {(offre.clickByBnm || /compte\s*courant\s*particulier/i.test(offre.titre)) && (
                        <div className="mb-4 border border-secondary/30 bg-secondary/10 p-3 text-sm font-medium text-primary">
                          {t("individuals.clickLink")}
                        </div>
                      )}
                      <Link href="/contact" className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors mt-auto">
                        {t("individuals.learnMore")} <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-12">{t("individuals.noOffers")}</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/95 to-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/20 text-secondary text-sm font-semibold mx-auto">
              <Compass className="w-4 h-4" />
              {t("individuals.ctaBadge")}
            </div>
            <h2 className="text-4xl font-bold text-white">
              {t("individuals.ctaTitle")}
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              {t("individuals.ctaDescription")}
            </p>
            <div className="pt-6">
              <Link href="/simulateur">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-10 group">
                  {t("individuals.accessSimulator")} <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
