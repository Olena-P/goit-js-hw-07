import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");
const lightboxImage = document.getElementById("lightbox-image");

function createGalleryItem({ preview, original, description }) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
}

const galleryMarkup = galleryItems.map(createGalleryItem).join("");
galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

galleryList.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName === "IMG") {
    const largeImageURL = event.target.dataset.source;
    lightboxImage.src = largeImageURL;
    lightboxImage.alt = event.target.alt;

    const instance = basicLightbox.create(
      `<img src="${largeImageURL}" alt="${event.target.alt}" />`
    );
    instance.show();
    document.addEventListener("keydown", handleEscape);

    function handleEscape(event) {
      if (event.key === "Escape") {
        instance.close();
        document.removeEventListener("keydown", handleEscape);
      }
    }

    instance.on("close", () => {
      document.removeEventListener("keydown", handleEscape);
    });
  }
});
