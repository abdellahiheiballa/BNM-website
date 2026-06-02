import { useListOffres } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight, Moon, Landmark, Star, HandCoins } from "lucide-react";
import { Link } from "wouter";

export default function FinanceIslamique() {
  const { data: offres, isLoading } = useListOffres({ categorie: "islamique" });  const offresArray = Array.isArray(offres) ? offres : [];
  const heroImage = "/assets/images/Islamique.jpg.jpeg";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[450px] flex items-center">
        <div className="absolute inset-0 bg-primary/85 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="container relative z-20 mx-auto px-4">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-block px-4 py-1.5 bg-secondary text-primary font-bold text-sm uppercase tracking-wider mb-2">
              AL WATANI
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              Finance Islamique
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Des solutions de financement et d'investissement strictement conformes aux préceptes de la Charia, certifiées par notre Comité de Conformité.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">Nos Produits Al Watani</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Découvrez une gamme complète de produits bancaires participatifs, conçus pour répondre à vos besoins tout en respectant vos valeurs.
                </p>

                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => (
                      <Card key={i} className="rounded-none border border-muted">
                        <CardHeader>
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : offresArray.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {offresArray.map(offre => (
                      <Card key={offre.id} className="group hover:border-secondary transition-colors duration-300 rounded-none shadow-sm hover:shadow-md">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="text-secondary group-hover:text-primary transition-colors">
                              {offre.titre.toLowerCase().includes('murabaha') ? <HandCoins className="w-8 h-8" /> : 
                               offre.titre.toLowerCase().includes('ijara') ? <Landmark className="w-8 h-8" /> :
                               <Star className="w-8 h-8" />}
                            </div>
                            <CardTitle className="text-xl font-bold text-primary">
                              {offre.titre}
                            </CardTitle>
                          </div>
                          <CardDescription className="text-base text-foreground/80">
                            {offre.description || "Produit certifié conforme aux principes de la finance islamique."}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : (
                   <p className="text-muted-foreground">Aucune offre disponible.</p>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <Card className="bg-primary text-white rounded-none border-none">
                  <CardHeader>
                    <Moon className="w-10 h-10 text-secondary mb-4" />
                    <CardTitle className="text-2xl font-serif text-secondary">Comité Charia</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-white/90">
                    <p>
                      Toutes les solutions de financement de la gamme Al Watani sont soumises à l'approbation d'un Comité de Conformité Charia composé d'éminents savants.
                    </p>
                    <p>
                      Ce comité garantit l'absence de Riba (intérêt), de Gharar (incertitude excessive) et de Maysir (spéculation) dans toutes vos transactions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-none border-primary bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary font-serif">Estimez votre financement</CardTitle>
                    <CardDescription>
                      Calculez les mensualités de votre financement Mourabaha en quelques secondes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/simulateur?tab=murabaha">
                      <Button className="w-full bg-primary text-white hover:bg-primary/90 font-bold rounded-none group">
                        Simulateur Murabaha
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
