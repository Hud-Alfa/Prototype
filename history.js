import {
  cizgiler,
  undoStack,
  redoStack,
  setCizgiler,
  setRedoStack,
  setMevcutCizim,
} from "./state.js";

import { odalariYenidenHesapla } from "./rooms.js";
import { ekraniGuncelle } from "./render.js";
import { onizlemeKatmani } from "./stage.js";

export function cizgiEkle(yeniCizgiler) {
  undoStack.push(JSON.stringify(cizgiler));
  setRedoStack([]);

  if (Array.isArray(yeniCizgiler)) {
    cizgiler.push(...yeniCizgiler);
  } else {
    cizgiler.push(yeniCizgiler);
  }
}

export function tumunuSil() {
  if (cizgiler.length === 0) return;

  // Silme işleminden önce mevcut durumu kaydet
  undoStack.push(JSON.stringify(cizgiler));

  // Yeni işlem yapıldığı için redo geçmişini temizle
  setRedoStack([]);

  // Çizimleri temizle
  setCizgiler([]);

  // Devam eden çizimi ve önizlemeyi temizle
  setMevcutCizim(null);
  onizlemeKatmani.graphics.clear();

  odalariYenidenHesapla();
  ekraniGuncelle();
}

document.getElementById("btnUndo").addEventListener("click", () => {
  if (undoStack.length === 0) return;

  redoStack.push(JSON.stringify(cizgiler));

  const oncekiCizgiler = JSON.parse(undoStack.pop());
  setCizgiler(oncekiCizgiler);

  setMevcutCizim(null);
  onizlemeKatmani.graphics.clear();

  odalariYenidenHesapla();
  ekraniGuncelle();
});

document.getElementById("btnRedo").addEventListener("click", () => {
  if (redoStack.length === 0) return;

  undoStack.push(JSON.stringify(cizgiler));

  const sonrakiCizgiler = JSON.parse(redoStack.pop());
  setCizgiler(sonrakiCizgiler);

  setMevcutCizim(null);
  onizlemeKatmani.graphics.clear();

  odalariYenidenHesapla();
  ekraniGuncelle();
});

document.getElementById("btnClear").addEventListener("click", tumunuSil);