import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";

type LegalPageKind = "mentions" | "privacy" | "pricing";

const legalCopy: Record<LegalPageKind, { titleKey: string; descriptionKey: string; bodyKey: string }> = {
  mentions: {
    titleKey: "footer.legalNotice",
    descriptionKey: "common.pageNotFoundDescription",
    bodyKey: "footer.legalNotice",
  },
  privacy: {
    titleKey: "footer.privacy",
    descriptionKey: "footer.privacy",
    bodyKey: "footer.privacy",
  },
  pricing: {
    titleKey: "footer.pricing",
    descriptionKey: "footer.pricing",
    bodyKey: "footer.pricing",
  },
};

export default function LegalPage({ kind }: { kind: LegalPageKind }) {
  const { t } = useTranslation();
  const content = legalCopy[kind];

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="mx-auto max-w-3xl rounded-none shadow-sm">
        <CardContent className="space-y-6 p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">{t("common.bankName")}</p>
          <h1 className="text-3xl font-serif font-bold text-primary md:text-5xl">{t(content.titleKey)}</h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            {t(content.descriptionKey) || t("common.pageNotFoundDescription")}
          </p>

          <div className="rounded-none border bg-muted/30 p-6 text-sm leading-7 text-foreground">
            <p>
              {t(content.bodyKey)}
            </p>
            <p className="mt-4">
              {kind === "mentions"
                ? "Cette page fournit les informations légales de la Banque Nationale de Mauritanie et les conditions générales applicables à l’utilisation des services bancaires et numériques du groupe BNM."
                : kind === "privacy"
                  ? "Cette page décrit la manière dont la Banque Nationale de Mauritanie traite les informations personnelles, la sécurité des données et les droits des clients et visiteurs du site."
                  : "Cette page présente les éléments de tarification et la logique de facturation applicable aux services bancaires et solutions proposées par la Banque Nationale de Mauritanie."}
            </p>
          </div>

          <div className="flex justify-start">
            <Link href="/">
              <Button className="rounded-none">{t("common.backHome")}</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
