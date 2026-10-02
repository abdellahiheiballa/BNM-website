import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import {
  useAdminCreateOffre,
  useAdminGetOffre,
  useAdminUpdateOffre,
  OffreCategorie,
  type CreateOffreInput,
  type Offre,
} from "@workspace/api-client-react";
import type { UpdateOffreInput } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { useTranslation } from "react-i18next";

type FormState = {
  titre: string;
  titre_fr: string;
  titre_ar: string;
  titre_en: string;
  slug: string;
  categorie: (typeof OffreCategorie)[keyof typeof OffreCategorie];
  description: string;
  description_fr: string;
  description_ar: string;
  description_en: string;
  image: string;
  icone: string;
  clickByBnm: boolean;
  ordre: string;
};

const categories = Object.values(OffreCategorie);

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function defaultClickByBnm(titre: string, slug: string) {
  return /compte\s*courant\s*particulier/i.test(`${titre} ${slug}`);
}

export default function AdminOffreEdit() {
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
    categorie: "particuliers",
    description: "",
    description_fr: "",
    description_ar: "",
  description_en: "",
    image: "",
    icone: "",
    clickByBnm: false,
    ordre: "0",
  });
  const [clientError, setClientError] = useState<string | null>(null);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const { data: existingOffre, isLoading: isLoadingOffre } = useAdminGetOffre(id!, {
    query: { enabled: isEdit && !!user, queryKey: [`/api/admin/offres/${id}`] },
  });

  const createMutation = useAdminCreateOffre({
    mutation: {
      onSuccess: () => {
        toast({ title: t("admin.offersCreated") });
        navigate("/admin");
      },
      onError: (err: any) => {
        setClientError(err?.message || t("admin.errorCreating"));
      },
    },
  });

  const updateMutation = useAdminUpdateOffre({
    mutation: {
      onSuccess: () => {
        toast({ title: t("admin.offersUpdated") });
        navigate("/admin");
      },
      onError: (err: any) => {
        setClientError(err?.message || t("admin.errorUpdating"));
      },
    },
  });

  useEffect(() => {
    if (isEdit && existingOffre) {
      setForm({
        titre: existingOffre.titre,
        titre_fr: existingOffre.titre_fr || "",
        titre_ar: existingOffre.titre_ar || "",
    titre_en: existingOffre.titre_en || "",
        slug: existingOffre.slug,
        categorie: existingOffre.categorie,
        description: existingOffre.description || "",
        description_fr: existingOffre.description_fr || "",
        description_ar: existingOffre.description_ar || "",
    description_en: existingOffre.description_en || "",
        image: existingOffre.image || "",
        icone: existingOffre.icone || "",
        clickByBnm: existingOffre.clickByBnm,
        ordre: String(existingOffre.ordre),
      });
    }
  }, [isEdit, existingOffre]);

  const validate = () => {
    if (!form.titre.trim()) return t("admin.titleRequired");
    if (!form.slug.trim()) return t("admin.slugRequired");
    if (!categories.includes(form.categorie)) return t("admin.invalidCategory");
    if (!form.description.trim()) return t("admin.descriptionRequired");
    if (form.description.trim().length < 20) return t("admin.descriptionTooShort");
    if (!/^\d+$/.test(form.ordre)) return t("admin.orderRequired");
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

    const payload: UpdateOffreInput = {
      titre: form.titre.trim(),
      titre_fr: form.titre_fr.trim() || null,
      titre_ar: form.titre_ar.trim() || null,
    titre_en: form.titre_en.trim() || null,
      slug: form.slug.trim(),
      description: form.description.trim(),
      description_fr: form.description_fr.trim() || null,
      description_ar: form.description_ar.trim() || null,
    description_en: form.description_en.trim() || null,
      image: form.image.trim() ? form.image.trim() : null,
      icone: form.icone.trim() ? form.icone.trim() : null,
      clickByBnm: form.clickByBnm,
      categorie: form.categorie,
      ordre: Number(form.ordre),
    };

    if (isEdit && id) {
      await updateMutation.mutateAsync({ id, data: payload });
    } else {
      await createMutation.mutateAsync({ data: payload as CreateOffreInput });
    }
  };

  if (!user) return null;

  if (isEdit && isLoadingOffre) {
    return (
      <div className="min-h-screen bg-muted/20">
        <section className="bg-primary py-10 text-white">
          <div className="container mx-auto px-4">
            <Link href="/admin" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4" /> {t("admin.backToDashboard")}
            </Link>
            <h1 className="text-3xl font-serif font-bold">{t("admin.loading")}</h1>
          </div>
        </section>
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="rounded-none border-none shadow-sm">
              <CardContent className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-40" />
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
            {isEdit ? t("admin.offersEdited") : t("admin.offersNew")}
          </h1>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="rounded-none border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">
                {isEdit ? t("admin.edit") : t("admin.create")} {t("admin.anOffer")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {clientError && (
                <Alert variant="destructive" className="mb-6 rounded-none">
                  {clientError}
                </Alert>
              )}

              <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label className="font-semibold">{t("admin.offerTitle")}</Label>
                  <Input
                    className="rounded-none mt-2"
                    value={form.titre}
                    onChange={(e) => {
                      const titre = e.target.value;
                      setForm((s) => ({
                        ...s,
                        titre,
                        slug: s.slug.trim() === "" || s.slug === slugify(s.titre) || defaultClickByBnm(s.titre, s.slug) ? slugify(titre) : s.slug,
                        clickByBnm: defaultClickByBnm(titre, s.slug) || s.clickByBnm,
                      }));
                    }}
                    required
                  />
                </div>

                <div>
                  <Label className="font-semibold">{t("admin.offerTitreFr")}</Label>
                  <Input
                    className="rounded-none mt-2"
                    value={form.titre_fr}
                    onChange={(e) => setForm((s) => ({ ...s, titre_fr: e.target.value }))}
                    placeholder={t("admin.optional")}
                  />
                </div>

                <div>
                  <Label className="font-semibold">{t("admin.offerTitreAr")}</Label>
                  <Input
                    className="rounded-none mt-2"
                    value={form.titre_ar}
                    onChange={(e) => setForm((s) => ({ ...s, titre_ar: e.target.value }))}
                    placeholder={t("admin.optional")}
                  />
                </div>

                <div>
                  <Label className="font-semibold">{t("admin.offerTitreEn")}</Label>
                  <Input
                    className="rounded-none mt-2"
                    value={form.titre_en}
                    onChange={(e) => setForm((s) => ({ ...s, titre_en: e.target.value }))}
                    placeholder={t("admin.optional")}
                  />
                </div>

                <div>
                  <Label className="font-semibold">{t("admin.offerSlug")}</Label>
                  <Input
                    className="rounded-none mt-2"
                    value={form.slug}
                    onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label className="font-semibold">{t("admin.offerCategorie")}</Label>
                  <Select
                    value={form.categorie}
                    onValueChange={(v) => setForm((s) => ({ ...s, categorie: v as FormState["categorie"] }))}
                  >
                    <SelectTrigger className="rounded-none mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((categorie) => (
                        <SelectItem key={categorie} value={categorie}>
                          {categorie}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-semibold">{t("admin.offerOrdre")}</Label>
                  <Input
                    type="number"
                    className="rounded-none mt-2"
                    value={form.ordre}
                    onChange={(e) => setForm((s) => ({ ...s, ordre: e.target.value }))}
                  />
                </div>

                <div>
                  <Label className="font-semibold">{t("admin.offerIcone")}</Label>
                  <Input
                    className="rounded-none mt-2"
                    value={form.icone}
                    onChange={(e) => setForm((s) => ({ ...s, icone: e.target.value }))}
                    placeholder="ex: compte-courant"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="font-semibold">{t("admin.offerDescription")}</Label>
                  <Textarea
                    className="rounded-none mt-2 min-h-32"
                    value={form.description}
                    onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="font-semibold">{t("admin.offerDescriptionFr")}</Label>
                  <Textarea
                    className="rounded-none mt-2 min-h-32"
                    value={form.description_fr}
                    onChange={(e) => setForm((s) => ({ ...s, description_fr: e.target.value }))}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="font-semibold">{t("admin.offerDescriptionAr")}</Label>
                  <Textarea
                    className="rounded-none mt-2 min-h-32"
                    value={form.description_ar}
                    onChange={(e) => setForm((s) => ({ ...s, description_ar: e.target.value }))}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="font-semibold">{t("admin.offerDescriptionEn")}</Label>
                  <Textarea
                    className="rounded-none mt-2 min-h-32"
                    value={form.description_en}
                    onChange={(e) => setForm((s) => ({ ...s, description_en: e.target.value }))}
                  />
                </div>

                <div className="md:col-span-2">
                  <ImageUploadField
                    label={t("admin.offerImage")}
                    value={form.image}
                    onChange={(image) => setForm((s) => ({ ...s, image }))}
                    placeholder={t("admin.uploadPlaceholder")}
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-3 rounded-none border p-4">
                  <Checkbox
                    id="clickByBnm"
                    checked={form.clickByBnm}
                    onCheckedChange={(checked) => setForm((s) => ({ ...s, clickByBnm: checked === true }))}
                  />
                  <Label htmlFor="clickByBnm" className="cursor-pointer">
                    {t("admin.offerClickByBnm")}
                  </Label>
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
