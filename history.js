import {
  cizgiler,
  undoStack,
  redoStack,
  setCizgiler,
  setRedoStack,
} from "./state.js";

import { odalariYenidenHesapla } from "./rooms.js";
import { ekraniGuncelle } from "./render.js";

export function cizgiEkle(yeniCizgiler) {
  // İşlem öncesindeki çizgileri geçmişe kaydet
  undoStack.push(JSON.stringify(cizgiler));

  // Yeni işlem yapılınca redo geçmişini sıfırla
  setRedoStack([]);

  if (Array.isArray(yeniCizgiler)) {
    cizgiler.push(...yeniCizgiler);
  } else {
    cizgiler.push(yeniCizgiler);
  }
}

document.getElementById("btnUndo").addEventListener("click", () => {
  if (undoStack.length === 0) return;

  redoStack.push(JSON.stringify(cizgiler));

  const oncekiCizgiler = JSON.parse(undoStack.pop());
  setCizgiler(oncekiCizgiler);

  odalariYenidenHesapla();
  ekraniGuncelle();
});

document.getElementById("btnRedo").addEventListener("click", () => {
  if (redoStack.length === 0) return;

  undoStack.push(JSON.stringify(cizgiler));

  const sonrakiCizgiler = JSON.parse(redoStack.pop());
  setCizgiler(sonrakiCizgiler);

  odalariYenidenHesapla();
  ekraniGuncelle();
});