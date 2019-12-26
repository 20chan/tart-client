var tart = new Tart("http://localhost:4000/");
var createSimulationButtons = $("#createSimulation")[0];
var selectSimulationButtons = $("#simulations")[0];

var simulIdSpan = $("#simulId");
var simulModelSpan = $("#simulModel");
var simulMoneySpan = $("#simulMoney");
var simulMoneyIncSpan = $("#simulMoneyInc");
var simulMoneyDecSpan = $("#simulMoneyDec");
var simulTimeSpan = $("#simulTime");

var statTable = $("#statTable")[0];

selectedSimul = -1;

function loadModels() {
    createSimulationButtons.innerHTML = "";
    tart.getModels(models => {
        for (var i = 0; i < models.length; i++) {
            createButton(models[i], i);
        }
    });

    function createButton(model, i) {
        var btn = $("<button>" + model + "</button>");
        btn.appendTo(createSimulationButtons).click(() => {
            tart.createSimulation(i, simulId => {
                loadSimulations();
            });
        });
    }
}

function loadSimulations() {
    selectSimulationButtons.innerHTML = "";
    tart.getSimulations(simuls => {
        for (var i = 0; i < simuls.length; i++) {
            createButton(simuls[i], i);
        }
    });

    function createButton(simul, i) {
        var btn = $("<button>" + simul + "</button>");
        btn.appendTo(selectSimulationButtons).click(() => {
            selectSimulation(i);
        });
    }
}

function selectSimulation(i) {
    selectedSimul = i;

    loadSimulationInfo(i);
    loadUpgrades(i);
}

function loadSimulationInfo(i) {
    tart.getSimulation(i, simul => {
        tart.getSimulationModel(i, model => {
            model = model.name;

            simulIdSpan.html(i.toString());
            simulModelSpan.html(model);
            simulMoneySpan.html(simul.money);
            simulMoneyIncSpan.html(simul.moneyInc);
            simulMoneyDecSpan.html(simul.moneyDec);
            simulTimeSpan.html(simul.time);
        })
    })
}

function loadUpgrades(i) {
    tart.getUpgrades(i, upgrades => {
        tart.getSimulationUpgradeTypes(i, types => {
            var len = upgrades.length;
            var maxLevel = 0;

            var data = [];
            var columns = [];
            var nestedHeaders = [];
            for (var i = 0; i < len; i++) {
                maxLevel = Math.max(upgrades[i].maxLevel);

                columns.push({
                    title: "Price",
                    type: "numeric",
                });
                columns.push({
                    title: "Value",
                    type: "numeric",
                });
                nestedHeaders.push({
                    title: types.names[i],
                    colspan: "2",
                });
            }

            for (var i = 0; i < maxLevel; i++) {
                var row = [];
                upgrades.forEach(u => {
                    row.push(u.prices[i]);
                    row.push(u.values[i]);
                });
                data.push(row);
            }

            statTable.innerHTML = "";
            var sheetDiv = $("<div></div>").appendTo(statTable);
            sheet = sheetDiv.jexcel({
                data: data,
                columns: columns,
                nestedHeaders: nestedHeaders,
                onchange: sheetStatChanged,
                allowInsertColumn: false,
                allowManualInsertColumn: false,
                allowDeleteColumn: false,
            });
        });
    });
}

function sheetStatChanged(instance, cell, x, y, value) {
    if (isNaN(parseFloat(value))) {
        sheet.setValueFromCoords(x, y, 0);
        return;
    }
    var data = sheet.getData();
    var upgrade = Math.floor(x / 2);
    var maxLevel = 0;

    var prices = [];
    var values = [];

    for (var y = 0; y < data.length; y++) {
        var price = parseFloat(data[y][upgrade]);
        var value = parseFloat(data[y][upgrade + 1]);
        maxLevel = y + 1;

        values.push(value);
        if (isNaN(price) || isNaN(value)) {
            break;
        }
        prices.push(price);
    }
    var data = { maxLevel: maxLevel, prices: prices, values: values };
    tart.updateUpgrades(selectedSimul, upgrade, data, simul => {
        // No need to refresh right now
        // loadUpgrades(selectedSimul);
    })
}


loadModels();
loadSimulations();

var sheet = null;

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