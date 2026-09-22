/**
 * Legal texts (Impressum, Datenschutzerklärung, AGB) — transcribed verbatim
 * from the client-supplied PDFs. Edit wording here only on client instruction.
 */

export type LegalBlock =
  | { type: "p"; text: string }
  /** Postal/contact block — rendered line by line; e-mail lines become mailto links. */
  | { type: "address"; lines: string[] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  title: string;
  subtitle?: string;
  updated?: string;
  sections: LegalSection[];
};

const p = (text: string): LegalBlock => ({ type: "p", text });
const address = (...lines: string[]): LegalBlock => ({ type: "address", lines });

const COMPANY_ADDRESS = [
  "Meridius Management GmbH",
  "Churerstrasse 158",
  "8808 Pfäffikon SZ",
  "Schweiz",
];

export const impressum: LegalDocument = {
  title: "Impressum",
  updated: "September 2026",
  sections: [
    {
      id: "anbieterin",
      title: "Anbieterin und verantwortliche Stelle",
      blocks: [
        address(...COMPANY_ADDRESS),
        address("Vertretungsberechtigte Person:", "Thomas Meier, Geschäftsführer"),
        address("E-Mail:", "info@meridius-collection.ch"),
      ],
    },
    {
      id: "handelsregister",
      title: "Handelsregister",
      blocks: [
        address(
          "Sitz: Freienbach",
          "Kanton: Schwyz",
          "Rechtsform: GmbH",
          "Handelsregistereintrag: Kanton Schwyz",
        ),
      ],
    },
    {
      id: "verantwortlichkeit",
      title: "Verantwortlichkeit für den Inhalt",
      blocks: [
        p("Für die Inhalte dieser Website ist die Meridius Management GmbH verantwortlich."),
        p(
          "Die Meridius Management GmbH bemüht sich um die Richtigkeit und Aktualität der auf dieser Website bereitgestellten Informationen. Eine Gewähr für die Vollständigkeit, Richtigkeit und Aktualität der Inhalte kann jedoch nicht übernommen werden.",
        ),
      ],
    },
    {
      id: "externe-links",
      title: "Haftung für externe Links",
      blocks: [
        p(
          "Diese Website kann Links zu externen Websites Dritter enthalten. Für deren Inhalte und deren Betrieb ist ausschliesslich der jeweilige Betreiber verantwortlich.",
        ),
      ],
    },
    {
      id: "urheberrecht",
      title: "Urheberrecht",
      blocks: [
        p(
          "Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem Schweizer Urheberrecht. Jede Verwendung, Vervielfältigung oder Weitergabe ausserhalb der gesetzlichen Schranken bedarf der vorherigen Zustimmung der Meridius Management GmbH, soweit nicht Rechte Dritter betroffen sind.",
        ),
      ],
    },
  ],
};

