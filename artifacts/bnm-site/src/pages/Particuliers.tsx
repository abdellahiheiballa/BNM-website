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
import { useState } from "react";

type SubOffre = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaLink: string;
  icon: typeof Landmark;
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
    title: "Comptes & Moyens de Paiement",
    tagline: "Simplifiez votre banque au quotidien",
    icon: Wallet,
    gradient: "from-[#0E6B4B] to-[#0A4A36]",
    subOffres: [
      {
        id: "ouvrir-compte",
        title: "Ouvrir un compte",
        subtitle: "Votre première étape vers la liberté financière",
        description: "Devenir client à la Banque Nationale de Mauritanie, c'est choisir de simplifier la gestion de vos comptes au quotidien. Notre engagement est au service de vos projets personnels et professionnels.",
        cta: "Demander l'ouverture",
        ctaLink: "/contact",
        icon: Diamond,
        gradient: "from-[#0E6B4B]/10 to-[#0A4A36]/10",
        avantages: [
          "Une gestion simplifiée de vos comptes au quotidien",
          "Un accompagnement pour tous ceux qui entreprennent sur le chemin de la réussite",
          "Un service bancaire pensé pour durer avec vous"
        ],
        documents: [
          "Deux photos d'identité",
          "Une copie du CIN ou du passeport",
          "Un certificat de résidence",
          "Une domiciliation de salaire (Compte courant ou Compte de devises)",
          "Un spécimen de signature"
        ],
        stats: [
          { label: "Ouverture", value: "Rapide" },
          { label: "Frais", value: "Gratuit" },
          { label: "Agences", value: "Partout" }
        ]
      },
      {
        id: "mastercard-business",
        title: "Mastercard Business",
        subtitle: "Entreprises / Institutionnel, ONG et Associations",
        description: "Carte dédiée aux entreprises, institutions, ONG et associations.",
        cta: "Choisir Mastercard Business",
        ctaLink: "/contact",
        icon: CreditCard,
        gradient: "from-[#D9C3A0]/30 to-[#B68C4A]/20",
        avantages: [
          "Entreprises / Institutionnel, ONG et Associations",
          "575 MRU / mois",
          "Plafond de retrait : 500 euros / jour",
          "Plafond de paiement : 8 000 euros / jour"
        ],
        documents: [
          "Faire une demande et signer une convention"
        ],
        stats: [
          { label: "Carte", value: "Business" },
          { label: "Retrait", value: "500 €/j" },
          { label: "Paiement", value: "8 000 €/j" }
        ]
      },
      {
        id: "mastercard-classic",
        title: "Mastercard Classic",
        subtitle: "Professionnels & Particuliers",
        description: "La carte classique pour vos paiements et retraits au quotidien.",
        cta: "Choisir Mastercard Classic",
        ctaLink: "/contact",
        icon: CreditCard,
        gradient: "from-[#D9C3A0]/30 to-[#B68C4A]/20",
        avantages: [
          "Professionnels : 345 MRU / mois",
          "Particuliers : 345 MRU / mois",
          "Plafond de retrait : 350 euros / jour",
          "Plafond de paiement : 3 000 euros / jour"
        ],
        documents: [
          "Faire une demande et signer une convention"
        ],
        stats: [
          { label: "Carte", value: "Classic" },
          { label: "Retrait", value: "350 €/j" },
          { label: "Paiement", value: "3 000 €/j" }
        ]
      },
      {
        id: "mastercard-platinum",
        title: "Mastercard Platinum",
        subtitle: "Professionnels, Particuliers, Entreprises / Institutionnel, ONG et Associations",
        description: "La carte haut de gamme pour des plafonds élevés et des services premium.",
        cta: "Choisir Mastercard Platinum",
        ctaLink: "/contact",
        icon: CreditCard,
        gradient: "from-[#D9C3A0]/30 to-[#B68C4A]/20",
        avantages: [
          "Professionnels, particuliers, Entreprises / Institutionnel, ONG et Associations",
          "750 MRU / mois",
          "Plafond de retrait : 2 000 euros / jour",
          "Plafond de paiement : 20 000 euros / jour"
        ],
        documents: [
          "Faire une demande et signer une convention"
        ],
        stats: [
          { label: "Carte", value: "Platinum" },
          { label: "Retrait", value: "2 000 €/j" },
          { label: "Paiement", value: "20 000 €/j" }
        ]
      },
      {
        id: "mastercard-travel",
        title: "Mastercard Travel",
        subtitle: "Carte prépayée",
        description: "Carte prépayée idéale pour vos déplacements et voyages.",
        cta: "Choisir Mastercard Travel",
        ctaLink: "/contact",
        icon: CreditCard,
        gradient: "from-[#D9C3A0]/30 to-[#B68C4A]/20",
        avantages: [
          "Professionnels, particuliers, Entreprises / Institutionnel, ONG et Associations",
          "1 200 MRU à l'achat",
          "Plafond de retrait : 350 euros / jour",
          "Plafond de paiement : 3 000 euros / jour",
          "Recharge minimum : 300 euros",
          "Recharge maximum : 3 000 euros"
        ],
        documents: [
          "Signer la convention",
          "Copie passeport",
          "Justificatif d'adresse"
        ],
        stats: [
          { label: "Carte", value: "Travel" },
          { label: "Achat", value: "1 200 MRU" },
          { label: "Validité", value: "2 ans" }
        ]
      },
      {
        id: "carnet-cheque",
        title: "Carnet de chèque",
        subtitle: "Le chèque réinventé, livré chez vous",
        description: "Disposez d'un chéquier, c'est bénéficier d'un moyen de paiement fiable, rapide et sécurisé. Commandez à distance via e-BNM et recevez-le en moins de 72h.",
        cta: "Commander un chéquier",
        ctaLink: "/contact",
        icon: BookOpen,
        gradient: "from-[#6E8F6B]/20 to-[#0E6B4B]/10",
        avantages: [
          "Un moyen de paiement fiable, rapide et sécurisé",
          "Commande à distance via e-BNM, délivré en moins de 72h",
          "Une tranquillité d'esprit au quotidien"
        ],
        documents: [
          "Auprès de votre conseiller clientèle",
          "A partir de votre compte e-BNM"
        ],
        stats: [
          { label: "Livraison", value: "< 72h" },
          { label: "Commande", value: "En ligne" },
          { label: "Sécurité", value: "Fiable" }
        ]
      }
    ]
  },
  {
    id: "epargne",
    title: "Épargne",
    tagline: "Préparez l'avenir, commencez aujourd'hui",
    icon: PiggyBank,
    gradient: "from-[#0A4A36] to-[#0E6B4B]",
    subOffres: [
      {
        id: "epargne-classique",
        title: "Épargne Classique",
        subtitle: "Fructifiez votre capital sans risque",
        description: "Grâce au compte épargne BNM, décidez de votre avenir avec une multitude de possibilités qui s'ouvrent à vous. Ouvrez gratuitement un compte rémunéré et préparez demain en toute sérénité.",
        cta: "Ouvrir un compte épargne",
        ctaLink: "/contact",
        icon: PiggyBank,
        gradient: "from-[#0E6B4B]/10 to-[#6E8F6B]/20",
        avantages: [
          "Faites fructifier vos économies en toute sécurité",
          "Un compte épargne gratuit, ouvert en quelques minutes",
          "Préparez l'avenir avec sérénité dès aujourd'hui"
        ],
        documents: [
          "Deux photos d'identité",
          "Une copie du CIN ou du passeport",
          "Un certificat de résidence",
          "Un spécimen de signature"
        ],
        stats: [
          { label: "Frais", value: "Gratuit" },
          { label: "Rémunéré", value: "Oui" },
          { label: "Sécurité", value: "Maximale" }
        ]
      },
      {
        id: "epargne-islamique",
        title: "Épargne Islamique",
        subtitle: "Placement éthique, avenir serein",
        description: "Bénéficiez d'une solution d'épargne fiable et sécurisée, respectant les préceptes islamiques. Chez BNM, vos valeurs construisent un avenir meilleur.",
        cta: "Découvrir l'épargne islamique",
        ctaLink: "/contact",
        icon: Star,
        gradient: "from-[#B68C4A]/15 to-[#D9C3A0]/30",
        avantages: [
          "Une épargne conforme aux préceptes de la Charia",
          "Sûreté, confiance et avenir meilleur pour réaliser vos objectifs",
          "Construisez en toute quiétude vos projets de demain"
        ],
        documents: [
          "Deux photos d'identité",
          "Une copie du CIN ou du passeport",
          "Un certificat de résidence",
          "Un spécimen de signature"
        ],
        stats: [
          { label: "Conformité", value: "Charia" },
          { label: "Frais", value: "Gratuit" },
          { label: "Sécurité", value: "Maximale" }
        ]
      }
    ]
  },
  {
    id: "emprunter",
    title: "Emprunter",
    tagline: "Réalisez tous vos projets, pas à pas",
    icon: TrendingUp,
    gradient: "from-[#B68C4A] to-[#0E6B4B]",
    subOffres: [
      {
        id: "credit-consommation",
        title: "Crédit à la Consommation",
        subtitle: "Crédit à moyen et long terme",
        description: "Ce financement est destiné à l'acquisition de biens d'équipement tels que le mobilier, l'électroménager, les véhicules, ainsi que tout autre besoin de consommation.",
        cta: "Simuler mon crédit",
        ctaLink: "/contact",
        icon: ShoppingBag,
        gradient: "from-[#B68C4A]/15 to-[#0E6B4B]/10",
        avantages: [
          "Financement des biens d'équipement et des projets de consommation",
          "Des solutions adaptées à vos besoins de moyen et long terme",
          "Un accompagnement personnalisé pour chaque dossier"
        ],
        documents: [
          "Une demande manuscrite",
          "Une copie du contrat de travail",
          "Une domiciliation du salaire",
          "Relevé de compte des 6 derniers mois",
          "Une garantie bancaire"
        ],
        stats: [
          { label: "Montant max", value: "Selon dossier" },
          { label: "Durée", value: "Moyen et long terme" },
          { label: "Taux", value: "Selon offre" }
        ]
      },
      {
        id: "credit-equipement",
        title: "Crédit Équipement",
        subtitle: "Financement de vos équipements",
        description: "Ce crédit permet d'acquérir des équipements professionnels et personnels : mobilier, électroménager, véhicules et autres biens d'investissement. Montant équivalent à 12 mois de salaire, remboursable sur 48 mois.",
        cta: "Simuler mon crédit",
        ctaLink: "/contact",
        icon: Car,
        gradient: "from-[#0E6B4B]/10 to-[#6E8F6B]/20",
        avantages: [
          "Financement des équipements indispensables à votre quotidien",
          "Montant équivalent à 12 mois de salaire",
          "Remboursement sur 48 mois",
          "Un accompagnement personnalisé pour sécuriser votre achat"
        ],
        documents: [
          "Une demande manuscrite",
          "Une copie du contrat de travail",
          "Une domiciliation du salaire",
          "Relevé de compte des 6 derniers mois",
          "Une garantie bancaire"
        ],
        stats: [
          { label: "Montant max", value: "12 mois de salaire" },
          { label: "Durée", value: "48 mois" },
          { label: "Taux", value: "Selon offre" }
        ]
      },
      {
        id: "credit-oxygene",
        title: "Crédit Fêtes et Rentrée scolaire",
        subtitle: "Crédit court terme",
        description: "Cette facilité est accordée à l'occasion des fêtes religieuses (Aïd El-Fitr, Aïd El-Adha et Ramadan) ainsi qu'à l'ouverture de l'année scolaire. Le montant du prêt est limité à un (1) mois de salaire, avec un plafond de 50 000 MRU, remboursable sur une durée maximale de 10 mois, à un taux de 0 %.",
        cta: "Souffler avec Oxygène",
        ctaLink: "/contact",
        icon: Zap,
        gradient: "from-[#B68C4A]/20 to-[#D9C3A0]/30",
        avantages: [
          "Une facilité dédiée aux fêtes religieuses et à la rentrée scolaire",
          "Montant limité à un mois de salaire avec un plafond de 50 000 MRU",
          "Remboursement sur une durée maximale de 10 mois à 0 %"
        ],
        documents: [
          "Faites une demande auprès de votre conseiller financier clientèle"
        ],
        stats: [
          { label: "Plafond", value: "50 000 MRU" },
          { label: "Durée max", value: "10 mois" },
          { label: "Taux", value: "0 %" }
        ]
      },
      {
        id: "credit-investissement",
        title: "Crédit Immobilier",
        subtitle: "Jusqu'à 36 mois de salaire",
        description: "Ce financement est destiné à l'acquisition, à la construction ou à la rénovation d'un bien immobilier. Le montant du crédit peut atteindre jusqu'à 36 mois de salaire, remboursable sur une durée maximale de 145 mois, à un taux de 10 % l'an.",
        cta: "Financer mon projet",
        ctaLink: "/contact",
        icon: Rocket,
        gradient: "from-[#0E6B4B]/10 to-[#6E8F6B]/20",
        avantages: [
          "Acquisition, construction ou rénovation d'un bien immobilier",
          "Jusqu'à 36 mois de salaire de crédit",
          "Un accompagnement personnalisé jusqu'à la mise en œuvre du projet"
        ],
        documents: [
          "Une demande manuscrite",
          "Une copie du contrat de travail",
          "Une domiciliation du salaire",
          "Relevé de compte des 6 derniers mois",
          "Garantie bancaire"
        ],
        stats: [
          { label: "Montant max", value: "36 mois de salaire" },
          { label: "Durée max", value: "145 mois" },
          { label: "Taux", value: "10 %" }
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
      {/* Hero mini-section */}
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
  const { data: offres, isLoading } = useListOffres({ categorie: "particuliers" });
  const offresArray = Array.isArray(offres) ? offres : [];
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [activeSubOffre, setActiveSubOffre] = useState<string>(sections[0].subOffres[0].id);

  const currentSection = sections.find(s => s.id === activeSection)!;
  const currentSubOffre = currentSection.subOffres.find(s => s.id === activeSubOffre)!;
  const currentIndex = currentSection.subOffres.findIndex(s => s.id === activeSubOffre);

  const heroImage = "/assets/images/particuliers.jpg.jpeg";

  const quickActions = [
    {
      title: "Constituez un patrimoine",
      desc: "Bénéficiez d'une solution d'épargne fiable et sécurisée.",
      icon: PiggyBank,
      link: "#",
      gradient: "from-[#0E6B4B] to-[#6E8F6B]",
      section: "epargne",
      sub: "epargne-classique"
    },
    {
      title: "Épargne islamique",
      desc: "Bénéficiez d'une solution d'épargne respectant les préceptes islamiques.",
      icon: Star,
      link: "#",
      gradient: "from-[#B68C4A] to-[#D9C3A0]",
      section: "epargne",
      sub: "epargne-islamique"
    }
  ];

  const borrowActions = [
    {
      title: "Crédit à la Consommation",
      desc: "Acquérir du mobilier, de l'électroménager, des véhicules et répondre à vos besoins de consommation.",
      icon: ShoppingBag,
      link: "#",
      gradient: "from-[#0E6B4B] to-[#0A4A36]",
      section: "emprunter",
      sub: "credit-consommation"
    },
    {
      title: "Crédit Fêtes et Rentrée scolaire",
      desc: "Une facilité de trésorerie pour les fêtes religieuses et l'ouverture de l'année scolaire.",
      icon: Heart,
      link: "#",
      gradient: "from-[#B68C4A] to-[#D9C3A0]",
      section: "emprunter",
      sub: "credit-oxygene"
    },
    {
      title: "Crédit Immobilier",
      desc: "Un financement immobilier jusqu'à 36 mois de salaire pour acheter, construire ou rénover.",
      icon: Home,
      link: "#",
      gradient: "from-[#6E8F6B] to-[#0E6B4B]",
      section: "emprunter",
      sub: "credit-investissement"
    }
  ];

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
              Banque des Particuliers
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              La vie est faite de<br />
              <span className="text-secondary">projets</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
              Des solutions bancaires conçues pour vous accompagner au quotidien et réaliser vos projets de vie, simplement.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 group">
                  On commence ? <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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

      {/* Section Tabs - Sticky */}
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

      {/* Section Banner */}
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

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Sidebar */}
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

            {/* Content area */}
            <div className="lg:col-span-8">
              <OffreContent offre={currentSubOffre} />
            </div>
          </div>
        </div>
      </section>

      {/* Vous souhaitez... - Épargne actions */}
      <section className="py-16 bg-gradient-to-br from-muted/50 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary">Vous souhaitez...</h2>
            <p className="text-muted-foreground mt-2">Choisissez ce qui vous correspond</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {quickActions.map((item, i) => {
              const Icon = item.icon;
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
                      En savoir plus <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <h3 className="text-2xl font-bold text-primary text-center mb-8">Vous souhaitez aussi...</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {borrowActions.map((item, i) => {
              const Icon = item.icon;
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
                      En savoir plus <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              <h2 className="text-3xl font-bold text-primary mb-2">Toutes nos offres</h2>
              <p className="text-muted-foreground">Des solutions pensées pour chaque étape de votre vie</p>
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
                        {offre.description || "Une solution sur-mesure pour les particuliers."}
                      </p>
                      {(offre.clickByBnm || /compte\s*courant\s*particulier/i.test(offre.titre)) && (
                        <div className="mb-4 border border-secondary/30 bg-secondary/10 p-3 text-sm font-medium text-primary">
                          Liaison automatique avec Click by BNM (portefeuille mobile)
                        </div>
                      )}
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/95 to-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/20 text-secondary text-sm font-semibold mx-auto">
              <Compass className="w-4 h-4" />
              Prêt à passer à l'action ?
            </div>
            <h2 className="text-4xl font-bold text-white">
              Estimez votre capacité d'emprunt
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Simulez vos mensualités et votre capacité d'emprunt en quelques clics. C'est gratuit et sans engagement.
            </p>
            <div className="pt-6">
              <Link href="/simulateur">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-10 group">
                  Accéder au simulateur <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}