import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');

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

const galleryMarkup = galleryItems.map(createGalleryItem).join('');
galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

galleryList.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.nodeName === 'IMG') {
        const largeImageURL = event.target.dataset.source;
        lightboxImage.src = largeImageURL;
        lightboxImage.alt = event.target.alt;
        lightbox.style.display = 'block';
    }
});

lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});
