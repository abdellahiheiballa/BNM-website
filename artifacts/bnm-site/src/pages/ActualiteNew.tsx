import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useCreateActualite } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Alert } from "@/components/ui/alert";
import { ArrowLeft, Calendar, Image as ImageIcon } from "lucide-react";

const CATEGORIES = ["Banque", "Economie", "Evènements", "Communiqués"] as const;

type FormState = {
  titre: string;
  slug: string;
  categorie: (typeof CATEGORIES)[number] | "";
  contenu: string;
  image: string;
  datePublication: string; // YYYY-MM-DD or empty
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
  // expect YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(v + "T00:00:00.000Z");
  return !Number.isNaN(d.getTime());
}

export default function ActualiteNew() {
  const { toast } = useToast();

  const [form, setForm] = useState<FormState>({
    titre: "",
    slug: "",
    categorie: "",
    contenu: "",
    image: "",
    datePublication: "",
  });

  const [clientError, setClientError] = useState<string | null>(null);

  const createMutation = useCreateActualite({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Actualité créée",
          description: "Elle est maintenant disponible dans la liste.",
        });
      },
      onError: (err: any) => {
        const msg =
          typeof err?.message === "string"
            ? err.message
            : "Impossible de créer l’actualité";
        setClientError(msg);
      },
    },
  });

  const isSubmitting = createMutation.isPending;

  const imagePreview = useMemo(() => {
    const v = form.image.trim();
    if (!v) return null;
    return v;
  }, [form.image]);

  const validate = () => {
    const titre = form.titre.trim();
    const slug = form.slug.trim();
    const contenu = form.contenu.trim();

    if (!titre) return "Le titre est obligatoire.";
    if (!slug) return "Le slug est obligatoire.";
    if (!contenu) return "Le contenu est obligatoire.";
    if (contenu.length < 20)
      return "Le contenu semble trop court (min. ~20 caractères).";
    if (!isValidDateInput(form.datePublication))
      return "La date de publication doit être au format AAAA-MM-JJ.";

    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientError(null);

    const err = validate();
    if (err) {
      setClientError(err);
      toast({ title: "Vérifiez le formulaire", description: err });
      return;
    }

    const payload = {
      titre: form.titre.trim(),
      slug: form.slug.trim(),
      contenu: form.contenu.trim(),
      image: form.image.trim() ? form.image.trim() : null,
      categorie: form.categorie ? form.categorie : null,
      datePublication: form.datePublication
        ? new Date(form.datePublication + "T00:00:00.000Z").toISOString()
        : null,
    };

    await createMutation.mutateAsync({ data: payload });

    // After success, go back to list
    // (We delay link to allow mutation toast to show)
    setTimeout(() => {
      window.location.href = "/actualites";
    }, 300);
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <section className="bg-primary py-10 text-white">
        <div className="container mx-auto px-4">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
            Ajouter une Actualité
          </h1>
          <p className="text-white/80 max-w-2xl">
            Renseignez les informations de l’article puis validez.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="rounded-none border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">
                Nouveau contenu
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
                  <Label className="font-semibold">Titre</Label>
                  <Input
                    className="rounded-none mt-2"
                    value={form.titre}
                    onChange={(e) => {
                      const titre = e.target.value;
                      setForm((s) => ({
                        ...s,
                        titre,
                        // Auto-generate slug when user hasn't touched it much
                        slug:
                          s.slug.trim() === "" || s.slug === slugify(s.titre)
                            ? slugify(titre)
                            : s.slug,
                      }));
                    }}
                    required
                  />
                </div>

                <div>
                  <Label className="font-semibold">Slug</Label>
                  <Input
                    className="rounded-none mt-2"
                    value={form.slug}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, slug: e.target.value }))
                    }
                    required
                  />
                </div>

                <div>
                  <Label className="font-semibold">Catégorie</Label>
                  <Select
                    value={form.categorie || ""}
                    onValueChange={(v) =>
                      setForm((s) => ({
                        ...s,
                        categorie: v === "" ? "" : (v as FormState["categorie"]),
                      }))
                    }
                  >
                    <SelectTrigger className="rounded-none mt-2">
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Radix SelectItem cannot have an empty-string value */}
                      <SelectItem value="none">Aucune</SelectItem>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label className="font-semibold">Contenu</Label>
                  <Textarea
                    className="rounded-none mt-2"
                    value={form.contenu}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, contenu: e.target.value }))
                    }
                    required
                    placeholder="Écrivez le contenu de l’actualité. Séparez les paragraphes par une ligne vide." 
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="font-semibold inline-flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Image (URL / chemin)
                  </Label>
                  <Input
                    className="rounded-none mt-2"
                    value={form.image}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, image: e.target.value }))
                    }
                    placeholder="https://... ou /assets/..."
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <div className="text-xs font-medium text-muted-foreground mb-2">
                        Aperçu
                      </div>
                      <div className="w-full aspect-[21/9] bg-muted relative">
                        <img
                          src={imagePreview}
                          alt="Aperçu image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label className="font-semibold inline-flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Date de publication (optionnel)
                  </Label>
                  <Input
                    type="date"
                    className="rounded-none mt-2"
                    value={form.datePublication}
                    onChange={(e) =>
                      setForm((s) => ({
                        ...s,
                        datePublication: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-none"
                    disabled={isSubmitting}
                    onClick={() => (window.location.href = "/actualites")}
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Création…" : "Créer l’actualité"}
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

