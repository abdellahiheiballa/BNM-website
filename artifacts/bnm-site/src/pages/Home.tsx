import { useGetStats, useListOffres, useListActualites } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Building2, Users, Calendar, Newspaper, Landmark, Briefcase, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useGetStats();
  const { data: offres, isLoading: offresLoading } = useListOffres();
  const { data: actualites, isLoading: actualitesLoading } = useListActualites({ limit: 3 });

  const formatNumber = (value?: number | string) => Number(value ?? 0).toLocaleString('fr-FR');
  const heroImage = "/assets/images/min-h-screen.jpg";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center">
        <div className="absolute inset-0 bg-primary/80 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="container relative z-20 mx-auto px-4">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              La banque de <span className="text-secondary">confiance</span> pour une nation en mouvement.
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
              Depuis des décennies, la Banque Nationale de Mauritanie accompagne le développement économique du pays. Nous offrons des solutions financières modernes, sécurisées et adaptées à vos ambitions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 rounded-none">
                Devenir client
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-none bg-transparent">
                Découvrir nos offres
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          {statsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full" />)}
            </div>
          ) : stats ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x border rounded-lg bg-background shadow-sm">
              <div className="p-8 text-center space-y-2">
                <Users className="w-8 h-8 mx-auto text-secondary mb-4" />
                <div className="text-4xl font-bold text-primary">{formatNumber(stats.totalClients)}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Clients satisfaits</div>
              </div>
              <div className="p-8 text-center space-y-2">
                <Building2 className="w-8 h-8 mx-auto text-secondary mb-4" />
                <div className="text-4xl font-bold text-primary">{formatNumber(stats.totalAgences)}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Agences au pays</div>
              </div>
              <div className="p-8 text-center space-y-2">
                <Calendar className="w-8 h-8 mx-auto text-secondary mb-4" />
                <div className="text-4xl font-bold text-primary">{formatNumber(stats.anneesExperience)}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Années d'expérience</div>
              </div>
              <div className="p-8 text-center space-y-2">
                <Newspaper className="w-8 h-8 mx-auto text-secondary mb-4" />
                <div className="text-4xl font-bold text-primary">{formatNumber(stats.totalActualites)}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Actualités publiées</div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Des solutions pour chaque étape</h2>
            <p className="text-muted-foreground text-lg">
              Que vous soyez un particulier, un professionnel ou une grande entreprise, nous avons conçu des offres sur mesure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:border-secondary transition-colors duration-300 rounded-none border-t-4 border-t-transparent hover:border-t-secondary shadow-md hover:shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary transition-colors">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">Particuliers</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Gérez votre argent au quotidien, épargnez pour vos projets et financez vos rêves avec nos solutions dédiées.
                  </p>
                </div>
                <Link href="/particuliers" className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors">
                  Découvrir les offres <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:border-secondary transition-colors duration-300 rounded-none border-t-4 border-t-transparent hover:border-t-secondary shadow-md hover:shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary transition-colors">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">Professionnels</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Optimisez la gestion de votre activité avec des outils performants et un accompagnement personnalisé.
                  </p>
                </div>
                <Link href="/professionnels" className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors">
                  Découvrir les offres <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:border-secondary transition-colors duration-300 rounded-none border-t-4 border-t-transparent hover:border-t-secondary shadow-md hover:shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary transition-colors">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">Entreprises</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Des solutions de financement, d'investissement et de gestion de trésorerie pour soutenir votre croissance.
                  </p>
                </div>
                <Link href="/entreprises" className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors">
                  Découvrir les offres <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Islamic Finance Banner */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <Landmark className="w-96 h-96 -mt-20 -mr-20" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary font-semibold text-sm rounded-full mb-2">
              Al Watani
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
              Découvrez la Finance Islamique
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              Des produits conformes aux principes de la Charia, alliant éthique et performance pour le financement de vos biens.
            </p>
            <div className="pt-4 flex gap-4 flex-wrap">
              <Link href="/finance-islamique">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 rounded-none">
                  En savoir plus
                </Button>
              </Link>
              <Link href="/simulateur?tab=murabaha">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-none bg-transparent">
                  Simulateur Murabaha
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Actualités Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl font-serif font-bold text-primary">Actualités & Communiqués</h2>
              <p className="text-muted-foreground text-lg">Restez informé des dernières nouvelles de la BNM et de l'économie.</p>
            </div>
            <Link href="/actualites" className="hidden sm:inline-flex items-center font-semibold text-primary hover:text-secondary">
              Toutes les actualités <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {actualitesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-none" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : actualites?.data ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {actualites.data.map(actu => (
                <Link key={actu.id} href={`/actualites/${actu.id}`} className="group block space-y-4">
                  <div className="relative h-64 overflow-hidden bg-muted">
                    {actu.image && (
                      <img 
                        src={actu.image} 
                        alt={actu.titre} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                      {actu.categorie || "Actualité"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {new Date(actu.datePublication).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </div>
                    <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2">
                      {actu.titre}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/actualites" className="inline-flex items-center font-semibold text-primary hover:text-secondary">
              Toutes les actualités <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
