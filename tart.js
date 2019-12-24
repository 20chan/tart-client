function Tart(url) {
    this.url = url
}

Tart.prototype.getModels = function(callback) {
    $.get(this.url + 'api/models', function(responseText) {
        callback(responseText);
    });
}

Tart.prototype.createSimulation = function(modelIndex, callback) {
    var body = { modelIndex: modelIndex };
    $.post(this.url + 'api/simulations', body, function(responseText) {
        callback(Number(JSON.parse(responseText).id));
    });
}