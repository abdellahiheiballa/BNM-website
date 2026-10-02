import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { dynamicKey } from "@/i18n";

type LegalPageKind = "mentions" | "privacy" | "pricing";

const legalCopy: Record<
  LegalPageKind,
  { titleKey: ReturnType<typeof dynamicKey>; descriptionKey: ReturnType<typeof dynamicKey>; bodyKey: ReturnType<typeof dynamicKey> }
> = {
  mentions: {
    titleKey: dynamicKey("footer.legalNotice"),
    descriptionKey: dynamicKey("common.pageNotFoundDescription"),
    bodyKey: dynamicKey("footer.legalNotice"),
  },
  privacy: {
    titleKey: dynamicKey("footer.privacy"),
    descriptionKey: dynamicKey("footer.privacy"),
    bodyKey: dynamicKey("footer.privacy"),
  },
  pricing: {
    titleKey: dynamicKey("footer.pricing"),
    descriptionKey: dynamicKey("footer.pricing"),
    bodyKey: dynamicKey("footer.pricing"),
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
                ? t("legal.mentionsBody")
                : kind === "privacy"
                  ? t("legal.privacyBody")
                  : t("legal.pricingBody")}
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
