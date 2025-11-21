const state = {
  // TODO
}

const getPartyList = async () => {
  const API = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2510-FTB-CT-WEB-PT/events`;
  const response = await fetch(API);
  const eventsData = await response.json();
  const retrievedPartylist = eventsData.data;
  
}

const partyListItem = () => {
  // TODO
}

const partyList = () => {
  // TODO
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
    <section>
      <h2>Party Details</h2>
      <PartyDetails></PartyDetails>
    </section>
  </main>`;
}

rendor();
getPartyList()