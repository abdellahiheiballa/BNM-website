import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Newspaper, ArrowLeft, CreditCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useGetStats, useAdminListActualites, useAdminDeleteActualite, useAdminListOffres, useAdminDeleteOffre, getAdminListActualitesQueryKey, getAdminListOffresQueryKey } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const { data: stats } = useGetStats();
  const { data: actualites, refetch } = useAdminListActualites({ query: { enabled: !!user, queryKey: getAdminListActualitesQueryKey() } });
  const { data: offres } = useAdminListOffres({ query: { enabled: !!user, queryKey: getAdminListOffresQueryKey() } });
  const { toast } = useToast();
  const deleteMutation = useAdminDeleteActualite({
    mutation: {
      onSuccess: () => {
        toast({ title: t("admin.newsDeleted") });
        refetch();
      },
    },
  });
  const deleteOffreMutation = useAdminDeleteOffre({
    mutation: {
      onSuccess: () => {
        toast({ title: t("admin.offersDeleted") });
      },
    },
  });

  const handleDelete = (id: number) => {
    if (confirm(t("admin.confirmDeleteActualite"))) {
      deleteMutation.mutate({ id });
    }
  };

  const handleDeleteOffre = (id: number) => {
    if (confirm(t("admin.confirmDeleteOffre"))) {
      deleteOffreMutation.mutate({ id });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/20">
      <section className="bg-primary py-10 text-white">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" /> {t("admin.backToSite")}
          </Link>
          <h1 className="text-3xl font-serif font-bold">{t("admin.title")}</h1>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <Card className="rounded-none">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">{stats?.totalClients?.toLocaleString('fr-FR') ?? '850 000'}</div>
                <div className="text-sm text-muted-foreground">{t("admin.clients")}</div>
              </CardContent>
            </Card>
            <Card className="rounded-none">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">{stats?.totalAgences ?? 8}</div>
                <div className="text-sm text-muted-foreground">{t("admin.agences")}</div>
              </CardContent>
            </Card>
            <Card className="rounded-none">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">{stats?.totalActualites ?? 0}</div>
                <div className="text-sm text-muted-foreground">{t("admin.actualites")}</div>
              </CardContent>
            </Card>
            <Card className="rounded-none">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">{stats?.totalOffres ?? (offres?.length ?? 0)}</div>
                <div className="text-sm text-muted-foreground">{t("admin.offres")}</div>
              </CardContent>
            </Card>
            <Card className="rounded-none">
              <CardContent className="p-6 text-center">
                <Button
                  variant="outline"
                  className="rounded-none"
                  onClick={() => logout()}
                >
                  {t("admin.logout")}
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-none mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-serif flex items-center gap-2"><Newspaper className="w-5 h-5" /> {t("admin.newsTitle")}</CardTitle>
              <Link href="/admin/actualites/new">
                <Button className="rounded-none">
                  <Plus className="w-4 h-4 mr-2" />
                  {t("admin.newsNew")}
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {!actualites ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : actualites.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center">{t("admin.newsEmpty")}</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("admin.newsTableHeader.titre")}</TableHead>
                      <TableHead>{t("admin.newsTableHeader.categorie")}</TableHead>
                      <TableHead>{t("admin.newsTableHeader.date")}</TableHead>
                      <TableHead>{t("admin.newsTableHeader.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {actualites.map(actu => (
                      <TableRow key={actu.id}>
                        <TableCell>{actu.titre}</TableCell>
                        <TableCell>{actu.categorie || "—"}</TableCell>
                        <TableCell>
                          {new Date(actu.datePublication).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Link href={`/admin/actualites/edit/${actu.id}`}>
                              <Button variant="ghost" size="icon" className="rounded-none">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-none text-destructive"
                              onClick={() => handleDelete(actu.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-serif flex items-center gap-2"><CreditCard className="w-5 h-5" /> {t("admin.offersTitle")}</CardTitle>
              <Link href="/admin/offres/new">
                <Button className="rounded-none">
                  <Plus className="w-4 h-4 mr-2" />
                  {t("admin.offersNew")}
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {!offres ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : offres.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center">{t("admin.offersEmpty")}</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("admin.offersTableHeader.titre")}</TableHead>
                      <TableHead>{t("admin.offersTableHeader.categorie")}</TableHead>
                      <TableHead>{t("admin.offersTableHeader.click")}</TableHead>
                      <TableHead>{t("admin.offersTableHeader.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {offres.map(offre => (
                      <TableRow key={offre.id}>
                        <TableCell>{offre.titre}</TableCell>
                        <TableCell>{offre.categorie}</TableCell>
                        <TableCell>{offre.clickByBnm ? t("admin.offerColumnYes") : t("admin.offerColumnNo")}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Link href={`/admin/offres/edit/${offre.id}`}>
                              <Button variant="ghost" size="icon" className="rounded-none">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-none text-destructive"
                              onClick={() => handleDeleteOffre(offre.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
