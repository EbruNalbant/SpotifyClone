import { renderSongs } from "./ui.js";

//API istekleri için kullanılan ayarlar
const url =
  "https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6891b1e5fdmshfa921e7cae49f65p1d4e64jsn5b5b876c6bbd",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};

//API istekleri yönetilen class
export class API {
  constructor() {
    this.songs = [];
  }
  //popüler müzikleri getirir
  async getPopular() {
    const res = await fetch(url, options);
    const data = await res.json();
    this.songs = data.tracks;

    //ekrana popüler müzikleri listeler
    renderSongs(this.songs);
  }

  //arama methodu
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR&limit=5`,
      options
    );
    const data = await res.json();
    //veriyi istenilen duruma çevirme

    const newData = data.tracks.hits.map((song) => ({ ...song.track }));
    console.log(newData);

    this.songs = newData;
    //aratılan şarkıları ekrana basma
    renderSongs(this.songs);
  }
}
