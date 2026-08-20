import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useListAgences, type Agence } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Phone, Clock, Search, MapIcon, Mail } from "lucide-react";

const defaultIcon = new L.Icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type AgenceWithCoords = Agence & {
  latitude: number;
  longitude: number;
};

function MapController({ agence, onCenterChange }: { agence: AgenceWithCoords | null; onCenterChange: (center: [number, number], zoom: number) => void }) {
  const map = useMap();

  useEffect(() => {
    if (!agence) return;
    map.flyTo([agence.latitude, agence.longitude], 13, { duration: 0.8 });
    onCenterChange([agence.latitude, agence.longitude], 13);
  }, [agence, map, onCenterChange]);

  return null;
}

export default function Agences() {
  const { data: agences, isLoading } = useListAgences();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Toutes");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([18.086, -15.975]);
  const [mapZoom, setMapZoom] = useState(12);
  const agencesArray = Array.isArray(agences) ? agences : [];

  const cities = useMemo(() => {
    if (agencesArray.length === 0) return ["Toutes"];
    const uniqueCities = new Set(agencesArray.map(a => a.ville).filter(Boolean));
    return ["Toutes", ...Array.from(uniqueCities)] as string[];
  }, [agencesArray]);

  const filteredAgences = useMemo(() => {
    if (agencesArray.length === 0) return [];
    return agencesArray.filter(agence => {
      const matchesCity = selectedCity === "Toutes" || agence.ville === selectedCity;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        agence.nom.toLowerCase().includes(searchLower) ||
        (agence.ville && agence.ville.toLowerCase().includes(searchLower)) ||
        (agence.adresse && agence.adresse.toLowerCase().includes(searchLower));

      return matchesCity && matchesSearch;
    });
  }, [agences, searchQuery, selectedCity]);

  const selectedAgence = useMemo(
    () => agencesArray.find(a => a.id === selectedId) ?? filteredAgences[0] ?? null,
    [agencesArray, filteredAgences, selectedId],
  );

  useEffect(() => {
    if (isLoading || selectedId !== null || agencesArray.length === 0) return;
    const nouakchott = agencesArray.find(a => a.ville === "Nouakchott");
    if (nouakchott) setSelectedId(nouakchott.id);
  }, [isLoading, selectedId, agencesArray]);

  const selectedAgenceWithCoords: AgenceWithCoords | null = selectedAgence && selectedAgence.latitude && selectedAgence.longitude
    ? { ...selectedAgence, latitude: selectedAgence.latitude, longitude: selectedAgence.longitude }
    : null;

  const mapPanel = (
    <Card className="h-[620px] rounded-none overflow-hidden shadow-md sticky top-24">
      <div className="h-full w-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center bg-muted">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        ) : selectedAgenceWithCoords ? (
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            className="h-full w-full"
          >
            <MapController agence={selectedAgenceWithCoords} onCenterChange={setMapCenter} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredAgences
              .filter((a): a is AgenceWithCoords => Boolean(a.latitude && a.longitude))
              .map((agence) => (
                <Marker
                  key={agence.id}
                  position={[agence.latitude, agence.longitude]}
                  icon={defaultIcon}
                  eventHandlers={{
                    click: () => setSelectedId(agence.id),
                  }}
                />
              ))}
          </MapContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-muted text-center p-8">
            <MapIcon className="w-14 h-14 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">Carte indisponible</h3>
            <p className="text-muted-foreground">Aucune coordonnée n'est disponible pour les agences affichées.</p>
          </div>
        )}
      </div>
    </Card>
  );

  const listPanel = (
    <div className="space-y-4">
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="rounded-none">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2 mb-6" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredAgences.length > 0 ? (
        filteredAgences.map(agence => (
          <Card
            key={agence.id}
            className={`group rounded-none border-t-4 transition-all shadow-sm hover:shadow-md cursor-pointer ${
              selectedId === agence.id
                ? "border-t-secondary bg-secondary/10"
                : "border-t-transparent hover:border-t-secondary"
            }`}
            onClick={() => setSelectedId(agence.id)}
          >
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                {agence.nom}
              </h3>

              <div className="space-y-3 pt-2 text-muted-foreground">
                {agence.adresse && (
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-0.5 text-primary/40 shrink-0" />
                    <span className="text-sm leading-tight">{agence.adresse}<br/>{agence.ville}</span>
                  </div>
                )}

                 {agence.telephone && (
                   <div className="flex items-center">
                     <Phone className="w-5 h-5 mr-3 text-primary/40 shrink-0" />
                     <span className="text-sm font-medium text-foreground">{agence.telephone}</span>
                   </div>
                 )}

                 {agence.email && (
                   <div className="flex items-center">
                     <Mail className="w-5 h-5 mr-3 text-primary/40 shrink-0" />
                     <span className="text-sm font-medium text-foreground">{agence.email}</span>
                   </div>
                 )}

                 {agence.horaires && (
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 mr-3 mt-0.5 text-primary/40 shrink-0" />
                    <span className="text-sm">{agence.horaires}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t mt-4">
                <Button variant="ghost" className="w-full text-primary hover:text-secondary hover:bg-secondary/10 rounded-none justify-between">
                  Voir sur la carte <MapPin className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-20 bg-background border rounded-none">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium text-primary mb-2">Aucune agence trouvée</h3>
          <p className="text-muted-foreground">Modifiez vos critères de recherche pour trouver une agence.</p>
          <Button
            variant="outline"
            className="mt-6 rounded-none text-primary"
            onClick={() => {
              setSearchQuery("");
              setSelectedCity("Toutes");
              setSelectedId(null);
            }}
          >
            Réinitialiser la recherche
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      <section className="bg-primary py-16 text-white relative">
        <div className="container mx-auto px-4 text-center relative z-20">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapIcon className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Nos Agences</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Trouvez l'agence BNM la plus proche de chez vous parmi notre vaste réseau couvrant l'ensemble du territoire mauritanien.
          </p>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <Card className="mb-10 rounded-none border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Rechercher une agence, une adresse, une ville..."
                    className="pl-10 h-12 rounded-none bg-muted/50 border-transparent focus-visible:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {cities.map(city => (
                    <Button
                      key={city}
                      variant={selectedCity === city ? "default" : "outline"}
                      className={`rounded-none shrink-0 ${
                        selectedCity === city
                          ? "bg-secondary text-primary hover:bg-secondary/90"
                          : "text-primary border-primary/20 hover:bg-primary/5"
                      }`}
                      onClick={() => setSelectedCity(city)}
                    >
                      {city}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-primary">
              {isLoading ? "Recherche en cours..." : `${filteredAgences.length} agence${filteredAgences.length !== 1 ? 's' : ''} trouvée${filteredAgences.length !== 1 ? 's' : ''}`}
            </h2>
            <div className="text-sm text-muted-foreground">
              {!isLoading && `${agencesArray.length} agence${agencesArray.length !== 1 ? 's' : ''} au total`}
            </div>
          </div>

          <Card className="mb-10 rounded-none border-none shadow-sm">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-primary mb-4">Réseau d'agences BNM</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                <div>
                  <span className="block text-muted-foreground">Produit</span>
                  <span className="font-medium text-foreground">Agences</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Langue</span>
                  <span className="font-medium text-foreground">Français</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Statut</span>
                  <span className="font-medium text-foreground">Actif</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Mots-clés</span>
                  <span className="font-medium text-foreground">agences, réseau, adresses, téléphone, e-mail, localisation, gps, Nouakchott, Nouadhibou, Zouerate</span>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-primary mb-2">Combien d'agences compte le réseau BNM ?</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Le réseau de la BNM compte 35 agences réparties sur le territoire mauritanien (Nouakchott, Nouadhibou, Zouerate, et plusieurs villes de l'intérieur).
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-2">Quelles sont les agences de la BNM et leurs coordonnées ?</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Pour chaque agence sont indiqués, lorsqu'ils sont disponibles, le numéro de téléphone, l'adresse e-mail et les coordonnées GPS.
                    Utilisez la liste ci-dessous ou la carte pour localiser l'agence la plus proche de chez vous.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-primary">
              {isLoading ? "Recherche en cours..." : `${filteredAgences.length} agence${filteredAgences.length !== 1 ? 's' : ''} trouvée${filteredAgences.length !== 1 ? 's' : ''}`}
            </h2>
          </div>

          <Tabs defaultValue="list" className="lg:hidden">
            <TabsList className="grid w-full grid-cols-2 rounded-none">
              <TabsTrigger value="list">Liste</TabsTrigger>
              <TabsTrigger value="map">Carte</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="mt-4">{listPanel}</TabsContent>
            <TabsContent value="map" className="mt-4">{mapPanel}</TabsContent>
          </Tabs>

          <div className="hidden lg:grid grid-cols-[0.9fr_1.1fr] gap-6 items-start">
            {listPanel}
            {mapPanel}
          </div>
        </div>
      </section>
    </div>
  );
}
