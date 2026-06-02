import { useListOffres } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe2, BarChart3, ArrowLeftRight, Landmark, Building2 } from "lucide-react";
import { Link } from "wouter";

export default function Entreprises() {
  const { data: offres, isLoading } = useListOffres({ categorie: "entreprises" });
  const offresArray = Array.isArray(offres) ? offres : [];

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
              Banque des Entreprises
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Le partenaire financier stratégique pour accompagner la croissance de votre entreprise à l'échelle nationale et internationale.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Des solutions Corporate de haut niveau</h2>
            <p className="text-muted-foreground max-w-3xl">
              Nous mettons à votre disposition l'expertise de nos équipes spécialisées pour optimiser votre trésorerie, financer vos investissements et faciliter vos opérations à l'international.
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
          ) : offresArray.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offresArray.map(offre => (
                <Card key={offre.id} className="group hover:border-secondary transition-colors duration-300 rounded-none shadow-sm hover:shadow-lg border-l-4 border-l-primary hover:border-l-secondary flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-2">
                       <div className="p-3 bg-muted group-hover:bg-primary/5 transition-colors rounded">
                        {offre.titre.toLowerCase().includes('international') || offre.titre.toLowerCase().includes('trade') ? <Globe2 className="w-6 h-6 text-primary" /> : 
                         offre.titre.toLowerCase().includes('trésorerie') || offre.titre.toLowerCase().includes('cash') ? <ArrowLeftRight className="w-6 h-6 text-primary" /> :
                         offre.titre.toLowerCase().includes('investissement') ? <BarChart3 className="w-6 h-6 text-primary" /> :
                         <Building2 className="w-6 h-6 text-primary" />}
                       </div>
                       <CardTitle className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                        {offre.titre}
                       </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <CardDescription className="text-base mb-6 text-foreground/80 leading-relaxed">
                      {offre.description || "Optimisez la performance financière de votre entreprise avec nos solutions expertes."}
                    </CardDescription>
                    <Link href="/contact" className="inline-flex items-center text-primary font-semibold hover:text-secondary mt-auto w-fit transition-colors group-hover:translate-x-2 duration-300">
                      Contacter un conseiller Corporate <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
             <div className="text-center py-12">
               <p className="text-muted-foreground">Aucune offre disponible pour le moment.</p>
             </div>
          )}
        </div>
      </section>

      {/* Trade Finance Highlight */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary">Trade Finance</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Fort d'un vaste réseau de correspondants bancaires à travers le monde, la BNM sécurise et optimise vos transactions internationales.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                  <span>Crédits documentaires (Import/Export)</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                  <span>Remises documentaires</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                  <span>Garanties bancaires internationales</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                  <span>Financement des opérations de négoce</span>
                </li>
              </ul>
              <div className="pt-6">
                <Link href="/contact">
                   <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 rounded-none">
                     Parler à un expert Trade
                   </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] hidden lg:block">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')" }} />
              <div className="absolute inset-0 bg-primary/20" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
