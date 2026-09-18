import { useListActualites } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link, useSearch } from "wouter";
import { Calendar, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Actualites() {
  const { t, i18n } = useTranslation();
  const categories = [
    { value: "Toutes", label: t("news.all") },
    { value: "Banque", label: t("news.bank") },
    { value: "Economie", label: t("news.economy") },
    { value: "Evènements", label: t("news.events") },
    { value: "Communiqués", label: t("news.releases") },
  ];
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const { data: actualitesResponse, isLoading } = useListActualites(
    selectedCategory !== "Toutes" ? { categorie: selectedCategory } : {}
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      {/* Header */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t("news.title")}</h1>
          <p className="text-lg text-white/80 max-w-2xl">
            {t("news.description")}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2 pb-0 sm:pb-4 border-b sm:border-b-0 sm:mb-0">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  className={`rounded-none ${
                    selectedCategory === cat.value
                      ? "bg-secondary text-primary hover:bg-secondary/90"
                      : "text-primary border-primary/20 hover:bg-primary/5 hover:text-primary"
                  }`}
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>


          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-none" />
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          ) : actualitesResponse?.data && actualitesResponse.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {actualitesResponse.data.map(actu => (
                <Card key={actu.id} className="group rounded-none border-none shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full bg-background">
                  <div className="relative h-64 overflow-hidden bg-muted">
                    {actu.image && (
                      <img 
                        src={actu.image} 
                        alt={actu.titre} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-secondary text-primary text-xs font-bold px-3 py-1 uppercase tracking-wider">
                      {actu.categorie || t("news.categoryFallback")}
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(actu.datePublication).toLocaleDateString(i18n.language, {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                      {actu.titre}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                      {actu.contenu.substring(0, 150)}...
                    </p>
                    <Link href={`/actualites/${actu.id}`}>
                      <Button variant="link" className="p-0 h-auto text-primary font-semibold hover:text-secondary group/btn justify-start">
                        {t("news.readArticle")} <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-background border">
              <h3 className="text-xl font-medium text-primary mb-2">{t("news.emptyTitle")}</h3>
              <p className="text-muted-foreground">{t("news.emptyDescription")}</p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-none text-primary"
                onClick={() => setSelectedCategory("Toutes")}
              >
                {t("news.showAll")}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
