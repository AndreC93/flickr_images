const photos = [];
const root = document.querySelector('#root');
const modal = document.querySelector('#modal');
let timeout;
modal.addEventListener('click', () => {
  modal.classList = 'hidden';
  clearTimeout(timeout);
  modal.childNodes.forEach(child => {
    child.classList = 'modalImg hidden'
  });
});

const loadImages = () => {
  photos.forEach(photo => {
    const {farm, server, id, secret} = photo;
    const photoURL = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
    const img = document.createElement('img');
    img.src = photoURL;
    img.classList = 'thumb';
    img.addEventListener('click', () => showInModal(photoURL));
    root.append(img);
  });
}

const showInModal = (src) => {
  const newImg = document.createElement('img');
  newImg.src = src;
  newImg.classList = 'modalImg hidden';
  if(modal.childNodes.length > 1) {
    if(modal.childNodes[1].src === src) return;
    modal.removeChild(modal.childNodes[0]);
  }
  modal.childNodes[0].classList = 'modalImg hidden';
  modal.append(newImg);
  timeout = setTimeout(() => {
    newImg.classList = 'modalImg show';
    modal.childNodes[0].classList = 'modalImg hidden';
  }, 300);
  modal.classList = 'show';
}

fetch("https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=f5c7806144a5a06db3ec95d63befdc35&gallery_id=66911286-72157692049980335&format=json&nojsoncallback=1")
  .then(blob => blob.json())
  .then(data => photos.push(...data.photos.photo))
  .then(() => loadImages());