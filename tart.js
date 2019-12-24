function Tart(url) {
    this.url = url
}

Tart.prototype.getModels = function(callback) {
    $.get(this.url + 'models', function(responseText) {
        callback(JSON.parse(responseText));
    });
}

Tart.prototype.createSimulation = function(modelIndex, callback) {
    var body = { modelIndex: modelIndex };
    $.post(this.url + 'simulations', body, function(responseText) {
        callback(Number(JSON.parse(responseText).id));
    });
}