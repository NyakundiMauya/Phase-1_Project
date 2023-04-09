APIkey = "25ecda0ad8-25a0f25fa7-rsqxm2";
let requests = [];
let data = [];
let currencies;
let prevCurrency;

const options = {method: 'GET', headers: {accept: 'application/json'}};

// Adding submit event
document.addEventListener("DOMContentLoaded", () => {
fetch('https://api.fastforex.io/fetch-all?from=kes&api_key=25ecda0ad8-25a0f25fa7-rsqxm2', options)
  .then(response => response.json())
  .then(response => {

    currencies=response
    // console.log(currencies);
    let currenciesTag = document.getElementById("currencies");
    currenciesTag.addEventListener("change", (event) => {
      if (document.querySelector("#Amountdescription").value) {
        if (currenciesTag.value === "KES") {
          document.querySelector("#Amountdescription").value =
            document.querySelector("#Amountdescription").value /
            currencies.results[prevCurrency];
        } else {
          if (prevCurrency) {
            document.querySelector("#Amountdescription").value =
              (parseFloat(document.querySelector("#Amountdescription").value) /
                currencies.results[prevCurrency]) *
              currencies.results[event.target.value];
          } else {
            document.querySelector("#Amountdescription").value =
              parseFloat(document.querySelector("#Amountdescription").value) *
              currencies.results[event.target.value];
          }
        }
      }
      prevCurrency=event.target.value
    });

    for (const [key, value] of Object.entries(response.results)) {
      let option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      currenciesTag.appendChild(option);
    }
  
    currenciesTag.value="KES"
    prevCurrency='KES'

  })
  .catch(err => console.error(err));

  const form = document.querySelector("#bookingRqstForm");
  const requestList = document.querySelector("#listOfBookings");

  let rqstButton = document.getElementById("rqstbtn");

  rqstButton.addEventListener("click", (event) => {
    let currenciesTag = document.getElementById("currencies");
      currenciesTag.value="KES"
    let startMileage = parseFloat(
      document.getElementById("start-mileage").value
    );
    let endMileage = parseFloat(document.getElementById("end-mileage").value);
    let amountdescription = document.getElementById("Amountdescription");
    if (
      startMileage === NaN ||
      endMileage === NaN ||
      startMileage > endMileage
    ) {
      amountdescription.value = 0;
    } else {
      amountdescription.value = (endMileage - startMileage) * 50;
    }
  });
// Adding submit event to allow submission of form contents
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // preventing the default behavior
    let request = {
      name: document.querySelector("#name-description").value,
      id: document.querySelector("#id-description").value,
      phone: document.querySelector("#phone-no-description").value,
      model: document.querySelector("#model-description").value,
      start_mileage: document.querySelector("#start-mileage").value,
      end_mileage: document.querySelector("#end-mileage").value,
      startTime: document.querySelector("#startTime").value,
      endTime: document.querySelector("#endTime").value,
      amountdescription: document.querySelector("#Amountdescription").value,
      currency: document.getElementById("currencies").value,
    };
   
    requests.push(request);

    constructTable();
  });

  // Constructing a table to display submitted records
    function constructTable() {
    let requestsTag = document.getElementById("requests");
    requestsTag.childNodes.forEach((node) => {
      requestsTag.removeChild(node);
    });
    
    let table = document.createElement("table");

    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    tr.appendChild(createTH("Name"));
    tr.appendChild(createTH("Id"));
    tr.appendChild(createTH("Phone"));
    tr.appendChild(createTH("Model"));
    tr.appendChild(createTH("Start Mileage"));
    tr.appendChild(createTH("End Mileage"));
    tr.appendChild(createTH("Start Time"));
    tr.appendChild(createTH("End Time"));
    tr.appendChild(createTH("Amount"));
    tr.appendChild(createTH("Currency"));

    thead.appendChild(tr);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");
    requests.forEach((request) => {
      let tr = document.createElement("tr");
      tr.appendChild(createTD(request.name));
      tr.appendChild(createTD(request.id));
      tr.appendChild(createTD(request.phone));
      tr.appendChild(createTD(request.model));
      tr.appendChild(createTD(request.start_mileage));
      tr.appendChild(createTD(request.end_mileage));
      tr.appendChild(createTD(request.startTime));
      tr.appendChild(createTD(request.endTime));
      tr.appendChild(createTD(request.amountdescription));
      tr.appendChild(createTD(request.currency));
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    requestsTag.appendChild(table);
  }

  function createTH(textContent) {
    let th = document.createElement("th");
    th.textContent = textContent;
    return th;
  }

  function createTD(textContent) {
    let th = document.createElement("td");
    th.textContent = textContent;
    return th;
  }

  
});
