/** Metadata for the legally required machine-readable price list (NN 132/2026). */
export const cjenikMeta = {
  /** OIB objavljen na stranici. Za obrt pravilnik traži matični broj fizičke osobe — zamijeni ako nije isti. */
  oib: "05429065302",
  oblikObjekta: "Radionica s prodajom na daljinu",
  adresa: "V.Lisinskog172",
  mjesto: "Našice",
  adresaPrikaz: "Vatroslava Lisinskog 172, Našice, Hrvatska",
  oznakaObjekta: "Svaštaonica",
  oznakaPoslovnice: "POSL1",
  vrstaCjenika: "ROBA",
  marka: "Svaštaonica",
  cijenaNaDan: "10. 9. 2026.",
  jedinicaMjere: "kom",
  dir: "/cjenici",
  stableFile: "vazeci.csv",
  archiveDays: 15,
};

export const CSV_HEADERS = [
  "naziv",
  "sifra",
  "marka",
  "neto_kolicina",
  "jedinica_mjere",
  "maloprodajna_cijena",
  "poseban_oblik_prodaje",
  "cijena_za_jedinicu_mjere",
  "barkod",
  "ean_barkod",
  "bazna_cijena",
];
