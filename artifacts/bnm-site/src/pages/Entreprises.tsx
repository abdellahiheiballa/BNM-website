import { useListOffres } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Globe2, BarChart3, ArrowLeftRight, Landmark, Building2, 
  PiggyBank, LineChart, ShieldCheck, Handshake, FileText, CheckCircle, 
  Users, Wallet, TrendingUp, ChevronRight, Phone, FileCheck, CreditCard,
  Lock, Smartphone, Calendar, DollarSign, RefreshCw, Award, HelpCircle,
  BookOpen, Mail, MapPin, Sparkles, ArrowUpRight, Compass, Check
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const sections = [
  {
    id: "gerer-comptes",
    title: "Gérer vos comptes",
    subtitle: "Centraliser vos flux pour réaliser vos opérations bancaires et optimiser la gestion de vos comptes au quotidien",
    icon: Building2,
    color: "from-[#0E6B4B] to-[#0A4A36]",
    subOffres: [
      {
        id: "comptes-moyens-paiement",
        title: "Comptes et moyens de paiements",
        description: "La Banque Nationale de Mauritanie centralise vos flux d'opérations et optimise la gestion de vos comptes.",
        cta: "Contactez un conseiller clientèle",
        avantages: [
          "Parce que gérer une entreprise n'est pas anodin, la Banque Nationale de Mauritanie propose des solutions qui sauront répondre aux besoins de sa clientèle en termes de financement, de gestion de trésorerie ou d'accompagnement à la croissance."
        ],
        documents: [
          "Une demande d'ouverture de compte sur entête de l'entreprise",
          "Une copie du numéro d'identification fiscal (NIF)",
          "Une copie du statut de l'entreprise",
          "Une copie du registre du commerce",
          "Un justificatif d'adresse",
          "Une copie des pièces d'identité des actionnaires",
          "Une copie des pièces d'identité des signataires"
        ]
      },
      {
        id: "e-bnm",
        title: "e-BNM",
        description: "La Banque Nationale de Mauritanie centralise vos flux d'opérations et optimise la gestion de vos comptes.",
        cta: "Contactez un conseiller clientèle",
        avantages: [
          "Grâce à notre application mobile, réalisez vos opérations bancaires à distance, profiter de ses nombreuses fonctionnalités et gérer vos comptes en toute sécurité.",
          "Chez la Banque Nationale de Mauritanie, nous savons que le temps est précieux. C'est ainsi que nous avons développé un outil de suivi des opérations courantes quel que soit l'emplacement de nos entreprises afin de leur de permettre l'optimisation de la gestion de leur quotidien."
        ],
        documents: [
          "Vous désirez souscrire au produit e-BNM, faites une demande auprès de conseiller clientèle."
        ]
      }
    ]
  },
  {
    id: "gerer-tresorerie",
    title: "Gérer votre trésorerie",
    subtitle: "Découvrez nos solutions de trésorerie adaptées à vos besoins.",
    icon: PiggyBank,
    color: "from-[#0A4A36] to-[#0E6B4B]",
    subOffres: [
      {
        id: "decouvert-bancaire",
        title: "Découvert bancaire",
        description: "Couverture des décalages temporaires de trésorerie. Réponse aux besoins récurrents de financement à court terme.",
        cta: "Contactez un conseiller clientèle",
        avantages: [
          "Gérez vos flux sans interruption grâce à un découvert flexible",
          "Répondez aux besoins de financement à court terme de votre entreprise",
          "Conservez votre capacité d'achat même lorsque la trésorerie est tendue"
        ],
        documents: [
          "Faites une demande auprès de votre conseiller clientèle."
        ]
      },
      {
        id: "facilite-caisse",
        title: "Facilité de caisse",
        description: "Financement ponctuel des besoins de trésorerie. Utilisée dans l'attente d'un encaissement ou d'un virement.",
        cta: "Contactez un conseiller clientèle",
        avantages: [
          "Une solution rapide pour couvrir vos besoins de trésorerie immédiats",
          "Utilisée pour faire face à des délais de paiement temporaires",
          "Permet de maintenir l'activité en attendant un encaissement"
        ],
        documents: [
          "Vous souhaitez bénéficiez d'une facilité de caisse, faites une demande auprès de votre conseiller clientèle."
        ]
      },
      {
        id: "escompte-commercial",
        title: "Escompte commercial",
        description: "Mobilisation anticipée des créances commerciales. Permet d'obtenir le règlement des factures avant leur échéance.",
        cta: "Contactez un conseiller clientèle",
        avantages: [
          "Améliorez votre trésorerie en obtenant le paiement anticipé de vos factures",
          "Réduisez le délai de conversion de vos créances clients en liquidités",
          "Concentrez-vous sur votre activité pendant que la banque prend en charge le recouvrement"
        ],
        documents: [
          "Faites une demande auprès de votre conseiller clientèle."
        ]
      },
      {
        id: "factoring",
        title: "Factoring (Affacturage)",
        description: "Cession des créances clients à la banque. Amélioration de la trésorerie et réduction des délais d'encaissement.",
        cta: "Contactez un conseiller clientèle",
        avantages: [
          "Mobilisez vos créances clients de manière anticipée",
          "Améliorez votre trésorerie sans attendre la date d'échéance des factures",
          "Réduisez les délais d'encaissement et sécurisez votre cycle d'exploitation"
        ],
        documents: [
          "Faites une demande auprès de votre conseiller clientèle."
        ]
      },
      {
        id: "mourabaha",
        title: "Mourabaha (Finance islamique)",
        description: "Financement conforme aux principes de la Charia. Destiné à l'acquisition de biens d'équipement, de véhicules ou d'autres actifs professionnels.",
        cta: "Contactez un conseiller clientèle",
        avantages: [
          "Une solution conforme aux principes islamiques",
          "Acquisition de biens d'équipement, véhicules et actifs professionnels",
          "Un financement structuré pour les entreprises souhaitant respecter la Charia"
        ],
        documents: [
          "Faites une demande auprès de votre conseiller clientèle."
        ]
      },
      {
        id: "depot-terme",
        title: "Produits de trésorerie et placements",
        description: "Dépôts à terme (DAT). Solutions de gestion de trésorerie destinées aux entreprises.",
        cta: "Contactez un conseiller clientèle",
        avantages: [
          "Placez vos excédents de trésorerie en toute sécurité",
          "Bénéficiez de solutions de gestion de trésorerie adaptées à votre entreprise",
          "Optimisez votre rendement tout en conservant une structure financière saine"
        ],
        documents: [
          "Vous souhaitez bénéficier d'un DAT, faites une demande à votre conseiller clientèle."
        ]
      }
    ]
  },
  {
    id: "financer-investissements",
    title: "Financer vos investissements",
    subtitle: "La Banque Nationale de Mauritanie vous propose des solutions sur mesure.",
    icon: TrendingUp,
    color: "from-[#B68C4A] to-[#0E6B4B]",
    subOffres: [
      {
        id: "financement-investissement",
        title: "Financement d'investissement",
        description: "Financement destiné à l'acquisition d'équipements, de matériels, de véhicules, à la réalisation de projets d'extension ou à tout investissement productif.",
        cta: "Contactez un conseiller clientèle",
        avantages: [
          "Acquérir des équipements et matériels pour renforcer votre activité",
          "Financer vos projets productifs et d'extension",
          "Une solution conçue pour les investissements à moyen et long terme"
        ],
        documents: [
          "Faites une demande auprès de votre conseiller clientèle."
        ]
      },
      {
        id: "cautions",
        title: "Cautions bancaires",
        description: "Caution de soumission. Caution de bonne exécution. Caution de restitution d'avance. Cautions douanières et administratives.",
        cta: "Contactez un conseiller clientèle",
        avantages: [
          "Caution de soumission pour garantir vos offres commerciales",
          "Caution de bonne exécution pour rassurer vos partenaires",
          "Cautions douanières et administratives pour faciliter vos opérations"
        ],
        documents: [
          "Vous souhaitez obtenir une caution, faites une demande auprès de votre conseiller clientèle."
        ]
      }
    ]
  },
  {
    id: "international",
    title: "Développer votre activité à l'internationale",
    subtitle: "Grâce à notre large réseau de correspondant effectuez vos transferts et mettez en place des garanties de paiements spécifiques.",
    icon: Globe2,
    color: "from-[#B68C4A] to-[#6E8F6B]",
    subOffres: [
      {
        id: "transferts",
        title: "Transferts",
        description: "La Banque Nationale de Mauritanie vous fait bénéficier de son savoir-faire à l'international.",
        cta: "Contactez un conseiller clientèle",
        avantages: [
          "Chez la Banque Nationale de Mauritanie, évoluer dans un climat de confiance avec son large réseau de partenaires étrangers est un travail au quotidien. Elle propose à sa clientèle Entreprise le transfert international, un moyen de paiement simple et rapide."
        ],
        documents: [
          "Pour accéder à ces services, vous devez émettre une demande auprès de conseiller clientèle."
        ]
      },
      {
         id: "credit-documentaire",
         title: "Crédit documentaire (CREDOC)",
        description: "La Banque Nationale de Mauritanie vous fait bénéficier de son savoir-faire à l'international.",
        cta: "Contactez un conseiller clientèle",
        avantages: [
          "Vous faites de l'import-export, bénéficiez des avantages d'un crédit documentaire pour sécuriser vos échanges commerciaux internationaux.",
          "Réduction des risques entre acheteurs et fournisseurs",
          "Facilitez vos opérations commerciales avec une solution bancaire structurée"
        ],
        documents: [
          "Pour accéder à ses services, vous devrez émettre une demande à votre conseiller clientèle."
        ]
      }
    ]
  }
];

