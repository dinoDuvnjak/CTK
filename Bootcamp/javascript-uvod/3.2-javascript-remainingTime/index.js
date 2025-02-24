function preostaloVremena(trenutnaDob) {
    const maksimalnaDob = 90;
  
    if (trenutnaDob >= maksimalnaDob) {
      console.log("Već ste dostigli ili premašili 90 godina.");
      return;
    }
  
    const godinePreostalo = maksimalnaDob - trenutnaDob;
    const danaPreostalo = godinePreostalo * 365;
    const tjedanaPreostalo = godinePreostalo * 52;
    const mjeseciPreostalo = godinePreostalo * 12;
  
    console.log(`Ako živite do ${maksimalnaDob} godina, preostalo vam je:
    ${danaPreostalo} dana,
    ${tjedanaPreostalo} tjedana,
    ${mjeseciPreostalo} mjeseci.`);
  }
  
  // Primjer poziva funkcije:
  preostaloVremena(25);
  