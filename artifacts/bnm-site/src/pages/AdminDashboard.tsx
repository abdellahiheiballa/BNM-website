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

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { data: stats } = useGetStats();
  const { data: actualites, refetch } = useAdminListActualites({ query: { enabled: !!user, queryKey: getAdminListActualitesQueryKey() } });
  const { data: offres } = useAdminListOffres({ query: { enabled: !!user, queryKey: getAdminListOffresQueryKey() } });
  const { toast } = useToast();
  const deleteMutation = useAdminDeleteActualite({
    mutation: {
      onSuccess: () => {
        toast({ title: "Actualité supprimée" });
        refetch();
      },
    },
  });
  const deleteOffreMutation = useAdminDeleteOffre({
    mutation: {
      onSuccess: () => {
        toast({ title: "Offre supprimée" });
      },
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette actualité ?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleDeleteOffre = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
      deleteOffreMutation.mutate({ id });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/20">
      <section className="bg-primary py-10 text-white">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" /> Retour au site
          </Link>
          <h1 className="text-3xl font-serif font-bold">Tableau de bord</h1>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <Card className="rounded-none">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">{stats?.totalClients?.toLocaleString('fr-FR') ?? '850 000'}</div>
                <div className="text-sm text-muted-foreground">Clients</div>
              </CardContent>
            </Card>
            <Card className="rounded-none">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">{stats?.totalAgences ?? 8}</div>
                <div className="text-sm text-muted-foreground">Agences</div>
              </CardContent>
            </Card>
            <Card className="rounded-none">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">{actualites?.length ?? 0}</div>
                <div className="text-sm text-muted-foreground">Actualités</div>
              </CardContent>
            </Card>
            <Card className="rounded-none">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">{offres?.length ?? 0}</div>
                <div className="text-sm text-muted-foreground">Offres</div>
              </CardContent>
            </Card>
            <Card className="rounded-none">
              <CardContent className="p-6 text-center">
                <Button
                  variant="outline"
                  className="rounded-none"
                  onClick={() => logout()}
                >
                  Déconnexion
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-none mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-serif flex items-center gap-2"><Newspaper className="w-5 h-5" /> Gestion des Actualités</CardTitle>
              <Link href="/admin/actualites/new">
                <Button className="rounded-none">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle actualité
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
                <p className="text-muted-foreground py-8 text-center">Aucune actualité</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
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
              <CardTitle className="text-xl font-serif flex items-center gap-2"><CreditCard className="w-5 h-5" /> Gestion des Offres</CardTitle>
              <Link href="/admin/offres/new">
                <Button className="rounded-none">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle offre
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
                <p className="text-muted-foreground py-8 text-center">Aucune offre</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Click</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {offres.map(offre => (
                      <TableRow key={offre.id}>
                        <TableCell>{offre.titre}</TableCell>
                        <TableCell>{offre.categorie}</TableCell>
                        <TableCell>{offre.clickByBnm ? "Oui" : "Non"}</TableCell>
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
