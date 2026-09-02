import { useListOffres } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, Briefcase, Building, Landmark, LineChart, ShieldCheck, 
  PiggyBank, BookOpen, ShoppingBag, Heart, CheckCircle, Info, 
  TrendingUp, ChevronRight, Phone, FileCheck, Award, HelpCircle,
  MapPin, Banknote, Wallet, CreditCard, Sparkles, Star, Zap, 
  ArrowUpRight, Diamond, Rocket, Layers, Compass, Menu, X,
  Check, FileText, Palette, Globe, Smartphone, Users
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

type SubOffre = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaLink: string;
  icon: typeof Landmark;
  color: string;
  gradient: string;
  avantages: string[];
  documents: string[];
  stats?: { label: string; value: string }[];
};

type Section = {
  id: string;
  title: string;
  tagline: string;
  icon: typeof Landmark;
  gradient: string;
  subOffres: SubOffre[];
};

const sections: Section[] = [
  {
    id: "comptes",
    title: "Comptes & Paiements",
    tagline: "Gérez votre argent en toute simplicité",
    icon: Wallet,
    gradient: "from-[#0E6B4B] to-[#0A4A36]",
    subOffres: [
      {
        id: "ouvrir-compte",
        title: "Ouvrir un compte",
        subtitle: "Premier pas vers l'autonomie financière",
        description: "Ouvrir un compte à la BNM, c'est bien plus que des moyens de paiements. C'est bénéficier d'une attention particulière et d'une réactivité sans égale pour chaque besoin.",
        cta: "Demander l'ouverture",
        ctaLink: "/contact",
        icon: Diamond,
        color: "blue",
        gradient: "from-[#0E6B4B]/10 to-[#0A4A36]/10",
        avantages: [
          "Un accompagnement personnalisé adapté à votre activité",
          "Des solutions sur-mesure pour chaque profil professionnel",
          "Une réactivité maximale pour toutes vos demandes"
        ],
        documents: [
          "Une demande d'ouverture de compte",
          "Deux photographies récentes conformes",
          "Copie de votre pièce d'identité (passeport ou carte de résidence)",
          "Un justificatif d'adresse du local professionnel",
          "Une domiciliation de salaire",
          "Un document justifiant votre activité professionnelle"
        ],
        stats: [
          { label: "Délai d'ouverture", value: "24-48h" },
          { label: "Agences partenaires", value: "50+" },
          { label: "Satisfaction client", value: "98%" }
        ]
      },
      {
        id: "nos-cartes",
        title: "Cartes Mastercard",
        subtitle: "5 cartes, 5 univers, vos besoins",
        description: "De la carte Gimtel à la Platinium, trouvez la carte qui correspond à votre rythme de vie et à vos ambitions.",
        cta: "Choisir ma carte",
        ctaLink: "/contact",
        icon: CreditCard,
        color: "purple",
        gradient: "from-[#D9C3A0]/30 to-[#B68C4A]/20",
        avantages: [
          "Avec votre carte, payez et retirez en toute liberté",
          "Une gamme complète de 5 cartes Mastercard adaptées à chaque besoin",
          "Sécurité et fiabilité pour toutes vos transactions"
        ],
        documents: [
          "Faites votre demande auprès de votre conseiller clientèle",
          "Ou directement depuis votre espace e-BNM"
        ],
        stats: [
          { label: "Cartes disponibles", value: "5" },
          { label: "Réseau accepté", value: "200+" },
          { label: "Pays", value: "150+" }
        ]
      },
      {
        id: "carnet-cheque",
        title: "Carnet de chèque",
        subtitle: "Le chèque, mais en mieux",
        description: "Commandez vos chéquiers en ligne et recevez-les en moins de 72h. Un moyen de paiement classique, modernisé.",
        cta: "Commander un chéquier",
        ctaLink: "/contact",
        icon: BookOpen,
        color: "emerald",
        gradient: "from-[#6E8F6B]/20 to-[#0E6B4B]/10",
        avantages: [
          "Paiement fiable, rapide et sécurisé",
          "Commande à distance via e-BNM, livré en moins de 72h",
          "Un suivi en temps réel de vos chéquiers"
        ],
        documents: [
          "Faites une demande auprès de votre conseiller clientèle",
          "Ou commandez directement depuis votre compte e-BNM"
        ],
        stats: [
          { label: "Délai de livraison", value: "< 72h" },
          { label: "Commande en ligne", value: "Oui" },
          { label: "Sécurité", value: "Maximale" }
        ]
      }
    ]
  },
  {
    id: "epargner",
    title: "Épargne & Placement",
    tagline: "Préparez demain, sereinement",
    icon: PiggyBank,
    gradient: "from-[#0A4A36] to-[#0E6B4B]",
    subOffres: [
      {
        id: "epargne-classique",
        title: "Épargne Classique",
        subtitle: "Fructifiez votre capital en toute sécurité",
        description: "Préparez l'avenir avec un compte épargne rémunéré. Gratuit à l'ouverture, il vous permet de faire fructifier votre patrimoine sans risque.",
        cta: "Ouvrir un compte épargne",
        ctaLink: "/contact",
        icon: PiggyBank,
        color: "emerald",
        gradient: "from-[#0E6B4B]/10 to-[#6E8F6B]/20",
        avantages: [
          "Faites fructifier vos économies en toute sécurité",
          "Un compte épargne gratuit, ouvert en quelques minutes",
          "Préparez sereinement vos projets futurs"
        ],
        documents: [
          "Deux photos d'identité",
          "Une copie du CIN ou du passeport",
          "Un certificat de résidence",
          "Un spécimen de signature"
        ],
        stats: [
          { label: "Taux d'intérêt", value: "Compétitif" },
          { label: "Frais d'ouverture", value: "Gratuit" },
          { label: "Accessible", value: "À tous" }
        ]
      },
      {
        id: "epargne-islamique",
        title: "Épargne Islamique",
        subtitle: "Placement éthique, valeurs sûres",
        description: "Une solution d'épargne respectueuse des préceptes islamiques. Fiez-vous à BNM pour un placement fiable, sécurisé et en accord avec vos valeurs.",
        cta: "Découvrir l'épargne islamique",
        ctaLink: "/contact",
        icon: Star,
        color: "amber",
        gradient: "from-[#B68C4A]/15 to-[#D9C3A0]/30",
        avantages: [
          "Une épargne conforme aux principes de la Charia",
          "Sécurité et fiabilité d'une grande banque nationale",
          "Construisez un avenir serein en toute quiétude"
        ],
        documents: [
          "Deux photos d'identité",
          "Une copie du CIN ou du passeport",
          "Un certificat de résidence",
          "Un spécimen de signature"
        ],
        stats: [
          { label: "Conformité", value: "Charia" },
          { label: "Frais d'ouverture", value: "Gratuit" },
          { label: "Sécurité", value: "Maximale" }
        ]
      }
    ]
  },
  {
    id: "emprunter",
    title: "Crédits & Financements",
    tagline: "Réalisez vos projets, quel qu'en soit le prix",
    icon: TrendingUp,
    gradient: "from-[#B68C4A] to-[#0E6B4B]",
    subOffres: [
      {
        id: "credit-consommation",
        title: "Crédit à la Consommation",
        subtitle: "Vos projets n'attendent pas",
        description: "Nouvelle voiture, équipements, travaux : réalisez vos envies avec un crédit souple, accessible et adapté à votre capacité financière.",
        cta: "Simuler mon crédit",
        ctaLink: "/contact",
        icon: ShoppingBag,
        color: "violet",
        gradient: "from-[#B68C4A]/15 to-[#0E6B4B]/10",
        avantages: [
          "Un financement sur-mesure pour concrétiser vos projets",
          "Des crédits souples adaptés à votre capacité financière",
          "Un accompagnement pour que chaque projet devienne réalité"
        ],
        documents: [
          "Une demande manuscrite",
          "Une copie du contrat de travail",
          "Une domiciliation du salaire",
          "Relevé de compte des 6 derniers mois",
          "Une garantie bancaire"
        ],
        stats: [
          { label: "Montant max", value: "Jusqu'à 10M MRU" },
          { label: "Durée", value: "12-60 mois" },
          { label: "Taux", value: "À partir de 5.5%" }
        ]
      },
      {
        id: "credit-oxygene",
        title: "Crédit Oxygène",
        subtitle: "Les bons moments ne s'anticipent pas",
        description: "Rentrée scolaire, Ramadan, fêtes religieuses : soufflez avec nos crédits ponctuels Oxygène, pensés pour les moments importants de l'année.",
        cta: "Souffler avec Oxygène",
        ctaLink: "/contact",
        icon: Zap,
        color: "orange",
        gradient: "from-[#B68C4A]/20 to-[#D9C3A0]/30",
        avantages: [
          "Des crédits ponctuels pour les moments clés de l'année",
          "Préparez la rentrée scolaire de vos enfants",
          "Partagez les fêtes religieuses et le Ramadan en famille"
        ],
        documents: [
          "Faites une demande auprès de votre conseiller financier clientèle"
        ],
        stats: [
          { label: "Sans intérêt", value: "Possible" },
          { label: "Réponse rapide", value: "48h" },
          { label: "Saisons", value: "4/an" }
        ]
      },
      {
        id: "credit-investissement",
        title: "Crédit Investissement",
        subtitle: "Construisez votre patrimoine",
        description: "Acquisition, construction, rénovation : bâtissez votre avenir avec un crédit sur-mesure. Chez BNM, vos ambitions sont notre priorité.",
        cta: "Financer mon projet",
        ctaLink: "/contact",
        icon: Rocket,
        color: "blue",
        gradient: "from-[#0E6B4B]/10 to-[#6E8F6B]/20",
        avantages: [
          "Un crédit immobilier adapté à chaque projet (achat, construction, rénovation)",
          "Des conditions avantageuses pour concrétiser vos rêves",
          "Un accompagnement personnalisé à chaque étape"
        ],
        documents: [
          "Une demande manuscrite",
          "Une copie du contrat de travail",
          "Une domiciliation du salaire",
          "Relevé de compte des 6 derniers mois",
          "Garantie bancaire"
        ],
        stats: [
          { label: "Montant max", value: "Jusqu'à 50M MRU" },
          { label: "Durée", value: "Jusqu'à 20 ans" },
          { label: "Taux", value: "À partir de 4.5%" }
        ]
      }
    ]
  }
];

