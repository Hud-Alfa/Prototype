
export let cizgiler = [];
export let odalar = [];

export const undoStack = [];
export let redoStack = [];

export let aktifMod = "LINE";
export let mevcutCizim = null;

export const SNAP_MESAFESI = 10;

export function setAktifMod(mod) {
    aktifMod = mod;
}

export function setMevcutCizim(cizim) {
    mevcutCizim = cizim;
}

export function setCizgiler(yeni) {
    cizgiler = yeni;
}

export function setOdalar(yeni) {
    odalar = yeni;
}

export function setRedoStack(yeni) {
    redoStack = yeni;
}