# PHALUAY MOTOR — Red/Black Multilingual EV Showroom

Static website ready for GitHub Pages / AWS Amplify.

## Included
- PHALUAY MOTOR red / black premium showroom theme
- PHALUAY MOTOR wordmark asset in `assets/phaluay-logo.svg`
- 32 vehicle entries / 17 brands from the existing project dataset
- Search, filters and inventory cards
- Compare up to 3 models with expanded dimensions / charging / ADAS fields
- Dedicated detail page for each vehicle
- Expanded specification sections: performance, dimensions, battery & charging, chassis, ADAS/safety, smart cabin
- 360-degree image-sequence viewer engine
- 3 languages: Lao / Thai / English (language is remembered in the browser)
- Booking / enquiry / WhatsApp / phone 92224844
- Responsive mobile design and existing animation effects

## 360 viewer
A real 360 viewer needs multi-angle photos of the exact vehicle. The viewer engine is already built into `detail.html` / `detail.js`.
Add 24–72 images to `assets/360/<vehicle-id>/` and list them in the car's `views360` array in `cars.js`.
See `assets/360/README.txt`.

If a model has no real 360 image sequence yet, the site shows the main vehicle image and clearly says that the 360 image set is pending; it does not fabricate other angles.

## Logo
`assets/phaluay-logo.svg` is a website wordmark created for this package. If you have the official PHALUAY MOTOR PNG/SVG logo, replace this file (or update the image path in `index.html` and `detail.html`) to use the exact official logo.

## Vehicle data
Trim-specific items that are not confirmed display "ยืนยันตามรุ่นย่อย" rather than invented values. Some core models include additional dimensions / charging / ADAS reference data. Always verify the exact imported trim before customer booking.

## Deploy to GitHub Pages
Upload all files in this folder to the root of your repository, then Settings → Pages → Deploy from a branch → `main` → `/(root)`.