function SubOffreCard({ subOffre, active, onClick }: { subOffre: SubOffre; active: boolean; onClick: () => void }) {
  const Icon = subOffre.icon;
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
  const [activeTab, setActiveTab] = useState<"avantages" | "documents">("avantages");

  return (
    <div id={`suboffre-${offre.id}`} className="space-y-8">
      <div className={`bg-gradient-to-br ${offre.gradient} rounded-none p-6 md:p-8 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <offre.icon className="w-full h-full" />
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 backdrop-blur rounded-xl shrink-0">
            <offre.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{offre.title}</h3>
            <p className="text-white/80 text-sm">{offre.subtitle}</p>
          </div>
        </div>
      </div>

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

      <p className="text-muted-foreground leading-relaxed">{offre.description}</p>

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
              <span>Avantages</span>
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
              <span>Documents</span>
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

      <Link href={offre.ctaLink}>
        <Button className="bg-primary text-white hover:bg-primary/90 rounded-none group w-full md:w-auto">
          <span>{offre.cta}</span>
          <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Button>
      </Link>
    </div>
  );
}

export default function Professionnels() {
  const { data: offres, isLoading } = useListOffres({ categorie: "professionnels" });
  const offresArray = Array.isArray(offres) ? offres : [];
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [activeSubOffre, setActiveSubOffre] = useState<string>(sections[0].subOffres[0].id);

  const currentSection = sections.find(s => s.id === activeSection)!;
  const currentSubOffre = currentSection.subOffres.find(s => s.id === activeSubOffre)!;
  const currentIndex = currentSection.subOffres.findIndex(s => s.id === activeSubOffre);

  const heroImage = "/assets/images/Professionnels.jpg.jpeg";

  const quickActions = [
    {
      title: "Être client BNM",
      desc: "Ouvrez un compte et découvrez une banque qui vous accompagne au quotidien.",
      icon: Users,
      link: "/devenir-client",
      gradient: "from-[#0E6B4B] to-[#6E8F6B]"
    },
    {
      title: "Régler vos achats",
      desc: "Avec votre carte Mastercard, payez partout en toute simplicité.",
      icon: CreditCard,
      link: "#",
      gradient: "from-[#B68C4A] to-[#D9C3A0]"
    },
    {
      title: "Paiement sécurisé",
      desc: "Optez pour le chéquier BNM, fiabilité et rapidité garanties.",
      icon: ShieldCheck,
      link: "#",
      gradient: "from-[#6E8F6B] to-[#0E6B4B]"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
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
              Banque des Professionnels
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Votre succès,<br />
              <span className="text-secondary">notre métier</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
              Artisans, commerçants, professions libérales — nous construisons ensemble les solutions bancaires qui accélèrent votre croissance.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 group">
                  On démarre ? <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
              <Link href="#sections">
                <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 bg-transparent">
                  Explorer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="sections" className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-3 overflow-x-auto hide-scrollbar">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setActiveSubOffre(section.subOffres[0].id);
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

      <section className={`bg-gradient-to-r ${currentSection.gradient} text-white`}>
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/15 backdrop-blur rounded-xl">
              <currentSection.icon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{currentSection.title}</h2>
              <p className="text-white/80 mt-1">{currentSection.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="relative lg:sticky lg:top-28 space-y-6">
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Navigation</p>
                  <p className="text-sm text-muted-foreground">Vous souhaitez...</p>
                </div>
                <div className="space-y-1">
                  {currentSection.subOffres.map((sub) => (
                    <SubOffreCard
                      key={sub.id}
                      subOffre={sub}
                      active={activeSubOffre === sub.id}
                      onClick={() => setActiveSubOffre(sub.id)}
                    />
                  ))}
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
            <div className="lg:col-span-8">
              <OffreContent offre={currentSubOffre} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-muted/50 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary">Vous souhaitez...</h2>
            <p className="text-muted-foreground mt-2">Choisissez parmi nos services rapides</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {quickActions.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link key={i} href={item.link}>
                  <div className="group relative overflow-hidden border border-border bg-white hover:shadow-xl transition-all duration-500">
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
                        En savoir plus <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Toutes nos offres</h2>
              <p className="text-muted-foreground">Des solutions pensées pour les professionnels</p>
            </div>
            <Link href="/contact" className="hidden sm:flex items-center text-sm font-semibold text-primary hover:text-secondary transition-colors">
              Voir tout <ArrowRight className="ml-1 w-4 h-4" />
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
                let Icon = Building;
                let gradient = "from-[#0E6B4B] to-[#6E8F6B]";
                if (offre.titre.toLowerCase().includes('financement') || offre.titre.toLowerCase().includes('crédit')) {
                  Icon = LineChart; gradient = "from-[#B68C4A] to-[#0E6B4B]";
                } else if (offre.titre.toLowerCase().includes('compte') || offre.titre.toLowerCase().includes('épargne')) {
                  Icon = PiggyBank; gradient = "from-[#0A4A36] to-[#6E8F6B]";
                } else if (offre.titre.toLowerCase().includes('assurance')) {
                  Icon = ShieldCheck; gradient = "from-[#B68C4A] to-[#D9C3A0]";
                } else if (offre.titre.toLowerCase().includes('carte')) {
                  Icon = CreditCard; gradient = "from-[#D9C3A0] to-[#B68C4A]";
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
                        {offre.description || "Une solution sur-mesure pour les professionnels."}
                      </p>
                      <Link href="/contact" className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors mt-auto">
                        En savoir plus <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-12">Aucune offre disponible pour le moment.</p>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary via-primary/95 to-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/20 text-secondary text-sm font-semibold mx-auto">
              <Compass className="w-4 h-4" />
              Conseil personnalisé
            </div>
            <h2 className="text-4xl font-bold text-white">
              Un conseiller dédié pour vous accompagner
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Nos chargés d'affaires professionnels analysent votre projet et vous proposent les solutions les plus adaptées. Prenez rendez-vous dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/contact">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-10 group">
                  Prendre rendez-vous <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
              <Link href="/agences">
                <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 bg-transparent px-10">
                  <MapPin className="mr-2 w-4 h-4" /> Trouver une agence
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}