export const datenschutz: LegalDocument = {
  title: "Datenschutzerklärung",
  subtitle: "Meridius Collection, meridius-collection.ch",
  sections: [
    {
      id: "verantwortlicher",
      title: "1. Verantwortlicher",
      blocks: [
        p(
          "Verantwortlich für die Bearbeitung von Personendaten im Zusammenhang mit der Website meridius-collection.ch und den damit verbundenen Dienstleistungen ist:",
        ),
        address(...COMPANY_ADDRESS),
        address("Verantwortliche Person: Thomas Meier", "E-Mail: info@meridius-collection.ch"),
      ],
    },
    {
      id: "geltungsbereich",
      title: "2. Geltungsbereich",
      blocks: [
        p(
          "Diese Datenschutzerklärung informiert darüber, wie die Meridius Management GmbH im Rahmen von Meridius Collection Personendaten bearbeitet. Meridius Collection dient insbesondere dem Forderungsmanagement und dem Einzug von Forderungen für Auftraggeber. Die Dienstleistungen können auch für externe Dritte erbracht werden. Die Bearbeitung erfolgt nach dem geltenden schweizerischen Datenschutzrecht, insbesondere dem Bundesgesetz über den Datenschutz (DSG).",
        ),
      ],
    },
    {
      id: "personendaten",
      title: "3. Welche Personendaten werden bearbeitet?",
      blocks: [
        p(
          "Je nach Vorgang können insbesondere Vor- und Nachname, Adresse, Geburtsdatum soweit erforderlich, Telefonnummer, E-Mail-Adresse, Angaben zu Forderungen, Rechnungs- und Vertragsdaten, Zahlungsinformationen, Angaben zu Zahlungen und offenen Beträgen, Korrespondenz, Einwendungen, Vereinbarungen sowie technische Daten bei der Website-Nutzung bearbeitet werden. Es werden nur Daten bearbeitet, die für den jeweiligen Zweck erforderlich sind oder rechtmässig zur Verfügung gestellt wurden.",
        ),
      ],
    },
    {
      id: "herkunft",
      title: "4. Herkunft der Personendaten",
      blocks: [
        p(
          "Personendaten können von der betroffenen Person selbst, von Auftraggebern bzw. Gläubigern, Geschäftspartnern, Vertragspartnern, Behörden oder anderen am Vorgang beteiligten Stellen stammen. Werden Daten nicht direkt bei der betroffenen Person beschafft, werden die verfügbaren Angaben über ihre Herkunft im Rahmen des Gesetzes berücksichtigt und auf Anfrage mitgeteilt.",
        ),
      ],
    },
    {
      id: "verantwortung-daten",
      title: "5. Verantwortung für übermittelte Daten",
      blocks: [
        p(
          "Auftraggeber und andere Datenlieferanten sind dafür verantwortlich, dass die von ihnen übermittelten Daten rechtmässig erhoben und übermittelt werden und nach ihrem Kenntnisstand richtig und vollständig sind. Die Meridius Management GmbH ist grundsätzlich nicht verpflichtet, diese Angaben auf ihre tatsächliche Richtigkeit, Echtheit oder Vollständigkeit zu überprüfen. Bei konkreten Anhaltspunkten für Unrichtigkeit, Fälschung oder Missbrauch können weitere Nachweise verlangt und Bearbeitungen ausgesetzt oder beendet werden.",
        ),
      ],
    },
    {
      id: "zwecke",
      title: "6. Zwecke der Datenbearbeitung",
      blocks: [
        p(
          "Personendaten werden insbesondere zur Bearbeitung und Verwaltung von Forderungen, Kommunikation mit Schuldnern, Gläubigern und weiteren Beteiligten, Bearbeitung von Zahlungen und Einwendungen, Dokumentation und Nachweis von Geschäftsvorgängen, Erfüllung gesetzlicher Pflichten, Wahrung eigener Rechte und Ansprüche sowie zur Verhinderung von Missbrauch und betrügerischen Aktivitäten bearbeitet.",
        ),
      ],
    },
    {
      id: "empfaenger",
      title: "7. Empfänger und Bekanntgabe",
      blocks: [
        p(
          "Personendaten können im Rahmen der gesetzlichen Voraussetzungen insbesondere Auftraggebern bzw. Gläubigern, IT- und Hostingdienstleistern, Kommunikations- und Postdienstleistern, weiteren Auftragsbearbeitern sowie Behörden und Gerichten bekanntgegeben werden, soweit dies für den jeweiligen Zweck erforderlich oder gesetzlich zulässig bzw. vorgeschrieben ist.",
        ),
      ],
    },
    {
      id: "auftragsbearbeitung",
      title: "8. Auftragsbearbeitung durch Dritte",
      blocks: [
        p(
          "Für bestimmte Tätigkeiten können externe Dienstleister eingesetzt werden. Soweit diese Personendaten im Auftrag bearbeiten, werden die erforderlichen vertraglichen und organisatorischen Massnahmen getroffen. Die Auswahl und Kontrolle von Auftragsbearbeitern richtet sich nach den gesetzlichen Anforderungen.",
        ),
      ],
    },
    {
      id: "ausland",
      title: "9. Bekanntgabe ins Ausland",
      blocks: [
        p(
          "Personendaten können nur unter den Voraussetzungen des Schweizer Datenschutzrechts ins Ausland bekanntgegeben werden. Erfolgt eine solche Bekanntgabe, werden die betroffenen Personen über den Empfängerstaat und, soweit erforderlich, über die zur Sicherstellung eines angemessenen Datenschutzniveaus eingesetzten Garantien oder gesetzlichen Ausnahmen informiert.",
        ),
      ],
    },
    {
      id: "cookies",
      title: "10. Website, Cookies und Logdaten",
      blocks: [
        p(
          "Beim Besuch der Website können technische Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seiten, Browser, Betriebssystem und Verbindungsdaten bearbeitet werden. Cookies oder vergleichbare Technologien können zur technischen Funktion, Sicherheit, Speicherung von Einstellungen sowie, sofern eingesetzt, Analyse oder Statistik verwendet werden.",
        ),
      ],
    },
    {
      id: "datensicherheit",
      title: "11. Datensicherheit",
      blocks: [
        p(
          "Die Meridius Management GmbH trifft angemessene technische und organisatorische Massnahmen zum Schutz von Personendaten vor Verlust, Missbrauch, unberechtigtem Zugriff, Veränderung oder Offenlegung. Eine absolute Sicherheit der Datenübertragung über das Internet kann nicht garantiert werden.",
        ),
      ],
    },
    {
      id: "aufbewahrung",
      title: "12. Aufbewahrung",
      blocks: [
        p(
          "Personendaten werden so lange aufbewahrt, wie dies für den jeweiligen Zweck erforderlich ist. Zusätzlich können gesetzliche Aufbewahrungs- und Dokumentationspflichten oder berechtigte Interessen eine längere Aufbewahrung erfordern. Danach werden Daten gelöscht oder anonymisiert, soweit keine andere rechtliche Grundlage für eine weitere Aufbewahrung besteht.",
        ),
      ],
    },
    {
      id: "profiling",
      title: "13. Automatisierte Einzelentscheidungen und Profiling",
      blocks: [
        p(
          "Es werden grundsätzlich keine automatisierten Einzelentscheidungen getroffen, die ausschliesslich auf automatisierter Bearbeitung beruhen und für die betroffene Person eine rechtliche oder ähnlich erhebliche Wirkung haben. Soweit künftig eine solche Bearbeitung eingesetzt wird, werden die gesetzlich erforderlichen Informationen erteilt und die gesetzlich vorgesehenen Rechte gewährt.",
        ),
      ],
    },
    {
      id: "rechte",
      title: "14. Rechte betroffener Personen",
      blocks: [
        p(
          "Betroffene Personen haben im Rahmen des DSG insbesondere Rechte auf Auskunft sowie, soweit die gesetzlichen Voraussetzungen erfüllt sind, auf Berichtigung, Löschung oder Einschränkung der Bearbeitung und auf Datenherausgabe bzw. Datenübertragung. Die Rechte können gesetzlichen Einschränkungen unterliegen.",
        ),
      ],
    },
    {
      id: "auskunft",
      title: "15. Auskunftsbegehren",
      blocks: [
        p("Datenschutzrechtliche Begehren können an die oben genannte Adresse gerichtet werden:"),
        address(
          ...COMPANY_ADDRESS,
          "Verantwortliche Person: Thomas Meier",
          "E-Mail: info@meridius-collection.ch",
        ),
        p(
          "Zur Verhinderung einer unberechtigten Offenlegung kann eine geeignete Identifikation der anfragenden Person verlangt werden.",
        ),
      ],
    },
    {
      id: "verletzungen",
      title: "16. Datenschutzverletzungen",
      blocks: [
        p(
          "Bei einer Verletzung der Datensicherheit werden die nach dem DSG erforderlichen Massnahmen getroffen. Soweit gesetzlich erforderlich, wird der EDÖB und/oder die betroffene Person informiert.",
        ),
      ],
    },
    {
      id: "links-dritter",
      title: "17. Links zu Websites Dritter",
      blocks: [
        p(
          "Die Website kann Links zu externen Websites enthalten. Für deren Datenbearbeitungen sind grundsätzlich die jeweiligen Betreiber verantwortlich.",
        ),
      ],
    },
    {
      id: "aenderungen",
      title: "18. Änderungen",
      blocks: [
        p(
          "Diese Datenschutzerklärung kann angepasst werden, insbesondere bei Änderungen der Dienstleistungen, technischen Systeme oder gesetzlichen Anforderungen. Es gilt die jeweils auf der Website veröffentlichte aktuelle Fassung.",
        ),
      ],
    },
  ],
};

