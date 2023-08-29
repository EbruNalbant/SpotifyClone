import { API } from "./scripts/api.js";
import { elements, renderPlayingInfo, updateTitle } from "./scripts/ui.js";

const api = new API();

//sayfa yüklendiği anda, API'ya istek atıp, popüler müzikleri listeleme
document.addEventListener("DOMContentLoaded", async () => api.getPopular());

//paremetre olarak alınan müziği oynatma
const playMusic = (url) => {
  //oynatılacak müziğin url'ini HTML'e aktarma
  elements.audioSource.src = url;

  //audio elementinin müziği yüklemesini sağlama
  elements.audio.load();
  //müziği oynatma
  elements.audio.play();
};

//listedeki tıklamalarda çalışan fonksiyon
const handleClick = (e) => {
  if (e.target.id === "play-btn") {
    //kapsayıcı kart elemanına erişme
    const parent = e.target.closest(".card");
    console.log(parent);
    //oynatılacak mizğin bilgilerini ekrana basma
    renderPlayingInfo(parent.dataset);
    //müziği çalma
    playMusic(parent.dataset.url);
  }
};

//liste alanındaki tıklamaları izleme
document.addEventListener("click", handleClick);

//oynatılan şarkının fotoğrafını döndürme
const animatePhoto = (e) => {
  const img = document.querySelector(".info img");
  img.className = "animate";
};

const stopAnimation = (e) => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
};

//müziğin çalma olayını izleme
elements.audio.addEventListener("play", animatePhoto);
//müziğin durma olayını izleme
elements.audio.addEventListener("pause", stopAnimation);

//form olaylarını izleme
elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  if (!query) return;

  //başlığı güncelleme
  updateTitle(`results for ${query}`);
  //aratılan kelime ile eşleşen müzikleri API'dan çeker
  api.searchMusic(query);
});
