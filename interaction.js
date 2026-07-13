import {
  cizgiler,
  aktifMod,
  seciliGrupId,
  setCizgiler,
  setSeciliGrupId,
} from "./state.js";

import {
  canvas,
  stage,
} from "./stage.js";

import {
  cizgiUzerindeEnYakinNokta,
  hesaplaGrupTasimaSnap,
} from "./snap.js";

import { gecmiseKaydet } from "./history.js";
import { odalariYenidenHesapla } from "./rooms.js";
import { ekraniGuncelle } from "./render.js";

const SECIM_MESAFESI = 12;

const silButonu = document.getElementById("btnDeleteSelected");

let suruklemeAktif = false;
let suruklemeBaslangicX = 0;
let suruklemeBaslangicY = 0;

let orijinalGrupCizgileri = [];
let orijinalTumCizgiler = [];

let gecmiseKaydedildi = false;

function tiklananCizgiyiBul(x, y) {
  let bulunanCizgi = null;
  let enKisaMesafe = SECIM_MESAFESI;

  for (const cizgi of cizgiler) {
    const sonuc = cizgiUzerindeEnYakinNokta(
      x,
      y,
      cizgi.x1,
      cizgi.y1,
      cizgi.x2,
      cizgi.y2,
    );

    if (sonuc.mesafe < enKisaMesafe) {
      enKisaMesafe = sonuc.mesafe;
      bulunanCizgi = cizgi;
    }
  }

  return bulunanCizgi;
}

function grupCizgileriniBul(groupId) {
  return cizgiler.filter(
    (cizgi) => cizgi.groupId === groupId,
  );
}

function silButonunuKonumlandir() {
  if (!seciliGrupId) {
    silButonu.classList.add("hidden");
    return;
  }

  const grup = grupCizgileriniBul(seciliGrupId);

  if (grup.length === 0) {
    silButonu.classList.add("hidden");
    return;
  }

  const xs = [];
  const ys = [];

  for (const cizgi of grup) {
    xs.push(cizgi.x1, cizgi.x2);
    ys.push(cizgi.y1, cizgi.y2);
  }

  const sag = Math.max(...xs);
  const ust = Math.min(...ys);

  silButonu.style.left = `${sag + 8}px`;
  silButonu.style.top = `${Math.max(0, ust - 42)}px`;

  silButonu.classList.remove("hidden");
}

stage.on("stagemousedown", (event) => {
  if (aktifMod !== "SELECT") return;
  if (event.nativeEvent.button !== 0) return;

  const tiklananCizgi = tiklananCizgiyiBul(
    event.stageX,
    event.stageY,
  );

  if (!tiklananCizgi) {
    setSeciliGrupId(null);
    silButonu.classList.add("hidden");
    ekraniGuncelle();
    return;
  }

  const groupId =
    tiklananCizgi.groupId ??
    tiklananCizgi.id;

  setSeciliGrupId(groupId);

  suruklemeAktif = true;
  gecmiseKaydedildi = false;

  suruklemeBaslangicX = event.stageX;
  suruklemeBaslangicY = event.stageY;

  orijinalTumCizgiler = structuredClone(cizgiler);

  orijinalGrupCizgileri = structuredClone(
    grupCizgileriniBul(groupId),
  );

  canvas.style.cursor = "grabbing";

  ekraniGuncelle();
  silButonunuKonumlandir();
});

stage.on("stagemousemove", (event) => {
  if (aktifMod !== "SELECT") return;
  if (!suruklemeAktif || !seciliGrupId) return;

  const hamDx =
    event.stageX - suruklemeBaslangicX;

  const hamDy =
    event.stageY - suruklemeBaslangicY;

  if (
    !gecmiseKaydedildi &&
    (Math.abs(hamDx) > 1 || Math.abs(hamDy) > 1)
  ) {
    gecmiseKaydet(orijinalTumCizgiler);
    gecmiseKaydedildi = true;
  }

  const snap = hesaplaGrupTasimaSnap(
    orijinalGrupCizgileri,
    hamDx,
    hamDy,
    seciliGrupId,
  );

  for (const orijinal of orijinalGrupCizgileri) {
    const mevcut = cizgiler.find(
      (cizgi) => cizgi.id === orijinal.id,
    );

    if (!mevcut) continue;

    mevcut.x1 = orijinal.x1 + snap.dx;
    mevcut.y1 = orijinal.y1 + snap.dy;
    mevcut.x2 = orijinal.x2 + snap.dx;
    mevcut.y2 = orijinal.y2 + snap.dy;
  }

  odalariYenidenHesapla();
  ekraniGuncelle();
  silButonunuKonumlandir();
});

stage.on("stagemouseup", () => {
  if (aktifMod !== "SELECT") return;

  suruklemeAktif = false;
  canvas.style.cursor = "default";
});

silButonu.addEventListener("click", (event) => {
  event.stopPropagation();

  if (!seciliGrupId) return;

  gecmiseKaydet();

  const kalanCizgiler = cizgiler.filter(
    (cizgi) => cizgi.groupId !== seciliGrupId,
  );

  setCizgiler(kalanCizgiler);
  setSeciliGrupId(null);

  silButonu.classList.add("hidden");

  odalariYenidenHesapla();
  ekraniGuncelle();
});