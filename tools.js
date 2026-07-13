import {
  setAktifMod,
  setMevcutCizim,
  setSeciliGrupId,
} from "./state.js";

import {
  stage,
  onizlemeKatmani,
} from "./stage.js";

const tools = {
  SELECT: document.getElementById("toolSelect"),
  LINE: document.getElementById("toolLine"),
  RECT: document.getElementById("toolRect"),
  SQUARE: document.getElementById("toolSquare"),
};

export function modDegistir(yeniMod) {
  setAktifMod(yeniMod);
  setMevcutCizim(null);

  if (yeniMod !== "SELECT") {
    setSeciliGrupId(null);

    const silButonu = document.getElementById("btnDeleteSelected");
    silButonu.classList.add("hidden");
  }

  onizlemeKatmani.graphics.clear();

  // Mevcut buton renklendirme kodun...
  stage.update();
}

tools.SELECT.addEventListener("click", () => modDegistir("SELECT"));
tools.LINE.addEventListener("click", () => modDegistir("LINE"));
tools.RECT.addEventListener("click", () => modDegistir("RECT"));
tools.SQUARE.addEventListener("click", () => modDegistir("SQUARE"));