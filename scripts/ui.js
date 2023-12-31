//HTML'den gelenler
export const elements = {
  list: document.querySelector(".list"),
  audio: document.querySelector("audio"),
  audioSource: document.querySelector("audio source"),
  playingInfo: document.querySelector(".playing .info"),
  form: document.querySelector("form"),
  title: document.querySelector(".songs h2"),
};

//her bir müzik için ekrana bir kart basma
export const renderSongs = (songs) => {
  //eskiden eklenenleri temizleme
  elements.list.innerHTML = "";
  songs.forEach((song) => {
    if (song.images && song.images.coverart) {
      const div = document.createElement("div");
      div.className = "card";

      //kart elamanına bazı verileri ekleme
      div.dataset.url = song.hub?.actions?.pop()?.uri;
      div.dataset.title = song.title;
      div.dataset.img = song.images && song.images.coverart;

      div.innerHTML = `<figure>
          <img id = "info-img"
            src="${song.images.coverart}"
          />
          <div class="play">
            <i id ="play-btn" class="bi bi-play-fill"></i>
          </div>
        </figure>
        <h4>${song.subtitle}</h4>
        <p>${song.title}</p>`;
      elements.list.appendChild(div);
    }
  });
};

//oynayan şarkının bilgilerini ekrana basma
export const renderPlayingInfo = (song) => {
  elements.playingInfo.innerHTML = `
    <img src = " ${song.img}" />
  <div>
    <p>Playing now...</p>
    <h3> ${song.title} </h3>
  </div>`;
};

//başlık metnini güncelleme
export const updateTitle = (message) => {
  elements.title.innerText = message;
};
