import { useMemo, useRef, useState } from "react";
import { AlertCircle, Upload, X } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

type ImageUploadFieldProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const text = await response.text();
    let message = "Échec de l'upload";
    try {
      const parsed = JSON.parse(text);
      message = parsed.error || parsed.message || message;
    } catch {
      message = text || message;
    }
    throw new Error(message);
  }

  const data = (await response.json()) as { url: string };
  return data.url;
}

export default function ImageUploadField({
  label = "Image / document",
  value,
  onChange,
  placeholder = "URL ou téléverser un fichier",
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const preview = useMemo(() => {
    if (!value && !selectedFile) return null;
    const source = value || (selectedFile ? URL.createObjectURL(selectedFile) : "");
    const isPdf = source.toLowerCase().endsWith(".pdf");
    return { source, isPdf };
  }, [selectedFile, value]);

  const handleFile = async (file: File) => {
    setFileError(null);

    if (!allowedTypes.has(file.type)) {
      setFileError("Format non pris en charge. Utilisez JPG, PNG, WEBP ou PDF.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError("Le fichier ne doit pas dépasser 5 Mo.");
      return;
    }

    setSelectedFile(file);
    setIsUploading(true);

    try {
      const url = await uploadFile(file);
      onChange(url);
      setSelectedFile(null);
    } catch (err) {
      setFileError(err instanceof Error ? err.message : "Échec de l'upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="font-semibold">{label}</Label>
      <div className="flex gap-2">
        <Input
          className="rounded-none flex-1"
          value={value}
          onChange={(e) => {
            setSelectedFile(null);
            setFileError(null);
            onChange(e.target.value);
          }}
          placeholder={placeholder}
        />
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
            e.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="outline"
          className="rounded-none shrink-0"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
        >
          {isUploading ? <Spinner className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
        </Button>
      </div>

      {fileError && (
        <Alert variant="destructive" className="rounded-none">
          <AlertCircle className="h-4 w-4" />
          {fileError}
        </Alert>
      )}

      {preview && (
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2">Aperçu</div>
          <div className="w-full aspect-[21/9] bg-muted relative overflow-hidden">
            {preview.isPdf ? (
              <iframe
                title="Aperçu PDF"
                src={preview.source}
                className="w-full h-full"
              />
            ) : (
              <img src={preview.source} alt="Aperçu" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      )}

      {value && (
        <Button
          type="button"
          variant="ghost"
          className="rounded-none text-destructive"
          onClick={() => {
            setSelectedFile(null);
            setFileError(null);
            onChange("");
          }}
        >
          <X className="mr-2 h-4 w-4" /> Retirer le média
        </Button>
      )}
    </div>
  );
}
