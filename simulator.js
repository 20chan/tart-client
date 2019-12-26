function Simulator() {
    this.timeF = x => 1 / (1 + x);
}

Simulator.prototype.calculateWeights = function (choices) {
    return choices.map(c => {
        var mpsDelta = c.nextStats.moneyPerSecond - c.currentStats.moneyPerSecond;
        var estimateTime = Math.min((c.currentStats.money - c.price) / c.currentStats.moneyPerSecond, 0);
        return mpsDelta / c.price * this.timeF(estimateTime);
    });
}

Simulator.prototype.update = function (choices) {
    if (choices.length === 0) {
        return -1;
    }
    var select = -1;
    var selectWeight = -1;
    var weights = this.calculateWeights(choices);

    for (var i = 0; i < choices.length; i++) {
        var weight = weights[i];
        if (weight > selectWeight) {
            selectWeight = weight;
            select = i;
        }
    }

    return choices[select].available ? select : -1;
}