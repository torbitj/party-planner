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