export const canvas = document.getElementById("cizimAlani");

export const stage = new createjs.Stage(canvas);

canvas.oncontextmenu = e => e.preventDefault();

export const odaKatmani = new createjs.Shape();
export const cizgiKatmani = new createjs.Shape();
export const onizlemeKatmani = new createjs.Shape();

stage.addChild(odaKatmani);
stage.addChild(cizgiKatmani);
stage.addChild(onizlemeKatmani);