export const agb: LegalDocument = {
  title: "Allgemeine Geschäftsbedingungen (AGB)",
  subtitle: "Meridius Collection",
  updated: "September 2026",
  sections: [
    {
      id: "geltungsbereich",
      title: "1. Geltungsbereich",
      blocks: [
        p(
          "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche Dienstleistungen der Meridius Management GmbH, insbesondere im Bereich Inkasso und Forderungsmanagement.",
        ),
        p("Mit der Beauftragung der Meridius Management GmbH akzeptiert der Auftraggeber diese AGB."),
        p(
          "Abweichende Vereinbarungen bedürfen der schriftlichen Bestätigung durch die Meridius Management GmbH.",
        ),
      ],
    },
    {
      id: "dienstleistungen",
      title: "2. Dienstleistungen",
      blocks: [
        p(
          "Die Meridius Management GmbH erbringt Dienstleistungen im Bereich Forderungsmanagement und Inkasso.",
        ),
        p(
          "Der konkrete Umfang der Dienstleistungen richtet sich nach der jeweiligen Vereinbarung mit dem Auftraggeber.",
        ),
        p(
          "Die Meridius Management GmbH ist berechtigt, zur Erfüllung eines Auftrags geeignete Dritte beizuziehen, soweit dies zur ordnungsgemässen Durchführung des Auftrags erforderlich und gesetzlich zulässig ist.",
        ),
      ],
    },
    {
      id: "auftragserteilung",
      title: "3. Auftragserteilung",
      blocks: [
        p(
          "Der Auftraggeber stellt der Meridius Management GmbH alle für die Bearbeitung einer Forderung erforderlichen Informationen und Unterlagen zur Verfügung.",
        ),
        p(
          "Der Auftraggeber bestätigt mit der Auftragserteilung, dass er zur Geltendmachung der übergebenen Forderung berechtigt ist und dass die übermittelten Angaben nach bestem Wissen korrekt und vollständig sind.",
        ),
        p(
          "Der Auftraggeber ist verpflichtet, die Meridius Management GmbH unverzüglich über Änderungen, Zahlungen, Vergleiche, Einwendungen oder sonstige Umstände zu informieren, welche die Forderung betreffen.",
        ),
      ],
    },
    {
      id: "verantwortung-forderung",
      title: "4. Verantwortung des Auftraggebers für die Forderung",
      blocks: [
        p(
          "Der Auftraggeber bleibt für Bestand, Höhe, Begründetheit und Rechtmässigkeit der übergebenen Forderung verantwortlich.",
        ),
        p(
          "Der Auftraggeber stellt sicher, dass die Forderung tatsächlich besteht und gegenüber dem jeweiligen Schuldner geltend gemacht werden darf.",
        ),
        p(
          "Die Meridius Management GmbH übernimmt keine Gewähr dafür, dass eine Forderung erfolgreich eingezogen werden kann.",
        ),
        p(
          "Die Beurteilung der rechtlichen Durchsetzbarkeit einer Forderung erfolgt, soweit nicht ausdrücklich anders vereinbart, nicht als Rechtsberatung.",
        ),
      ],
    },
    {
      id: "daten",
      title: "5. Richtigkeit, Echtheit und Herkunft übermittelter Daten",
      blocks: [
        p(
          "Der Auftraggeber bzw. der jeweilige Datenlieferant ist dafür verantwortlich, dass sämtliche der Meridius Management GmbH übermittelten Daten, Angaben und Unterlagen wahr, vollständig, echt und nicht gefälscht, manipuliert oder betrügerisch sind und dass deren Übermittlung und Verwendung rechtmässig erfolgt.",
        ),
        p(
          "Die Meridius Management GmbH nimmt die vom Auftraggeber bzw. Datenlieferanten übermittelten Daten und Unterlagen grundsätzlich im Vertrauen darauf entgegen, dass diese als wahr, echt, vollständig und nicht betrügerisch oder falsch übermittelt wurden.",
        ),
        p(
          "Die Meridius Management GmbH ist grundsätzlich nicht verpflichtet, die von Auftraggebern oder sonstigen Datenlieferanten übermittelten Daten auf deren tatsächliche Richtigkeit, Echtheit oder Vollständigkeit zu überprüfen.",
        ),
        p(
          "Eine solche Überprüfung erfolgt nur, soweit dies ausdrücklich vereinbart, aufgrund konkreter Anhaltspunkte erforderlich oder gesetzlich vorgeschrieben ist.",
        ),
        p(
          "Die Verantwortung für die Richtigkeit, Vollständigkeit, Echtheit und rechtmässige Herkunft der übermittelten Daten verbleibt beim jeweiligen Auftraggeber bzw. Datenlieferanten.",
        ),
        p(
          "Die Meridius Management GmbH übernimmt, soweit gesetzlich zulässig, keine Haftung für Schäden, Ansprüche oder sonstige Nachteile, die aufgrund falscher, unvollständiger, gefälschter, manipulierter, betrügerischer oder anderweitig unrichtiger Daten entstehen, die von einem Auftraggeber oder Datenlieferanten übermittelt wurden.",
        ),
        p(
          "Stellt die Meridius Management GmbH nachträglich fest oder bestehen konkrete Anhaltspunkte dafür, dass übermittelte Daten unrichtig, gefälscht, manipuliert oder betrügerisch sein könnten, ist sie berechtigt, die Bearbeitung der betreffenden Angelegenheit auszusetzen, weitere Nachweise zu verlangen oder den Auftrag abzulehnen bzw. zu beenden.",
        ),
        p("Zwingende gesetzliche Haftungsbestimmungen bleiben vorbehalten."),
      ],
    },
    {
      id: "zahlungen",
      title: "6. Zahlungen",
      blocks: [
        p(
          "Zahlungen des Schuldners werden nach den zwischen dem Auftraggeber und der Meridius Management GmbH vereinbarten Bedingungen abgerechnet.",
        ),
        p("Direkt an den Auftraggeber geleistete Zahlungen sind der Meridius Management GmbH unverzüglich mitzuteilen."),
        p(
          "Die Abrechnung und Auszahlung eingegangener Beträge erfolgt gemäss der jeweiligen Vereinbarung mit dem Auftraggeber.",
        ),
      ],
    },
    {
      id: "kosten",
      title: "7. Kosten und Vergütung",
      blocks: [
        p(
          "Die Vergütung der Meridius Management GmbH richtet sich nach der bei Auftragserteilung vereinbarten Gebühren- oder Provisionsregelung.",
        ),
        p("Sofern vereinbart, können zusätzlich tatsächlich angefallene und notwendige Auslagen verrechnet werden."),
        p("Alle Preise verstehen sich, soweit gesetzlich geschuldet, zuzüglich der jeweils geltenden Mehrwertsteuer."),
      ],
    },
    {
      id: "mitwirkung",
      title: "8. Mitwirkungspflichten",
      blocks: [
        p(
          "Der Auftraggeber verpflichtet sich, die Meridius Management GmbH bei der Bearbeitung der Forderung angemessen zu unterstützen.",
        ),
        p(
          "Insbesondere sind relevante Unterlagen, Korrespondenzen, Zahlungsinformationen und Angaben zum Schuldner vollständig und wahrheitsgemäss zur Verfügung zu stellen.",
        ),
        p(
          "Der Auftraggeber hat die Meridius Management GmbH unverzüglich über ihm bekannte Fehler oder Unrichtigkeiten in den übermittelten Daten zu informieren.",
        ),
        p(
          "Verzögerungen oder Mehraufwand aufgrund unvollständiger, fehlerhafter oder verspätet übermittelter Angaben können dem Auftraggeber in Rechnung gestellt werden, sofern dies vereinbart wurde.",
        ),
      ],
    },
    {
      id: "datenschutz",
      title: "9. Datenschutz",
      blocks: [
        p(
          "Die Meridius Management GmbH bearbeitet personenbezogene Daten im Rahmen der gesetzlichen Bestimmungen, insbesondere des schweizerischen Datenschutzgesetzes (DSG).",
        ),
        p(
          "Personendaten werden nur soweit bearbeitet, wie dies für die Erbringung der vereinbarten Dienstleistungen, die Erfüllung gesetzlicher Pflichten oder zur Wahrung berechtigter Interessen erforderlich ist.",
        ),
        p(
          "Weitere Informationen zur Bearbeitung personenbezogener Daten sind in der Datenschutzerklärung der Meridius Management GmbH enthalten.",
        ),
      ],
    },
    {
      id: "vertraulichkeit",
      title: "10. Vertraulichkeit",
      blocks: [
        p(
          "Die Meridius Management GmbH behandelt die im Rahmen eines Auftrags erhaltenen Informationen vertraulich und verwendet diese grundsätzlich nur für die vereinbarten Zwecke sowie zur Erfüllung gesetzlicher Verpflichtungen.",
        ),
        p("Gesetzliche Offenlegungs- und Auskunftspflichten bleiben vorbehalten."),
      ],
    },
    {
      id: "haftung",
      title: "11. Haftung",
      blocks: [
        p("Die Meridius Management GmbH haftet für Schäden nur im Rahmen der gesetzlichen Bestimmungen."),
        p(
          "Eine Haftung für den wirtschaftlichen Erfolg eines Inkassoauftrags, insbesondere für die tatsächliche Einbringlichkeit einer Forderung, wird ausgeschlossen, soweit dies gesetzlich zulässig ist.",
        ),
        p("Für indirekte Schäden und Folgeschäden wird die Haftung, soweit gesetzlich zulässig, ausgeschlossen."),
        p(
          "Die Haftungsregelung gemäss Ziffer 5 für falsche, unvollständige, gefälschte, manipulierte oder betrügerische Daten bleibt vorbehalten.",
        ),
        p("Zwingende gesetzliche Haftungsbestimmungen bleiben unberührt."),
      ],
    },
    {
      id: "kommunikation",
      title: "12. Kommunikation",
      blocks: [
        p(
          "Die Kommunikation mit Auftraggebern kann insbesondere per E-Mail, Telefon oder über andere vereinbarte Kommunikationswege erfolgen.",
        ),
        p(
          "Der Auftraggeber ist dafür verantwortlich, dass seine Kontaktangaben aktuell sind, und hat Änderungen der Meridius Management GmbH unverzüglich mitzuteilen.",
        ),
      ],
    },
    {
      id: "beendigung",
      title: "13. Beendigung eines Auftrags",
      blocks: [
        p("Ein Auftrag kann nach den jeweils vereinbarten Bedingungen beendet werden."),
        p(
          "Bereits entstandene Ansprüche der Meridius Management GmbH bleiben von der Beendigung des Auftrags unberührt.",
        ),
        p("Die Beendigung eines Auftrags lässt gesetzliche oder vertragliche Aufbewahrungspflichten unberührt."),
      ],
    },
    {
      id: "aenderungen",
      title: "14. Änderungen der AGB",
      blocks: [
        p(
          "Die Meridius Management GmbH kann diese AGB anpassen, wenn dies aufgrund gesetzlicher Änderungen, Änderungen der Dienstleistungen oder anderer sachlicher Gründe erforderlich ist.",
        ),
        p(
          "Für bereits erteilte Aufträge gelten grundsätzlich die bei Auftragserteilung vereinbarten Bedingungen, sofern nicht ausdrücklich etwas anderes vereinbart wurde.",
        ),
      ],
    },
    {
      id: "recht",
      title: "15. Anwendbares Recht",
      blocks: [
        p(
          "Auf sämtliche Rechtsverhältnisse zwischen der Meridius Management GmbH und dem Auftraggeber ist, soweit gesetzlich zulässig, schweizerisches Recht anwendbar.",
        ),
      ],
    },
    {
      id: "gerichtsstand",
      title: "16. Gerichtsstand",
      blocks: [
        p(
          "Soweit gesetzlich zulässig, ist der Sitz der Meridius Management GmbH Gerichtsstand für sämtliche Streitigkeiten aus oder im Zusammenhang mit dem Vertragsverhältnis.",
        ),
        p("Zwingende gesetzliche Gerichtsstände bleiben vorbehalten."),
      ],
    },
    {
      id: "anbieter",
      title: "Anbieter",
      blocks: [
        address(
          "Meridius Management GmbH",
          "Schweiz",
          "E-Mail: info@meridius-collection.ch",
          "Website: www.meridius-collection.ch",
        ),
      ],
    },
  ],
};
