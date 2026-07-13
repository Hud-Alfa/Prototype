import {
  cizgiler,
  odalar,
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
  cizgiler.forEach((c) => {
    cizgiKatmani.graphics
      .beginStroke("#7945ac")
      .setStrokeStyle(4)
      .moveTo(c.x1, c.y1)
      .lineTo(c.x2, c.y2);
    cizgiKatmani.graphics.beginFill("#9a44ef").drawCircle(c.x1, c.y1, 4);
    cizgiKatmani.graphics.beginFill("#9144ef").drawCircle(c.x2, c.y2, 4);
  });

  // Sahneyi (Stage) tarayıcıya yansıt
  stage.update();
}