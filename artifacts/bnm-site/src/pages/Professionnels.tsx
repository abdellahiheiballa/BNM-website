import { useListOffres } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Building, Landmark, LineChart, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function Professionnels() {
  const { data: offres, isLoading } = useListOffres({ categorie: "professionnels" });  const offresArray = Array.isArray(offres) ? offres : [];
  const heroImage = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop";

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
              Banque des Professionnels
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Un accompagnement sur mesure pour le développement et la gestion de votre activité professionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Développez votre activité</h2>
            <p className="text-muted-foreground max-w-3xl">
              Artisans, commerçants, professions libérales : nous vous proposons des services bancaires adaptés aux exigences de votre métier.
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
                      {offre.titre.toLowerCase().includes('financement') ? <LineChart className="w-6 h-6" /> : 
                       offre.titre.toLowerCase().includes('compte') ? <Briefcase className="w-6 h-6" /> :
                       offre.titre.toLowerCase().includes('assurance') ? <ShieldCheck className="w-6 h-6" /> :
                       <Building className="w-6 h-6" />}
                    </div>
                    <CardTitle className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                      {offre.titre}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <CardDescription className="text-base mb-6 text-foreground/80 line-clamp-3">
                      {offre.description || "Une solution adaptée aux contraintes de votre secteur d'activité."}
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
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-6">
          <h2 className="text-3xl font-serif font-bold text-primary">Besoin d'un conseiller dédié ?</h2>
          <p className="text-lg text-muted-foreground">
            Nos chargés d'affaires professionnels sont à votre disposition pour étudier vos projets et vous proposer les meilleures solutions de financement.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/agences">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-bold px-8 rounded-none w-full sm:w-auto">
                Trouver une agence
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-none w-full sm:w-auto">
                Prendre rendez-vous
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
