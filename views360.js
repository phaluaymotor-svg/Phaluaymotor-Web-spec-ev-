/*
PHALUAY MOTOR — 360° image sets

To enable TRUE 360° for a model:
1) Create a folder: assets/360/<car-id>/
2) Put 24–72 photos around the SAME car, same background and same size.
3) Name them 01.webp, 02.webp, 03.webp ... in rotation order.
4) Add the model below.

Example:
window.PM_360_SETS = {
  "leapmotor-c10": { path:"assets/360/leapmotor-c10", count:36, ext:"webp", pad:2 }
};

You can also use a direct array:
window.PM_360_FRAMES = {
  "leapmotor-c10": ["assets/360/leapmotor-c10/01.webp", "..."]
};
*/
window.PM_360_SETS = window.PM_360_SETS || {};
window.PM_360_FRAMES = window.PM_360_FRAMES || {};
