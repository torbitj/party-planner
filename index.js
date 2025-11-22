const state = {
  partyList: [],
  rsvpList: [],
  selectedParty: null
}

const API = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2510-FTB-CT-WEB-PT`;
const PARTIES = `/events`;
const GUESTS = `/guests`;
const RSVPS = `/rsvps`;

const getParty = async (id) => {
  try {
    const response = await fetch(`${API}${PARTIES}/${id}`);
    const party = await response.json();
    if (!response.ok) {
      throw new Error();
    }
    state.selectedParty = party.data;
    rendor();
  } catch (error) {
    const errorMessage = document.querySelector(`h3`);
    errorMessage.innerText = `Error in fetching the data`;
  }
}

const getPartyList = async () => {
  try {
    const response = await fetch(API + PARTIES);
    const eventsData = await response.json();
    if (!response.ok) {
      throw new Error();
    }
    const retrievedPartylist = eventsData.data;
    state.partyList = retrievedPartylist;
  } catch (error) {
    alert(`Error in fetching the data`)
  }
}

const getRsvpList = async () => {
  const response = await fetch(API + RSVPS);
  const rsvpData = await response.json();
  const rsvpList = rsvpData.data;
  state.rsvpList = rsvpList;
  console.log(state.rsvpList);
}

const PartyListItem = (party) => {
  const $li = document.createElement(`li`);
  const $a = document.createElement(`a`);
  $a.href = `#selected`;
  $a.innerText = `${party.name}`;
  $li.append($a);

  if (state.selectedParty && state.selectedParty.id === party.id) {
    $li.style.fontWeight = `bolder`;
    $li.style.boxShadow = `5px 5px 5px #214FBA`;
  }

  $li.addEventListener(`click`, async (event) => {
    await getParty(party.id);
    // getRsvps();
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

const RsvpList = () => {
  const $ul = document.createElement(`ul`);
  
}

const PartyDetails = () => {
  if (!state.selectedParty) {
    const $h3 = document.createElement(`h3`);
    $h3.innerText = `Please select a party to see party details.`;
    return $h3;
  }

  const { id, name, location, date, description } = state.selectedParty;
  const $h3 = document.createElement(`h3`);
  const $pDescription = document.createElement(`p`);
  const $figure = document.createElement(`figure`);
  const $pDate = document.createElement(`p`);
  const $h4Address = document.createElement(`h4`);
  const $address = document.createElement(`address`);
  const readableDate = new Date(date).toLocaleString(`en-US`, {
    weekday: `long`,
    year: `numeric`,
    month: `long`,
    day: `numeric`,
    hour: `2-digit`,
    minute: `2-digit`
  });

  $h3.innerText = `${name}: ${id}`;
  $pDescription.innerText = description;
  $pDate.innerText = `Date: ${readableDate}`
  $h4Address.innerText = `Address:`
  $address.innerText = location;
  $figure.append($h3, $pDescription, $pDate, $h4Address, $address);

  return $figure;
}

const rendor = () => {
  const $app = document.querySelector(`#app`);
  $app.innerHTML = `
  <h1>Party Planner</h1>
  <main>
    <section id="party-list">
      <h2>Upcoming Parties</h2>
      <PartyList></PartyList>
    </section>
    <section id="selected">
      <h2>Party Details</h2>
      <PartyDetails></PartyDetails>
    </section>
  </main>`;

  document.querySelector(`PartyList`).replaceWith(PartyList());
  document.querySelector(`PartyDetails`).replaceWith(PartyDetails());
}

const init = async () => {
  try {
    await getPartyList();
    await getRsvpList();
    rendor();
  } catch (error) {
    console.log(error)
  }
}

init();