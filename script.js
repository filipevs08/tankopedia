const application_id = "a5b052b5459d70adf3283b62a2459e3e";
const url = `https://api.wotblitz.eu/wotb/encyclopedia/vehicles/?application_id=${application_id}`;
const tankImage = document.querySelector("#tank-image");
const form = document.querySelector("form")
const tankInput = document.querySelector("#tank-input");
const searchButton = document.querySelector("#search-button");
const loadingText = document.querySelector("#loading-text");
const tankStats = document.querySelector("#tank-stats")
const stats = {
    name: document.querySelector("#name"),
    tier:  document.querySelector("#tier"),
    nation:  document.querySelector("#nation"),
    type: document.querySelector("#type"),
}

const getApi = async () => {
    const query = await fetch("https://api.wotblitz.eu/wotb/encyclopedia/vehicles/?application_id=a5b052b5459d70adf3283b62a2459e3e&")
    .then(res => res.json())
    .then(data => {return data;}).catch(err => console.log(err))
    .finally(loadingText.style.display = "none");

    return query
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    let name = tankInput.value;
    loadingText.style.display = 'block';
    loadingText.innerText = "Procurando tanque...";
    const vehicles = await getApi();
    let data = vehicles.data;
    let tanks = Object.keys(data).map(key => data[key]);
    let matchTank = tanks.filter(tank => tank.name === name);

    if (matchTank)
    {
        tankStats.style.display = "block"
        tankImage.src = matchTank[0].images.preview;
        stats.name.innerHTML =`Nome: ${matchTank[0].name}`;
        stats.nation.innerHTML = `Nação: ${matchTank[0].nation}`;
        stats.tier.innerHTML = `Tier: ${matchTank[0].tier}`;
        stats.type.innerHTML = `Tipo: ${matchTank[0].type}`;
    }

})
