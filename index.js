var tart = new Tart("http://localhost:4000/");
var createSimulationButtons = $("#createSimulation")[0];

function loadModels() {
    createSimulationButtons.innerHTML = "";
    tart.getModels(models => {
        for (var i = 0; i < models.length; i++) {
            var btn = $("<button>" + models[i] + "</button>");
            btn.appendTo(createSimulationButtons).click(() => {
                tart.createSimulation(i, simulId => {
    
                });
            });
        }
    });
}

function loadSimulations() {
}

var data = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
];

var sheet = document.getElementById("statTable");
jexcel(sheet, {
    data: data,
    columns: [
        {
            title: "Price",
            type: "numeric",
        },
        {
            title: "Value",
            type: "numeric",
        },
        {
            title: "Price",
            type: "numeric",
        },
        {
            title: "Value",
            type: "numeric",
        },
    ],
    nestedHeaders: [
        {
            title: "Speed",
            colspan: "2",
        },
        {
            title: "Money",
            colspan: "2",
        },
    ]
});

var chartElem = document.getElementById("chart")
var chart = new Chart(chartElem, {
    type: "line",
    data: {
        labels: ["a", "b", "c", "d", "e", "f"],
        datasets: [{
            label: "Ex#1",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            data: [1, 2, 3, 4, 5, 6],
        }]
    },
    options: {
        responsive: false,
        scales: {
            yAxes: [{
                stacked: true,
                gridLines: {
                    display: true,
                    color: "rgba(255,99,132,0.2)"
              }
            }],
            xAxes: [{
                gridLines: {
                    display: false
                }
            }]
          }
    }
})