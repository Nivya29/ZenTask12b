const startDate = '2022-05-01';
const endDate = '2022-05-31';
const priceArea = 'DK1';

const url = `https://api.energidataservice.dk/dataset/DeclarationProduction?start=${startDate}&end=${endDate}&filter={"PriceArea":["${priceArea}"]}&limit=30`;
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    const heading = document.createElement("h1");
    heading.textContent = "Declaration Production Data-Energy Data";
    document.body.append(heading);

    // Create a div element 
    const div = document.createElement("div");
    
    
    const cardsHTML = data.records.slice(0,30).map(record => `
      <div class="card my-3">
        <p> Declaration Production: ${record.CH4PerkWh}</p><br>
        <p> Delivery Type: ${record.DeliveryType}</p><br>
        <p> Fuel Allocation Method: ${record.FuelAllocationMethod}</p><br>
       
        <p> Production Type: ${record.ProductionType}</p><br>
        <p> Version: ${record.Version}</p><br>
      </div>
     `).join('');
      div.innerHTML = cardsHTML;

      document.body.appendChild(div);
   
    
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