function OffreDetail({ offre }: { offre: typeof sections[0]['subOffres'][0] }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"avantages" | "documents">("avantages");

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-lg leading-relaxed">{offre.description}</p>

      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("avantages")}
          className={`pb-3 px-4 text-sm font-semibold transition-colors relative ${
            activeTab === "avantages"
              ? "text-primary border-b-2 border-secondary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          {t("businesses.advantages")}
        </button>
        <button
          onClick={() => setActiveTab("documents")}
          className={`pb-3 px-4 text-sm font-semibold transition-colors relative ${
            activeTab === "documents"
              ? "text-primary border-b-2 border-secondary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          {t("businesses.documents")}
        </button>
      </div>

      {activeTab === "avantages" && (
        <div className="space-y-4">
          {offre.avantages.map((avantage, i) => (
            <div key={i} className="flex gap-3">
              <Award className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <p className="text-muted-foreground leading-relaxed">{avantage}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "documents" && (
        <div className="space-y-3">
          {offre.documents.map((doc, i) => (
            <div key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {i + 1}
              </span>
              <p className="text-muted-foreground leading-relaxed">{doc}</p>
            </div>
          ))}
        </div>
      )}

      <div className="pt-4">
        <Link href="/contact">
          <Button className="bg-primary text-white hover:bg-primary/90 rounded-none">
            {offre.cta} <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function Entreprises() {
  const { t } = useTranslation();
  const { data: offres, isLoading } = useListOffres({ categorie: "entreprises" });
  const offresArray = Array.isArray(offres) ? offres : [];
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [activeSubOffre, setActiveSubOffre] = useState<string>(sections[0].subOffres[0].id);

  const localizedSections = sections.map((section) => {
    const sectionTranslations: Record<string, string> = {
      "gerer-comptes": t("products.entreprises.sections.gererComptes", { defaultValue: "Gérer vos comptes" }),
      "gerer-tresorerie": t("products.entreprises.sections.gererTresorerie", { defaultValue: "Gérer votre trésorerie" }),
      "financer-investissements": t("products.entreprises.sections.financerInvestissements", { defaultValue: "Financer vos investissements" }),
      international: t("products.entreprises.sections.developperInternational", { defaultValue: "Développer votre activité à l'international" }),
    };
    const sectionSubtitleTranslations: Record<string, string> = {
      "gerer-comptes": t("products.entreprises.descriptions.comptes", { defaultValue: section.subtitle }),
      "gerer-tresorerie": t("products.entreprises.sectionContent.gererTresorerie", { defaultValue: section.subtitle }),
      "financer-investissements": t("products.entreprises.sectionContent.financerInvestissements", { defaultValue: section.subtitle }),
      international: t("products.entreprises.sectionContent.international", { defaultValue: section.subtitle }),
    };
    const offerKeys: Record<string, string> = {
      "decouvert-bancaire": "decouvert",
      "facilite-caisse": "facilite",
      "escompte-commercial": "escompte",
      factoring: "factoring",
      mourabaha: "mourabaha",
      "depot-terme": "depot",
      "financement-investissement": "investissement",
      cautions: "cautions",
      transferts: "transferts",
      "credit-documentaire": "credoc",
    };
    const subOffres = section.subOffres.map((offre) => {
      if (offre.id === "comptes-moyens-paiement") {
        return {
          ...offre,
          title: t("products.entreprises.descriptions.ebnm", { defaultValue: "Comptes et moyens de paiements" }),
          description: t("products.entreprises.descriptions.comptesDetail", { defaultValue: offre.description }),
          cta: t("products.entreprises.contactCta", { defaultValue: "Contactez un conseiller clientèle" }),
          avantages: [t("products.entreprises.descriptions.comptesAdvantage", { defaultValue: offre.avantages[0] })],
        };
      }
      if (offre.id === "e-bnm") {
        return {
          ...offre,
          title: t("products.entreprises.ebnm.title", { defaultValue: "e-BNM" }),
          description: t("products.entreprises.ebnm.description", { defaultValue: offre.description }),
          cta: t("products.entreprises.ebnm.cta", { defaultValue: "Contactez un conseiller clientèle" }),
          avantages: t<string[]>("products.entreprises.ebnm.advantages", { returnObjects: true, defaultValue: offre.avantages }),
          documents: t<string[]>("products.entreprises.ebnm.documents", { returnObjects: true, defaultValue: offre.documents }),
        };
      }
      const offerKey = offerKeys[offre.id];
      if (offerKey) {
        const key = (field: string) => `products.entreprises.offers.${offerKey}.${field}`;
        return {
          ...offre,
          title: t(key("title"), { defaultValue: offre.title }),
          description: t(key("description"), { defaultValue: offre.description }),
          cta: t("products.entreprises.contactCta", { defaultValue: offre.cta }),
          avantages: t<string[]>(key("advantages"), { returnObjects: true, defaultValue: offre.avantages }),
          documents: t<string[]>(key("documents"), { returnObjects: true, defaultValue: offre.documents }),
        };
      }
      return offre;
    });
    return {
      ...section,
      title: sectionTranslations[section.id] ?? section.title,
      subtitle: sectionSubtitleTranslations[section.id] ?? section.subtitle,
      subOffres,
    };
  });
  const currentSection = localizedSections.find(s => s.id === activeSection)!;
  const currentSubOffre = currentSection.subOffres.find(s => s.id === activeSubOffre)!;

  const heroImage = "/assets/images/Entreprises.jpg.jpeg";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center">
        <div className="absolute inset-0 bg-primary/80 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="container relative z-20 mx-auto px-4">
          <div className="max-w-2xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
              {t("businesses.badge")}
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              {t("businesses.heroDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links / Section Navigation */}
      <section className="py-12 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {localizedSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setActiveSubOffre(section.subOffres[0].id);
                  }}
                  className={`flex items-center gap-3 px-6 py-4 rounded-none transition-all duration-300 text-left ${
                    activeSection === section.id
                      ? "bg-primary text-white shadow-lg scale-105"
                      : "bg-background text-primary hover:bg-primary/10 border border-border"
                  }`}
                >
                  <Icon className="w-6 h-6 shrink-0" />
                  <span className="font-semibold text-sm">{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content - Dynamic Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <currentSection.icon className="w-8 h-8 text-secondary" />
              <h2 className="text-3xl font-serif font-bold text-primary">{currentSection.title}</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl">{currentSection.subtitle}</p>
          </div>

          {/* Sub-offres sidebar + content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sidebar - Sub-offres tabs */}
            <div className="lg:col-span-1">
              <div className="space-y-2 sticky top-24">
                <p className="text-sm font-bold text-primary uppercase tracking-wider mb-4">{t("businesses.youWant")}</p>
                {currentSection.subOffres.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubOffre(sub.id)}
                    className={`w-full text-left p-4 transition-all duration-200 flex items-center gap-3 ${
                      activeSubOffre === sub.id
                        ? "bg-primary text-white shadow-md"
                        : "bg-muted/50 text-foreground hover:bg-muted border border-border"
                    }`}
                  >
                    <ChevronRight className={`w-4 h-4 shrink-0 ${
                      activeSubOffre === sub.id ? "text-secondary" : "text-primary"
                    }`} />
                    <span className="font-semibold text-sm">{sub.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-2">
              <Card className="rounded-none shadow-sm border-t-4 border-t-secondary">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">
                    {currentSubOffre.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <OffreDetail offre={currentSubOffre} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Besoin d'aide? CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <HelpCircle className="w-12 h-12 text-secondary mx-auto" />
            <h2 className="text-3xl font-serif font-bold">{t("businesses.help")}</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              {t("businesses.helpDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 rounded-none">
                  <Phone className="mr-2 w-5 h-5" /> {t("businesses.contactAdvisor")}
                </Button>
              </Link>
              <Link href="/agences">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-none bg-transparent">
                  <MapPin className="mr-2 w-5 h-5" /> {t("businesses.findAgency")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Offres BNM (dynamic from API) */}
      {offresArray.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">{t("businesses.corporateTitle")}</h2>
              <p className="text-muted-foreground max-w-3xl">
                {t("businesses.corporateDescription")}
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <Card key={i} className="rounded-none border-l-4 border-l-muted">
                    <CardHeader>
                      <Skeleton className="h-8 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-10 w-32 mt-4 rounded-none" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {offresArray.map(offre => {
                  let Icon = Building2;
                  if (offre.titre.toLowerCase().includes('international') || offre.titre.toLowerCase().includes('trade')) Icon = Globe2;
                  else if (offre.titre.toLowerCase().includes('trésorerie') || offre.titre.toLowerCase().includes('cash')) Icon = ArrowLeftRight;
                  else if (offre.titre.toLowerCase().includes('investissement')) Icon = BarChart3;
                  return (
                    <Card key={offre.id} className="group hover:border-secondary transition-colors duration-300 rounded-none shadow-sm hover:shadow-lg border-l-4 border-l-primary hover:border-l-secondary flex flex-col">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="p-3 bg-muted group-hover:bg-primary/5 transition-colors rounded">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <CardTitle className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                            {offre.titre}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-between">
                        <CardDescription className="text-base mb-6 text-foreground/80 leading-relaxed">
                          {offre.description || t("businesses.corporateFallback")}
                        </CardDescription>
                        <Link href="/contact" className="inline-flex items-center text-primary font-semibold hover:text-secondary mt-auto w-fit transition-colors group-hover:translate-x-2 duration-300">
                          {t("businesses.corporateContact")} <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Trade Finance Highlight */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary">{t("businesses.tradeTitle")}</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                {t("businesses.tradeDescription")}
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                  <span>{t("businesses.tradeDocumentaryCredits")}</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                  <span>{t("businesses.tradeDocumentaryRemittances")}</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                  <span>{t("businesses.tradeGuarantees")}</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                  <span>{t("businesses.tradeFinancing")}</span>
                </li>
              </ul>
              <div className="pt-6">
                <Link href="/contact">
                  <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 rounded-none">
                    {t("businesses.tradeExpert")}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] hidden lg:block">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/entreprises-bg.jpg')" }} />
              <div className="absolute inset-0 bg-primary/20" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}