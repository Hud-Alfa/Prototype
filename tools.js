import {
  setAktifMod,
  setMevcutCizim,
} from "./state.js";

import {
  stage,
  onizlemeKatmani,
} from "./stage.js";

const tools = {
  LINE: document.getElementById("toolLine"),
  RECT: document.getElementById("toolRect"),
  SQUARE: document.getElementById("toolSquare"),
};

export function modDegistir(yeniMod) {
  setAktifMod(yeniMod);
  setMevcutCizim(null);

  onizlemeKatmani.graphics.clear();

  Object.keys(tools).forEach((mod) => {
    tools[mod].className =
      mod === yeniMod
        ? "w-full bg-purple-600 hover:bg-purple-700 text-white text-left font-semibold py-2.5 px-3 rounded-xl text-sm transition shadow-sm"
        : "w-full bg-purple-50 hover:bg-purple-100 text-purple-700 text-left font-semibold py-2.5 px-3 rounded-xl text-sm transition border border-purple-100";
  });

  stage.update();
}

tools.LINE.addEventListener("click", () => {
  modDegistir("LINE");
});

tools.RECT.addEventListener("click", () => {
  modDegistir("RECT");
});

tools.SQUARE.addEventListener("click", () => {
  modDegistir("SQUARE");
});