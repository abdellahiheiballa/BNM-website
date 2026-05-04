import { useListOffres } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, PiggyBank, Home, Car, Smartphone } from "lucide-react";
import { Link } from "wouter";

export default function Particuliers() {
  const { data: offres, isLoading } = useListOffres({ categorie: "particuliers" });
  const offresArray = Array.isArray(offres) ? offres : [];

  const heroImage = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop";

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
              Banque des Particuliers
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Des solutions bancaires conçues pour vous accompagner au quotidien et réaliser vos projets de vie.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Nos Offres & Services</h2>
            <p className="text-muted-foreground max-w-3xl">
              Découvrez notre gamme complète de produits et services adaptés à chaque étape de votre vie.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="rounded-none">
                  <CardHeader>
                    <Skeleton className="h-12 w-12 rounded-full mb-4" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-2/3 mt-1" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : offresArray.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offresArray.map(offre => (
                <Card key={offre.id} className="group hover:border-secondary transition-colors duration-300 rounded-none shadow-sm hover:shadow-md flex flex-col h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-secondary transition-colors">
                      {offre.titre.toLowerCase().includes('carte') ? <CreditCard className="w-6 h-6" /> : 
                       offre.titre.toLowerCase().includes('epargne') ? <PiggyBank className="w-6 h-6" /> :
                       offre.titre.toLowerCase().includes('immo') ? <Home className="w-6 h-6" /> :
                       offre.titre.toLowerCase().includes('auto') ? <Car className="w-6 h-6" /> :
                       <Smartphone className="w-6 h-6" />}
                    </div>
                    <CardTitle className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                      {offre.titre}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <CardDescription className="text-base mb-6 text-foreground/80 line-clamp-3">
                      {offre.description || "Découvrez notre solution adaptée à vos besoins spécifiques."}
                    </CardDescription>
                    <Button variant="outline" className="w-full justify-between group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all rounded-none mt-auto">
                      En savoir plus <ArrowRight className="w-4 h-4" />
                    </Button>
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

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-6">
          <h2 className="text-3xl font-serif font-bold">Prêt à réaliser vos projets ?</h2>
          <p className="text-lg text-white/80">
            Estimez votre capacité d'emprunt ou vos mensualités en quelques clics avec notre simulateur de crédit.
          </p>
          <div className="pt-4">
            <Link href="/simulateur">
              <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 rounded-none">
                Accéder au simulateur
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
