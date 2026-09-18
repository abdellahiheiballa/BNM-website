import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle2, FileText, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";

const SECTORS = [
  "Commerce",
  "BTP",
  "Transport",
  "Agriculture / Élevage",
  "Industrie",
  "Services",
  "Fonction publique",
  "Autre",
];

type AttachmentState = {
  file: File | null;
  preview: string | null;
};

function emptyAttachment(): AttachmentState {
  return { file: null, preview: null };
}

function isPdf(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

export default function DevenirClient() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [form, setForm] = useState({
    nomComplet: "",
    cinPasseport: "",
    telephone: "",
    adresse: "",
    secteurActivite: "",
  });
  const [cin, setCin] = useState<AttachmentState>(emptyAttachment());
  const [justificatif, setJustificatif] = useState<AttachmentState>(emptyAttachment());
  const [clientError, setClientError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = form.nomComplet && form.cinPasseport && form.telephone && form.adresse && form.secteurActivite && cin.file && justificatif.file;

  const preview = useMemo(() => {
    const source = cin.preview || justificatif.preview;
    if (!source) return null;
    return { source, isPdf: isPdf(cin.file || justificatif.file!) };
  }, [cin.file, cin.preview, justificatif.file, justificatif.preview]);

  const setAttachment = (setter: Dispatch<SetStateAction<AttachmentState>>, file: File | null) => {
    if (!file) {
      setter(emptyAttachment());
      return;
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type);
    if (!allowed) {
      setClientError(t("becomeClient.attachmentsFormat"));
      setter(emptyAttachment());
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setClientError(t("becomeClient.attachmentSize"));
      setter(emptyAttachment());
      return;
    }

    setClientError(null);
    setter({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const validate = () => {
    if (!form.nomComplet.trim()) return t("becomeClient.nameRequired");
    if (!form.cinPasseport.trim()) return t("becomeClient.idRequired");
    if (!form.telephone.trim()) return t("becomeClient.phoneRequired");
    if (!form.adresse.trim()) return t("becomeClient.addressRequired");
    if (!form.secteurActivite) return t("becomeClient.sectorRequired");
    if (!cin.file || !justificatif.file) return t("becomeClient.filesRequired");
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setClientError(null);

    const err = validate();
    if (err) {
      setClientError(err);
      toast({ title: t("becomeClient.verifyForm"), description: err });
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (cin.file) formData.append("cinPasseportFile", cin.file);
    if (justificatif.file) formData.append("justificatifFile", justificatif.file);

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/devenir-client", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const text = await response.text();
        let message = t("becomeClient.uploadError");
        try {
          const parsed = JSON.parse(text);
          message = parsed.error || parsed.message || message;
        } catch {
          message = text || message;
        }
        throw new Error(message);
      }

      setSubmitted(true);
      setForm({
        nomComplet: "",
        cinPasseport: "",
        telephone: "",
        adresse: "",
        secteurActivite: "",
      });
      setCin(emptyAttachment());
      setJustificatif(emptyAttachment());
      toast({ title: t("becomeClient.sentTitle"), description: t("becomeClient.sentDescription") });
    } catch (err) {
      setClientError(err instanceof Error ? err.message : t("becomeClient.uploadError"));
      toast({ title: t("becomeClient.sendFailure"), description: err instanceof Error ? err.message : t("becomeClient.uploadError") });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/10">
      <section className="bg-primary py-16 text-white relative">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" /> {t("becomeClient.backHome")}
          </Link>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">{t("becomeClient.title")}</h1>
            <p className="text-lg text-white/80">
              {t("becomeClient.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-none border-none shadow-sm">
              <CardHeader>
                <CardTitle>{t("becomeClient.requiredDocuments")}</CardTitle>
                <CardDescription>{t("becomeClient.acceptedFormats")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div className="flex gap-3">
                  <FileText className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>{t("becomeClient.identityDocument")}</span>
                </div>
                <div className="flex gap-3">
                  <FileText className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>{t("becomeClient.addressDocument")}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-none border-none shadow-sm bg-primary text-white">
              <CardHeader>
                <CardTitle className="text-secondary">Click by BNM</CardTitle>
                <CardDescription className="text-white/80">
                  {t("becomeClient.clickDescription")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="rounded-none border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">{t("becomeClient.formTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                {clientError && (
                  <Alert variant="destructive" className="mb-6 rounded-none">
                    {clientError}
                  </Alert>
                )}

                {submitted && (
                  <Alert className="mb-6 rounded-none border-secondary text-secondary">
                    <CheckCircle2 className="h-4 w-4" />
                    {t("becomeClient.success")}
                  </Alert>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label className="font-semibold">{t("becomeClient.fullName")}</Label>
                      <Input
                        className="rounded-none mt-2"
                        value={form.nomComplet}
                        onChange={(e) => setForm((s) => ({ ...s, nomComplet: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label className="font-semibold">{t("becomeClient.idNumber")}</Label>
                      <Input
                        className="rounded-none mt-2"
                        value={form.cinPasseport}
                        onChange={(e) => setForm((s) => ({ ...s, cinPasseport: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label className="font-semibold">{t("becomeClient.phone")}</Label>
                      <Input
                        className="rounded-none mt-2"
                        value={form.telephone}
                        onChange={(e) => setForm((s) => ({ ...s, telephone: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label className="font-semibold">{t("becomeClient.sector")}</Label>
                      <Select
                        value={form.secteurActivite}
                        onValueChange={(value) => setForm((s) => ({ ...s, secteurActivite: value }))}
                      >
                        <SelectTrigger className="rounded-none mt-2">
                          <SelectValue placeholder={t("becomeClient.choose")} />
                        </SelectTrigger>
                        <SelectContent>
                          {SECTORS.map((sector, index) => (
                            <SelectItem key={sector} value={sector}>
                              {["commerce", "construction", "transport", "agriculture", "industry", "services", "public", "other"].map((key) => t(`becomeClient.sectors.${key}`))[index]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <Label className="font-semibold">{t("becomeClient.address")}</Label>
                      <Textarea
                        className="rounded-none mt-2"
                        value={form.adresse}
                        onChange={(e) => setForm((s) => ({ ...s, adresse: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label className="font-semibold">{t("becomeClient.idFile")}</Label>
                      <Input
                        type="file"
                        className="rounded-none mt-2"
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        onChange={(e) => setAttachment(setCin, e.target.files?.[0] || null)}
                        required={!cin.file}
                      />
                    </div>

                    <div>
                      <Label className="font-semibold">{t("becomeClient.addressFile")}</Label>
                      <Input
                        type="file"
                        className="rounded-none mt-2"
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        onChange={(e) => setAttachment(setJustificatif, e.target.files?.[0] || null)}
                        required={!justificatif.file}
                      />
                    </div>
                  </div>

                  {preview && (
                    <div className="rounded-none border bg-muted/40 p-4">
                      <div className="text-sm font-semibold mb-3">{t("becomeClient.preview")}</div>
                      <div className="aspect-[21/9] bg-background">
                        {preview.isPdf ? (
                          <iframe title={t("becomeClient.previewDocument")} src={preview.source} className="w-full h-full" />
                        ) : (
                          <img src={preview.source} alt="Aperçu document" className="w-full h-full object-cover" />
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <Button type="button" variant="outline" className="rounded-none" onClick={() => window.history.back()}>
                      {t("becomeClient.cancel")}
                    </Button>
                    <Button type="submit" className="rounded-none" disabled={!canSubmit || isSubmitting}>
                      {isSubmitting ? t("becomeClient.sending") : <>{t("becomeClient.submit")} <Upload className="ml-2 h-4 w-4" /></>}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
