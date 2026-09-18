import { Switch, Route, Router as WouterRouter } from "wouter";
import { I18nextProvider, useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Layout from "./components/layout/Layout";
import NotFound from "@/pages/not-found";

// Public Pages
import Home from "./pages/Home";
import Particuliers from "./pages/Particuliers";
import Professionnels from "./pages/Professionnels";
import Entreprises from "./pages/Entreprises";
import FinanceIslamique from "./pages/FinanceIslamique";
import Actualites from "./pages/Actualites";
import ActualiteDetail from "./pages/ActualiteDetail";
import DevenirClient from "./pages/DevenirClient";
import Contact from "./pages/Contact";
import APropos from "./pages/APropos";
import Simulateur from "./pages/Simulateur";
import Agences from "./pages/Agences";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminActualiteEdit from "./pages/AdminActualiteEdit";
import AdminOffreEdit from "./pages/AdminOffreEdit";
import i18n from "./i18n";
import { useEffect } from "react";

const queryClient = new QueryClient();

function LocaleDocument() {
  const { i18n: activeI18n } = useTranslation();

  useEffect(() => {
    const language = activeI18n.language === "ar" ? "ar" : "fr";
    const isArabic = language === "ar";

    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.body.dir = isArabic ? "rtl" : "ltr";
    document.body.style.fontFamily = isArabic
      ? '"Noto Sans Arabic", "Segoe UI", Tahoma, Arial, sans-serif'
      : '"Inter", "Segoe UI", sans-serif';

    window.localStorage.setItem("bnm-language-v1", language);
  }, [activeI18n, activeI18n.language]);

  return null;
}

function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (!user) {
    window.location.href = "/admin/login";
    return null;
  }
  return <Component />;
}

function Router() {
  return (
    <Layout>
      <Switch>
        {/* Public routes */}
        <Route path="/" component={Home} />
        <Route path="/particuliers" component={Particuliers} />
        <Route path="/professionnels" component={Professionnels} />
        <Route path="/entreprises" component={Entreprises} />
        <Route path="/finance-islamique" component={FinanceIslamique} />
        <Route path="/actualites" component={Actualites} />
        <Route path="/actualites/:id" component={ActualiteDetail} />
        <Route path="/devenir-client" component={DevenirClient} />
        <Route path="/contact" component={Contact} />
        <Route path="/a-propos" component={APropos} />
        <Route path="/simulateur" component={Simulateur} />
        <Route path="/agences" component={Agences} />
        {/* Admin routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={() => <AdminRoute component={AdminDashboard} />} />
        <Route path="/admin/actualites/new" component={() => <AdminRoute component={AdminActualiteEdit} />} />
        <Route path="/admin/actualites/edit/:id" component={() => <AdminRoute component={AdminActualiteEdit} />} />
        <Route path="/admin/offres/new" component={() => <AdminRoute component={AdminOffreEdit} />} />
        <Route path="/admin/offres/edit/:id" component={() => <AdminRoute component={AdminOffreEdit} />} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <LocaleDocument />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
