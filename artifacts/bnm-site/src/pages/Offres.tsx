import { useListOffres, ListOffresCategorie } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { toLangCode, dynamicKey } from "@/i18n";
import { useTranslation } from "react-i18next";

const ALL = "all" as const;

type Filter = typeof ALL | (typeof ListOffresCategorie)[keyof typeof ListOffresCategorie];

const categoryLabelKey = (categorie: string) => dynamicKey(`offersPage.category_${categorie}`);

export default function Offres() {
  const { t, i18n } = useTranslation();
  const lang = toLangCode(i18n.language);
  const [selectedCategory, setSelectedCategory] = useState<Filter>(ALL);

  const categories: { value: Filter; label: string }[] = [
    { value: ALL, label: t("offersPage.all") },
    { value: ListOffresCategorie.particuliers, label: t("offersPage.particuliers") },
    { value: ListOffresCategorie.professionnels, label: t("offersPage.professionnels") },
    { value: ListOffresCategorie.entreprises, label: t("offersPage.entreprises") },
    { value: ListOffresCategorie.islamique, label: t("offersPage.islamique") },
  ];

  const { data: offres, isLoading } = useListOffres(
    selectedCategory === ALL ? { lang } : { lang, categorie: selectedCategory },
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      {/* Header */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t("offersPage.title")}</h1>
          <p className="text-lg text-white/80 max-w-2xl">{t("offersPage.description")}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 pb-4 border-b mb-8">
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

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-none" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          ) : offres && offres.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offres.map((offre) => (
                <Card
                  key={offre.id}
                  className="group rounded-none border-none shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full bg-background"
                >
                  <div className="relative h-64 overflow-hidden bg-muted">
                    {offre.image && (
                      <img
                        src={offre.image}
                        alt={offre.titre}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-secondary text-primary text-xs font-bold px-3 py-1 uppercase tracking-wider">
                      {t(categoryLabelKey(offre.categorie))}
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                      {offre.titre}
                    </h3>
                    {offre.description && (
                      <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                        {offre.description}
                      </p>
                    )}
                    <Link href={`/offres/${offre.slug}`}>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary font-semibold hover:text-secondary justify-start"
                      >
                        {t("offersPage.discover")} <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-background border">
              <h3 className="text-xl font-medium text-primary mb-2">{t("offersPage.emptyTitle")}</h3>
              <p className="text-muted-foreground">{t("offersPage.emptyDescription")}</p>
              <Button
                variant="outline"
                className="mt-6 rounded-none text-primary"
                onClick={() => setSelectedCategory(ALL)}
              >
                {t("offersPage.showAll")}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
