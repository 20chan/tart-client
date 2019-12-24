function Tart(url) {
    this.url = url
}

Tart.prototype.getModels = function(callback) {
    $.get(this.url + 'api/models', callback);
}

Tart.prototype.getSimulations = function(callback) {
    $.get(this.url + 'api/simulations', callback);
}

Tart.prototype.createSimulation = function(modelIndex, callback) {
    var body = JSON.stringify({ modelIndex: modelIndex });
    $.post(this.url + 'api/simulations', body, callback);
}

Tart.prototype.getSimulation = function(simul, callback) {
    $.get(this.url + 'api/simulations/' + simul, callback);
}

Tart.prototype.tickSimulation = function(simul, interval, callback) {
    $.get(this.url + 'api/simulations/' + simul + '/tick?interval=' + interval, callback);
}

Tart.prototype.getSimulationUpgradeTypes = function(simul, callback) {
    $.get(this.url + 'api/simulations/' + simul + '/types', callback);
}

Tart.prototype.getChoicesOfSimulation = function(simul, callback) {
    $.get(this.url + 'api/simulations/' + simul + '/choices', callback);
}

Tart.prototype.getChoiceTypeInfo = function(simul, choice, callback) {
    $.get(this.url + 'api/simulations/' + simul + '/choices/' + choice + '/type', callback);
}

Tart.prototype.createChoice = function(simul, choice, callback) {
    $.post(this.url + 'api/simulations/' + simul + '/choices/' + choice, null, callback);
}

Tart.prototype.getUpgrades = function(simul, callback) {
    $.get(this.url + 'api/simulations/' + simul + '/upgrades', callback);
}

Tart.prototype.getUpgrade = function(simul, upgrade, callback) {
    $.get(this.url + 'api/simulations/' + simul + '/upgrades/' + upgrade, callback);
}

Tart.prototype.updateUpgrades = function(simul, upgrade, data, callback) {
    $.ajax({
        url: this.url + 'api/simulations/' + simul + '/upgrades/' + upgrade,
        type: 'PUT',
        data: JSON.stringify(data),
        success: callback
    });
}