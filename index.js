const state = {
  partyList: [],
  selectedParty: null
}

const API = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2510-FTB-CT-WEB-PT/events`;


const getParty = async (id) => {
  const response = await fetch(`${API}/${id}`);
  const party = await response.json();
  state.selectedParty = party.data;
  console.log(state.selectedParty);
  rendor();
}

const getPartyList = async () => {
  const response = await fetch(API);
  const eventsData = await response.json();
  const retrievedPartylist = eventsData.data;
  state.partyList = retrievedPartylist;
}

const PartyListItem = (party) => {
  const $li = document.createElement(`li`);
  const $a = document.createElement(`a`);
  $a.href = `#selected`;
  $a.innerText = `${party.name}`;
  $li.append($a);

  $li.addEventListener(`click`, (event) => {
    getParty(party.id);
  });
  return $li;
}

const PartyList = () => {
  const $ul = document.createElement(`ul`);
  state.partyList.forEach((party) => {
    $ul.append(PartyListItem(party))
  });
  return $ul;
}


const PartyDetails = () => {
  if (!state.selectedParty) {
    const $h2 = document.createElement(`h2`);
    $h2.innerText = `Please select a party to see party details.`;
    return $h2;
  }

  const { id, name, location, date, description } = state.selectedParty;
  const $h2 = document.createElement(`h2`);
  const $pDescription = document.createElement(`p`);
  const $figure = document.createElement(`figure`);
  const $pDate = document.createElement(`p`);
  const $pAddress = document.createElement(`p`);


}

const rendor = () => {
  const $app = document.querySelector(`#app`);
  $app.innerHTML = `
  <h1>Party Planner</h1>
  <main>
    <section>
      <h2>Upcoming Parties</h2>
      <PartyList></PartyList>
    </section>
    <section id="selected">
      <h2>Party Details</h2>
      <PartyDetails></PartyDetails>
    </section>
  </main>`;

  document.querySelector(`PartyList`).replaceWith(PartyList());
}

const init = async () => {
  await getPartyList();
  rendor();
}

init();