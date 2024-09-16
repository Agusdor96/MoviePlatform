function cardHtml(ele) {
    const { title, year, director, duration, genre, rate, poster, background } = ele;
  
    const title2 = document.createElement("h2");
    const year2 = document.createElement("p");
    const director2 = document.createElement("p");
    const duration2 = document.createElement("p");
    const genre2 = document.createElement("p");
    const rate2 = document.createElement("p");
    const poster2 = document.createElement("img");
    const background2 = document.createElement("img");
  
    title2.textContent = title;
    year2.textContent = `Año: ${year}`;
    director2.textContent = `Director: ${director}`;
    duration2.textContent = `Duracion: ${duration}`;
    genre2.textContent = `Género: ${genre}`;
    rate2.textContent = `Rating: ${rate}`;
    poster2.src = poster;
    poster2.alt = title;
    background2.src = background;
    background2.alt = "Fondo de imagen";
  
    title2.classList.add("tituloPelicula");
    year2.classList.add("elePelicula");
    director2.classList.add("elePelicula");
    duration2.classList.add("elePelicula");
    genre2.classList.add("elePelicula");
    rate2.classList.add("elePelicula");
    poster2.classList.add("tamañoPoster");
    background2.classList.add("tamañoBack");
  
    const card = document.createElement("div");
    card.classList.add("cardContainer");
  
    card.appendChild(title2);
    card.appendChild(duration2);
    card.appendChild(genre2);
    card.appendChild(rate2);
    card.appendChild(year2);
    card.appendChild(poster2);
    card.appendChild(background2);
  
    return card;
  }

module.exports = cardHtml