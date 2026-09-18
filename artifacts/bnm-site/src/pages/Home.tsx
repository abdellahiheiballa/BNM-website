import { useGetStats, useListOffres, useListActualites } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Bot, Building2, Users, Calendar, Newspaper, Landmark, Briefcase, ChevronRight, ExternalLink, Wallet } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { formatDate, formatNumber } from "@/i18n";

export default function Home() {
  const { t } = useTranslation();
  const { data: stats, isLoading: statsLoading } = useGetStats();
  const { data: offres, isLoading: offresLoading } = useListOffres();
  const { data: actualites, isLoading: actualitesLoading } = useListActualites({ limit: 3 });

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
              {t("home.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
              {t("home.heroDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/devenir-client">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 rounded-none">
                  {t("home.becomeClient")}
                </Button>
              </Link>
              <Link href="/particuliers">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-none bg-transparent">
                  {t("home.discoverOffers")}
                </Button>
              </Link>
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
                <Bot className="w-8 h-8 mx-auto text-secondary mb-4" />
                <div className="text-2xl font-bold text-primary">{t("home.aiChat")}</div>
                <div className="text-sm font-medium text-muted-foreground">{t("home.availability")}</div>
                <a
                  href="https://wa.me/22242440036"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-primary hover:text-secondary transition-colors"
                >
                  {t("home.whatsapp")}
                </a>
              </div>
              <div className="p-8 text-center space-y-2">
                <Calendar className="w-8 h-8 mx-auto text-secondary mb-4" />
                <div className="text-4xl font-bold text-primary">{formatNumber(stats.anneesExperience)}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{t("home.experienceYears")}</div>
              </div>
              <div className="p-8 text-center space-y-2">
                <Newspaper className="w-8 h-8 mx-auto text-secondary mb-4" />
                <div className="text-4xl font-bold text-primary">{formatNumber(stats.totalActualites)}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{t("home.publishedNews")}</div>
              </div>
              <div className="p-8 text-center space-y-2">
                <Wallet className="w-8 h-8 mx-auto text-secondary mb-4" />
                <div className="text-2xl font-bold text-primary">{t("home.clickCardTitle")}</div>
                <div className="text-sm font-medium text-muted-foreground">{t("home.clickCardDescription")}</div>
                <a
                  href="https://www.click.mr/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-primary hover:text-secondary transition-colors"
                >
                  {t("home.clickCardLink")}
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">{t("home.solutionsTitle")}</h2>
            <p className="text-muted-foreground text-lg">
              {t("home.solutionsDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:border-secondary transition-colors duration-300 rounded-none border-t-4 border-t-transparent hover:border-t-secondary shadow-md hover:shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary transition-colors">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{t("navigation.individuals")}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t("home.individualsDescription")}</p>
                </div>
                <Link href="/particuliers" className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors">
                  {t("home.discoverOffersLink")} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:border-secondary transition-colors duration-300 rounded-none border-t-4 border-t-transparent hover:border-t-secondary shadow-md hover:shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary transition-colors">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{t("navigation.professionals")}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t("home.professionalsDescription")}</p>
                </div>
                <Link href="/professionnels" className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors">
                  {t("home.discoverOffersLink")} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:border-secondary transition-colors duration-300 rounded-none border-t-4 border-t-transparent hover:border-t-secondary shadow-md hover:shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary transition-colors">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{t("navigation.businesses")}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t("home.businessesDescription")}</p>
                </div>
                <Link href="/entreprises" className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors">
                  {t("home.discoverOffersLink")} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Click by BNM Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary text-primary font-semibold text-sm rounded-full w-fit">
                <Wallet className="w-4 h-4" />
                {t("common.clickByBnm")}
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">
                {t("home.digitalBankTitle")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("home.digitalBankDescription")}
              </p>
              <p className="text-primary font-semibold text-lg">
                {t("home.digitalBankCallout")}
              </p>
              <a href="https://www.click.mr/" target="_blank" rel="noreferrer" className="inline-flex items-center">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-none">
                  {t("home.accessClick")} <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
            <div className="relative min-h-[460px] rounded-none overflow-hidden shadow-lg bg-primary">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.24),transparent_35%),linear-gradient(135deg,rgba(2,132,199,0.95),rgba(15,23,42,0.95))]"></div>
              <div className="absolute inset-6 border-2 border-white/20 rounded-none"></div>
              <img
                src="/assets/images/screen shot click.png"
                alt={t("home.clickAlt")}
                className="absolute right-6 top-6 z-20 h-[416px] w-[212px] rounded-[2rem] border-4 border-white/80 object-cover shadow-2xl"
              />
              <div className="absolute left-8 right-[260px] top-14 space-y-4 z-10">
                <div className="h-16 rounded-none bg-white/15 border border-white/20"></div>
                <div className="h-16 rounded-none bg-white/15 border border-white/20"></div>
                <div className="h-16 rounded-none bg-white/15 border border-white/20"></div>
              </div>
              <div className="absolute bottom-8 left-8 right-[260px] z-10 rounded-none bg-white/95 text-primary p-6 shadow-2xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-secondary">{t("home.paymentsTransfers")}</p>
                <p className="text-2xl font-serif font-bold mt-2">{t("home.simpleFastSecure")}</p>
              </div>
            </div>
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
              {t("home.islamicFinanceTitle")}
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              {t("home.islamicFinanceDescription")}
            </p>
            <div className="pt-4 flex gap-4 flex-wrap">
              <Link href="/finance-islamique">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 rounded-none">
                  {t("home.learnMore")}
                </Button>
              </Link>
              <Link href="/simulateur?tab=murabaha">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-none bg-transparent">
                  {t("home.murabahaSimulator")}
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
              <h2 className="text-3xl font-serif font-bold text-primary">{t("home.newsTitle")}</h2>
              <p className="text-muted-foreground text-lg">{t("home.newsDescription")}</p>
            </div>
            <Link href="/actualites" className="hidden sm:inline-flex items-center font-semibold text-primary hover:text-secondary">
              {t("home.allNews")} <ArrowRight className="ml-2 w-4 h-4" />
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
                      {actu.categorie || t("home.newsCategory")}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {formatDate(actu.datePublication, {
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
              {t("home.allNews")} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
