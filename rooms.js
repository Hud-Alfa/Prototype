import {
  cizgiler,
  setOdalar,
} from "./state.js";

import { kenarVarMi } from "./snap.js";

export function odalariYenidenHesapla() {
  const yeniOdalar = [];
  const noktalar = [];

  cizgiler.forEach((c) => {
    if (!noktalar.some((n) => n.x === c.x1 && n.y === c.y1)) {
      noktalar.push({ x: c.x1, y: c.y1 });
    }

    if (!noktalar.some((n) => n.x === c.x2 && n.y === c.y2)) {
      noktalar.push({ x: c.x2, y: c.y2 });
    }
  });

  for (const nokta1 of noktalar) {
    for (const nokta2 of noktalar) {
      if (nokta1.x < nokta2.x && nokta1.y < nokta2.y) {
        const x1 = nokta1.x;
        const y1 = nokta1.y;
        const x2 = nokta2.x;
        const y2 = nokta2.y;

        const ust = kenarVarMi(x1, y1, x2, y1);
        const alt = kenarVarMi(x1, y2, x2, y2);
        const sol = kenarVarMi(x1, y1, x1, y2);
        const sag = kenarVarMi(x2, y1, x2, y2);

        if (ust && alt && sol && sag) {
          yeniOdalar.push({
            x: x1,
            y: y1,
            w: x2 - x1,
            h: y2 - y1,
          });
        }
      }
    }
  }

  setOdalar(yeniOdalar);
}