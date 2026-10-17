# Saraswati Puja Poster Generator

A free static website for personalizing the supplied poster artwork.

## Files
- `index.html` — web page and input form
- `script.js` — preview rendering and PNG export
- `poster-template.jpg` — supplied poster design

## Run
Keep the files in the same folder and open `index.html` in a modern browser. If the image does not load when opened directly, use Visual Studio Code with the Live Server extension.

Enter a name, designation, and company name, then click **Download PNG**. The exported image is 1080 × 1350 pixels.

## Adjust text placement
In `script.js`, edit the Y positions in these lines:
```js
drawText(nameInput.value.trim(), 1165, 29, 700);
drawText(designationInput.value.trim(), 1203, 24, 400);
drawText(companyInput.value.trim(), 1241, 24, 400);
```
Increase a Y value to move that field down; decrease it to move the field up.

This is a static website and does not require a database or API. For publishing, upload `index.html`, `script.js`, and `poster-template.jpg` to a static host such as GitHub Pages.
