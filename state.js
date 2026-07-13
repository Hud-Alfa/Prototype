export let cizgiler = [];
export let odalar = [];

export const undoStack = [];
export let redoStack = [];

export let aktifMod = "LINE";
export let mevcutCizim = null;

export let aktifCizimGrupId = null;
export let seciliGrupId = null;

export const SNAP_MESAFESI = 10;

export function setAktifMod(mod) {
  aktifMod = mod;
}

export function setMevcutCizim(cizim) {
  mevcutCizim = cizim;
}

export function setCizgiler(yeniCizgiler) {
  cizgiler = yeniCizgiler;
}

export function setOdalar(yeniOdalar) {
  odalar = yeniOdalar;
}

export function setRedoStack(yeniRedoStack) {
  redoStack = yeniRedoStack;
}

export function setAktifCizimGrupId(grupId) {
  aktifCizimGrupId = grupId;
}

export function setSeciliGrupId(grupId) {
  seciliGrupId = grupId;
}