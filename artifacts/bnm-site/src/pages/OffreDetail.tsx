import { useGetOffre } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toLangCode } from "@/i18n";
import { useTranslation } from "react-i18next";

export default function OffreDetail() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const slug = params.slug || "";
  const currentLang = toLangCode(i18n.language);

  const { data: offre, isLoading, error } = useGetOffre(slug, { lang: currentLang }, {
    query: {
      enabled: !!slug,
      queryKey: ["/api/offres", slug, currentLang],
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Skeleton className="h-8 w-24 mb-6 rounded-none" />
        <Skeleton className="h-12 w-full mb-4 rounded-none" />
        <Skeleton className="h-12 w-3/4 mb-8 rounded-none" />
        <Skeleton className="h-[400px] w-full mb-8 rounded-none" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (error || !offre) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">{t("admin.offreNotFoundTitle")}</h2>
        <p className="text-muted-foreground mb-8">{t("admin.offreNotFoundDescription")}</p>
        <Link href="/particuliers">
          <Button className="bg-primary text-white rounded-none">{t("admin.offreBackToOffers")}</Button>
        </Link>
      </div>
    );
  }

  const categorieLabel = offre.categorie;

  return (
    <article className="min-h-screen bg-background pb-20">
      <div className="w-full bg-muted/30 pt-12 pb-8 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/particuliers" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t("admin.offreBackToOffers")}
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <Badge className="bg-secondary text-primary hover:bg-secondary rounded-none px-3 py-1 font-bold tracking-wider uppercase">
              {categorieLabel}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary leading-tight mb-8">
            {offre.titre}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-8">
        {offre.image && (
          <div className="w-full aspect-[21/9] mb-12 bg-muted relative">
            <img
              src={offre.image}
              alt={offre.titre}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:leading-relaxed prose-a:text-secondary">
          {offre.description
            ? offre.description.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-foreground/90">{paragraph}</p>
              ))
            : <p className="text-muted-foreground">{t("admin.offreNoDescription")}</p>}
        </div>
      </div>
    </article>
  );
}
