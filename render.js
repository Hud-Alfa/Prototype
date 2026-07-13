import {
  cizgiler,
  odalar,
  seciliGrupId,
} from "./state.js";

import {
  stage,
  odaKatmani,
  cizgiKatmani,
} from "./stage.js";


// 2. EKRANI GÜNCELLEME (EASELJS TARZI)
export function ekraniGuncelle() {
  // Eski çizimleri temizle
  odaKatmani.graphics.clear();
  cizgiKatmani.graphics.clear();

  // Odaları EaselJS ile çiziyoruz
  odalar.forEach((oda) => {
    odaKatmani.graphics
      .beginFill("rgba(91, 14, 233, 0.15)")
      .drawRect(oda.x, oda.y, oda.w, oda.h);
  });

  // Çizgileri ve köşelerdeki kırmızı daireleri EaselJS ile çiziyoruz
  cizgiler.forEach((cizgi) => {
  const secili =
    cizgi.groupId === seciliGrupId;

  cizgiKatmani.graphics
    .beginStroke(secili ? "#ef4444" : "#7945ac")
    .setStrokeStyle(secili ? 6 : 4)
    .moveTo(cizgi.x1, cizgi.y1)
    .lineTo(cizgi.x2, cizgi.y2);

  cizgiKatmani.graphics
    .beginFill(secili ? "#ef4444" : "#9a44ef")
    .drawCircle(cizgi.x1, cizgi.y1, secili ? 5 : 4);

  cizgiKatmani.graphics
    .beginFill(secili ? "#ef4444" : "#9144ef")
    .drawCircle(cizgi.x2, cizgi.y2, secili ? 5 : 4);
});

  // Sahneyi (Stage) tarayıcıya yansıt
  stage.update();
}