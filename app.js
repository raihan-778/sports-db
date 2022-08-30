console.log("script connected");

// code for preeloder start

// code for preeloder end

const loadData = () => {
  const spinner = document.getElementById("spinner");
  spinner.removeAttribute("hidden");
  soccerApi = `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=English%20Premier%20League`;

  fetch(soccerApi)
    .then((response) => response.json())
    .then((data) => displayData(data.teams));
  spinner.setAttribute("hidden", "");
};
loadData();

const displayData = (teamData) => {
  const cardContainer = document.getElementById("card-container");

  teamData.forEach((singleTeam) => {
    const {
      strCountry,
      strGender,
      strLeague,
      strTeamBadge,
      strTeamLogo,
      strTeamJersey,
      strTeam,
      strWebsite,
      idTeam,
    } = singleTeam;

    const teamDiv = document.createElement("div");
    teamDiv.classList.add("col");
    teamDiv.innerHTML = `
    <div onclick="loadTeamDetail(${idTeam})" class="card h-100">
    <img src="${strTeamLogo}" class="card-img-top" alt="..." />
    <div class="card-body">
    <img src="${strTeamBadge}" class="img-fluid w-25" alt="..." />
      <h5 class="card-title">${strTeam}</h5>
      <p class="card-text">
      <img class="img-fluid w-25" src="${strTeamJersey}" alt="" /><br>
        <span>Country:-${strCountry}</span>
        <span>Gender:-${strGender}</span>
        <span>League:-${strLeague}</span>
      </p>
      <p>Website:-${strWebsite}</p>
    </div>
  </div>
    `;
    cardContainer.appendChild(teamDiv);
  });
};

const loadTeamDetail = (teamId) => {
  const spinner = document.getElementById("spinner");
  spinner.removeAttribute("hidden");
  const searchApi = `https://www.thesportsdb.com/api/v1/json/2/lookupequipment.php?id=${teamId}`;
  fetch(searchApi)
    .then((response) => response.json())
    .then((data) => displayTeamData(data.equipment[0]));
  spinner.setAttribute("hidden", "");
};

const displayTeamData = (teamDetails) => {
  const teamEquipment = document.getElementById("team-equipment");
  teamEquipment.innerHTML = `
  <div class="col-12">
  <div class="card h-100">
  <div class="card-body">
  <img src="${teamDetails.strEquipment}" class="img-fluid w-25" alt="..." />   
  </div>
  </div>
  </div>
  `;
};

loadData();

const searchPlayer = (name) => {
  const spinner = document.getElementById("spinner");
  spinner.removeAttribute("hidden");
  console.log(name);
  const apiData = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${name}`;
  fetch(apiData)
    .then((response) => response.json())
    .then((data) => displaySearchData(data.player));
  spinner.setAttribute("hidden", "");
};
const getInuptValue = () => {
  const searchInput = document.getElementById("search");
  const searchText = searchInput.value;
  console.log(searchText);
  searchPlayer(searchText);
  searchInput.value = "";
};

const displaySearchData = (playerId) => {
  playerId.forEach((player) => {
    const playerImg = document.getElementById("player-img");
    playerImg.innerHTML = "";
    console.log(player);

    const { strCutout, strDescriptionEN, strNationality } = player;

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("col-10");
    imgDiv.innerHTML = `
    <div" class="card h-100">
    <div class="card-body mb-2">
    <img src="${strCutout}" class="card-img-top img-fluid w-50" alt="..." /> 
      <p class="card-text">
      ${strNationality}
      </p>
    </div>
  </div>
    `;
    playerImg.appendChild(imgDiv);
  });
};
searchPlayer();
