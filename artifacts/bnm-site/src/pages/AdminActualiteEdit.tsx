import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams } from "wouter";
import { useAdminCreateActualite, useAdminGetActualite, useAdminUpdateActualite } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight, Calendar, AlertCircle } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";

const CATEGORIES = ["Banque", "Economie", "Evènements", "Communiqués"] as const;

type FormState = {
  titre: string;
  titre_fr: string;
  titre_ar: string;
  titre_en: string;
  slug: string;
  categorie: (typeof CATEGORIES)[number] | "";
  contenu: string;
  contenu_fr: string;
  contenu_ar: string;
  contenu_en: string;
  image: string;
  datePublication: string;
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidDateInput(v: string) {
  if (!v) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(v + "T00:00:00.000Z");
  return !Number.isNaN(d.getTime());
}

export default function AdminActualiteEdit() {
  const { t } = useTranslation();

  const params = useParams();
  const id = params.id ? Number(params.id) : null;
  const isEdit = !!id;
  const { user } = useAuth();
  const [form, setForm] = useState<FormState>({
    titre: "",
    titre_fr: "",
    titre_ar: "",
  titre_en: "",
    slug: "",
    categorie: "",
    contenu: "",
    contenu_fr: "",
    contenu_ar: "",
  contenu_en: "",
    image: "",
    datePublication: "",
  });
  const [clientError, setClientError] = useState<string | null>(null);
  const { toast } = useToast();
  const [location, navigate] = useLocation();

  const { data: existingActu, isLoading: isLoadingActu } = useAdminGetActualite(id!, { query: { enabled: isEdit && !!user, queryKey: [`/api/admin/actualites/${id}`] } });
  const createMutation = useAdminCreateActualite({
    mutation: {
      onSuccess: () => {
        toast({ title: t("admin.newsCreated") });
        navigate("/admin");
      },
      onError: (err: any) => {
        setClientError(err?.message || t("admin.errorCreating"));
      },
    },
  });

  const updateMutation = useAdminUpdateActualite({
    mutation: {
      onSuccess: () => {
        toast({ title: t("admin.newsUpdated") });
        navigate("/admin");
      },
      onError: (err: any) => {
        setClientError(err?.message || t("admin.errorUpdating"));
      },
    },
  });

  useEffect(() => {
    if (isEdit && existingActu) {
      setForm({
        titre: existingActu.titre,
        titre_fr: existingActu.titre_fr || "",
        titre_ar: existingActu.titre_ar || "",
    titre_en: existingActu.titre_en || "",
        slug: existingActu.slug,
        categorie: (existingActu.categorie as (typeof CATEGORIES)[number]) || "",
        contenu: existingActu.contenu,
        contenu_fr: existingActu.contenu_fr || "",
        contenu_ar: existingActu.contenu_ar || "",
    contenu_en: existingActu.contenu_en || "",
        image: existingActu.image || "",
        datePublication: existingActu.datePublication ? existingActu.datePublication.split("T")[0] : "",
      });
    }
  }, [isEdit, existingActu]);

  const validate = () => {
    const titre = form.titre.trim();
    const slug = form.slug.trim();
    const contenu = form.contenu.trim();

    if (!titre) return t("admin.titleRequired");
    if (!slug) return t("admin.slugRequired");
    if (!contenu) return t("admin.contentRequired");
    if (contenu.length < 20) return t("admin.contentTooShort");
    if (!isValidDateInput(form.datePublication)) return t("admin.invalidDate");

    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientError(null);

    const err = validate();
    if (err) {
      setClientError(err);
      toast({ title: t("admin.formError"), description: err });
      return;
    }

    const payload = {
      titre: form.titre.trim(),
      titre_fr: form.titre_fr.trim() || null,
      titre_ar: form.titre_ar.trim() || null,
    titre_en: form.titre_en.trim() || null,
      slug: form.slug.trim(),
      contenu: form.contenu.trim(),
      contenu_fr: form.contenu_fr.trim() || null,
      contenu_ar: form.contenu_ar.trim() || null,
    contenu_en: form.contenu_en.trim() || null,
      image: form.image.trim() ? form.image.trim() : null,
      categorie: form.categorie ? form.categorie : null,
      datePublication: form.datePublication
        ? new Date(form.datePublication + "T00:00:00.000Z").toISOString()
        : null,
    };

    if (isEdit && id) {
      await updateMutation.mutateAsync({ id, data: payload });
    } else {
      await createMutation.mutateAsync({ data: payload });
    }
  };

  if (!user) return null;

  if (isEdit && isLoadingActu) {
    return (
      <div className="min-h-screen bg-muted/20">
        <section className="bg-primary py-10 text-white">
          <div className="container mx-auto px-4">
            <Link href="/admin" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4" /> Retour au tableau de bord
            </Link>
            <h1 className="text-3xl font-serif font-bold">Modifier l'actualité</h1>
          </div>
        </section>
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="rounded-none border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Chargement...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <section className="bg-primary py-10 text-white">
        <div className="container mx-auto px-4">
            <Link href="/admin" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4" /> {t("admin.backToDashboard")}
            </Link>
            <h1 className="text-3xl font-serif font-bold">
              {isEdit ? t("admin.actualitesEdited") : t("admin.actualitesNew")}
            </h1>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="rounded-none border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  {isEdit ? t("admin.edit") : t("admin.create")} {t("admin.anArticle")}
                </CardTitle>
              </CardHeader>
            <CardContent>
              {clientError && (
                <Alert variant="destructive" className="mb-6 rounded-none">
                  <AlertCircle className="w-4 h-4" />
                  {clientError}
                </Alert>
              )}

              <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label className="font-semibold">{t("admin.actualiteTitle")}</Label>
                  <Input
                    className="rounded-none mt-2"
                    value={form.titre}
                    onChange={(e) => {
                      const titre = e.target.value;
                      setForm((s) => ({
                        ...s,
                        titre,
                        slug: s.slug.trim() === "" || s.slug === slugify(s.titre) ? slugify(titre) : s.slug,
                      }));
                    }}
                    required
                  />
                </div>

                <div>
                  <Label className="font-semibold">{t("admin.actualiteTitreFr")}</Label>
                  <Input
                    className="rounded-none mt-2"
                    value={form.titre_fr}
                    onChange={(e) => setForm((s) => ({ ...s, titre_fr: e.target.value }))}
                    placeholder={t("admin.optional")}
                  />
                </div>

                <div>
                  <Label className="font-semibold">{t("admin.actualiteTitreAr")}</Label>
                  <Input
                    className="rounded-none mt-2"
                    value={form.titre_ar}
                    onChange={(e) => setForm((s) => ({ ...s, titre_ar: e.target.value }))}
                    placeholder={t("admin.optional")}
                  />
                </div>

                <div>
                  <Label className="font-semibold">{t("admin.actualiteTitreEn")}</Label>
                  <Input
                    className="rounded-none mt-2"
                    value={form.titre_en}
                    onChange={(e) => setForm((s) => ({ ...s, titre_en: e.target.value }))}
                    placeholder={t("admin.optional")}
                  />
                </div>

                <div>
                  <Label className="font-semibold">{t("admin.actualiteSlug")}</Label>
                  <Input
                    className="rounded-none mt-2"
                    value={form.slug}
                    onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label className="font-semibold">{t("admin.actualiteCategorie")}</Label>
                  <Select
                    value={form.categorie || ""}
                    onValueChange={(v) => setForm((s) => ({ ...s, categorie: v === "" ? "" : (v as FormState["categorie"]) }))}
                  >
                    <SelectTrigger className="rounded-none mt-2">
                      <SelectValue placeholder={t("admin.choose")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">{t("admin.none")}</SelectItem>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label className="font-semibold">{t("admin.actualiteContenu")}</Label>
                  <Textarea
                    className="rounded-none mt-2"
                    value={form.contenu}
                    onChange={(e) => setForm((s) => ({ ...s, contenu: e.target.value }))}
                    required
                    placeholder={t("admin.writeContent")}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="font-semibold">{t("admin.actualiteContenuFr")}</Label>
                  <Textarea
                    className="rounded-none mt-2"
                    value={form.contenu_fr}
                    onChange={(e) => setForm((s) => ({ ...s, contenu_fr: e.target.value }))}
                    placeholder={t("admin.writeContentFr")}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="font-semibold">{t("admin.actualiteContenuAr")}</Label>
                  <Textarea
                    className="rounded-none mt-2"
                    value={form.contenu_ar}
                    onChange={(e) => setForm((s) => ({ ...s, contenu_ar: e.target.value }))}
                    placeholder={t("admin.writeContentAr")}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="font-semibold">{t("admin.actualiteContenuEn")}</Label>
                  <Textarea
                    className="rounded-none mt-2"
                    value={form.contenu_en}
                    onChange={(e) => setForm((s) => ({ ...s, contenu_en: e.target.value }))}
                    placeholder={t("admin.writeContentEn")}
                  />
                </div>

                <div className="md:col-span-2">
                  <ImageUploadField
                    value={form.image}
                    onChange={(image) => setForm((s) => ({ ...s, image }))}
                    placeholder="https://... ou téléverser un fichier"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="font-semibold inline-flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {t("admin.actualiteDate")}
                  </Label>
                  <Input
                    type="date"
                    className="rounded-none mt-2"
                    value={form.datePublication}
                    onChange={(e) => setForm((s) => ({ ...s, datePublication: e.target.value }))}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <Button type="button" variant="outline" className="rounded-none" onClick={() => navigate("/admin")}>
                    {t("admin.cancel")}
                  </Button>
                  <Button type="submit" className="rounded-none" disabled={createMutation.isPending || updateMutation.isPending}>
                    {isEdit ? t("admin.edit") : t("admin.create")} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}