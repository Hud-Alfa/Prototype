import {
  cizgiler,
  SNAP_MESAFESI,
} from "./state.js";


// Matematiksel Snap ve Hizalama fonksiyonlarımız kararlı halleriyle kalıyor
export function mesafeBul(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

export function cizgiUzerindeEnYakinNokta(x, y, x1, y1, x2, y2) {
  const A = x - x1;
  const B = y - y1;
  const C = x2 - x1;
  const D = y2 - y1;
  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  const param = lenSq !== 0 ? dot / lenSq : -1;
  let xx, yy;
  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }
  return { x: xx, y: yy, mesafe: mesafeBul(x, y, xx, yy) };
}

export function hesaplaSnap(mouseX, mouseY) {
  let enYakinNokta = { x: Math.round(mouseX), y: Math.round(mouseY) };
  let enKisaMesafe = SNAP_MESAFESI;

  for (const c of cizgiler) {
    const d1 = mesafeBul(mouseX, mouseY, c.x1, c.y1);
    if (d1 < enKisaMesafe) {
      enKisaMesafe = d1;
      enYakinNokta = { x: c.x1, y: c.y1 };
    }
    const d2 = mesafeBul(mouseX, mouseY, c.x2, c.y2);
    if (d2 < enKisaMesafe) {
      enKisaMesafe = d2;
      enYakinNokta = { x: c.x2, y: c.y2 };
    }
  }

  if (enKisaMesafe === SNAP_MESAFESI) {
    for (const c of cizgiler) {
      const sonuc = cizgiUzerindeEnYakinNokta(
        mouseX,
        mouseY,
        c.x1,
        c.y1,
        c.x2,
        c.y2,
      );
      if (sonuc.mesafe < enKisaMesafe) {
        enKisaMesafe = sonuc.mesafe;
        enYakinNokta = { x: Math.round(sonuc.x), y: Math.round(sonuc.y) };
      }
    }
  }
  return enYakinNokta;
}

export function hesaplaHizalama(x, y) {
  const donus = { x, y };

  for (const cizgi of cizgiler) {
    if (Math.abs(y - cizgi.y1) < SNAP_MESAFESI) {
      donus.y = cizgi.y1;
      break;
    }

    if (Math.abs(y - cizgi.y2) < SNAP_MESAFESI) {
      donus.y = cizgi.y2;
      break;
    }
  }

  for (const cizgi of cizgiler) {
    if (Math.abs(x - cizgi.x1) < SNAP_MESAFESI) {
      donus.x = cizgi.x1;
      break;
    }

    if (Math.abs(x - cizgi.x2) < SNAP_MESAFESI) {
      donus.x = cizgi.x2;
      break;
    }
  }

  return donus;
}

export function cizgiEslesiyorMu(cizgi, x1, y1, x2, y2) {
  const ayniYon =
    cizgi.x1 === x1 &&
    cizgi.y1 === y1 &&
    cizgi.x2 === x2 &&
    cizgi.y2 === y2;

  const tersYon =
    cizgi.x1 === x2 &&
    cizgi.y1 === y2 &&
    cizgi.x2 === x1 &&
    cizgi.y2 === y1;

  return ayniYon || tersYon;
}

export function kenarVarMi(x1, y1, x2, y2) {
  return cizgiler.some((cizgi) =>
    cizgiEslesiyorMu(cizgi, x1, y1, x2, y2),
  );
}