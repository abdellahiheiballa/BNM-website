import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Building, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

type ContactFormValues = { nom: string; email: string; telephone?: string; sujet?: string; message: string };

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  const contactSchema = z.object({
    nom: z.string().min(2, t("contact.nameMin", { defaultValue: "Le nom doit contenir au moins 2 caractères" })),
    email: z.string().email(t("contact.emailInvalid", { defaultValue: "Adresse email invalide" })),
    telephone: z.string().optional(),
    sujet: z.string().optional(),
    message: z.string().min(10, t("contact.messageMin", { defaultValue: "Le message doit contenir au moins 10 caractères" })),
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nom: "",
      email: "",
      telephone: "",
      sujet: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    submitContact.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: t("contact.sentTitle"),
            description: t("contact.sentDescription"),
          });
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: t("contact.sendErrorTitle"),
            description: t("contact.sendErrorDescription"),
          });
        }
      }
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      {/* Header */}
      <section className="bg-primary py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/images/cubes.png')]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{t("contact.title")}</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              {t("contact.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="rounded-none border-t-4 border-t-secondary shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-6 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-secondary" />
                    {t("contact.headquarters")}
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-3 mt-0.5 text-primary shrink-0" />
                      <span>Avenue Gamal Abdel Nasser<br />BP 614, Nouakchott<br />Mauritanie</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-3 text-primary shrink-0" />
                      <span className="font-medium text-foreground">+222 45 25 26 02</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-primary shrink-0" />
                      <span>contact@bnm.mr</span>
                    </div>
                    <div className="flex items-start pt-2 border-t mt-4">
                      <Clock className="w-5 h-5 mr-3 mt-0.5 text-primary shrink-0" />
                      <div>
                        <span className="font-semibold text-foreground block mb-1">{t("contact.openingHours")}</span>
                        <span className="text-sm whitespace-pre-line">{t("contact.hours")}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-none bg-primary text-white border-none shadow-md">
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="text-lg font-bold">{t("contact.customerService")}</h3>
                  <p className="text-white/80 text-sm">
                    {t("contact.customerServiceDescription")}
                  </p>
                  <div className="inline-flex items-center justify-center bg-white/10 px-4 py-2 rounded-full font-mono text-xl tracking-wider font-bold">
                    1234
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="rounded-none shadow-md border-border h-full">
                <CardContent className="p-8 md:p-10">
                  <h2 className="text-2xl font-serif font-bold text-primary mb-6">{t("contact.sendMessage")}</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="nom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">{t("contact.fullName")}</FormLabel>
                              <FormControl>
                                <Input placeholder={t("contact.fullNamePlaceholder")} className="rounded-sm bg-muted/50 border-muted focus-visible:ring-secondary" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">{t("contact.email")}</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="votre.email@exemple.com" className="rounded-sm bg-muted/50 border-muted focus-visible:ring-secondary" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="telephone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">{t("contact.phone")}</FormLabel>
                              <FormControl>
                                <Input placeholder="+222 XX XX XX XX" className="rounded-sm bg-muted/50 border-muted focus-visible:ring-secondary" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="sujet"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">{t("contact.subject")}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="rounded-sm bg-muted/50 border-muted focus:ring-secondary">
                                    <SelectValue placeholder={t("contact.chooseSubject")} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="information">{t("contact.information")}</SelectItem>
                                  <SelectItem value="reclamation">{t("contact.complaint")}</SelectItem>
                                  <SelectItem value="partenariat">{t("contact.partnership")}</SelectItem>
                                  <SelectItem value="autre">{t("contact.other")}</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary font-semibold">{t("contact.message")}</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder={t("contact.messagePlaceholder")} 
                                className="min-h-[150px] rounded-sm bg-muted/50 border-muted focus-visible:ring-secondary resize-y"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full md:w-auto bg-primary text-white hover:bg-primary/90 font-bold px-10 rounded-none h-12"
                        disabled={submitContact.isPending}
                      >
                        {submitContact.isPending ? (
                          t("contact.sending")
                        ) : (
                          <>{t("contact.send")} <Send className="ml-2 w-4 h-4" /></>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
