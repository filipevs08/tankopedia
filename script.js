const application_id = "a5b052b5459d70adf3283b62a2459e3e";
const url = `https://api.wotblitz.eu/wotb/encyclopedia/vehicles/?application_id=${application_id}`;
const tankImage = document.querySelector("#tank-image");
const form = document.querySelector("form")
const tankInput = document.querySelector("#tank-input");
const searchButton = document.querySelector("#search-button");
const errorText = document.querySelector("#error-text");
const loadingText =document.querySelector("#loading-text");
const tankStats = document.querySelector("#tank-stats");


const stats = {
    name: document.querySelector("#name"),
    tier:  document.querySelector("#tier"),
    nation:  document.querySelector("#nation"),
    type: document.querySelector("#type"),
}
const tierTranslator = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X"
}
const typeTranslator = {
    "heavyTank": "Tanque pesado",
    "mediumTank": "Tanque médio",
    "AT-SPG": "Caça tanque",
    "lightTank": "Tanque leve"
}
const nationTranslator = {
    "usa": "Estado unidos",
    "ussr": "União soviética",
    "european": "Nação europeia",
    "china": "chine",
    "germany": "alemanhã",
    "japan": "Japão",
    "uk":  "Reino unido",
    "france": "França",
    "other": "Hibrido"
}

const cleanData = () => {
    tankImage.src = "";
    tankStats.style.display = "none";
    tankImage.style.display = "none";
}
const getApi = async () => {
    loadingText.style.display = "block"
    const query = await fetch("https://api.wotblitz.eu/wotb/encyclopedia/vehicles/?application_id=a5b052b5459d70adf3283b62a2459e3e&")
    .then(res => res.json())
    .then(data => {return data;}).catch(err => console.log(err))
    .finally(() => {loadingText.style.display = "none"})
    return query
}
const loadData = async (tank) => {
    tankStats.style.display = "block"
    tankImage.style.display = "block"
    tankImage.src = tank[0].images.preview;
    stats.name.innerHTML =`Nome: ${tank[0].name}`;
    stats.nation.innerHTML = `Nação: ${nationTranslator[tank[0].nation]}`;
    stats.tier.innerHTML = `Tier: ${tierTranslator[tank[0].tier]}`;
    stats.type.innerHTML = `Tipo: ${typeTranslator[tank[0].type]}`;
    
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    cleanData()
    let matchTank = null;
    let name = tankInput.value;
    errorText.innerHTML = ""
    const vehicles = await getApi();
    let data = vehicles.data;
    let tanks = Object.keys(data).map(key => data[key]);
    matchTank = tanks.filter(tank => tank.name === name);
    console.log(matchTank)
    if (!matchTank[0])
    {
        errorText.innerHTML = "Veiculo não encontrado!"
        return
    }

    loadData(matchTank)
})
