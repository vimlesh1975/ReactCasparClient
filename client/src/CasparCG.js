var dataCaspar = {};

function escapeHtml(unsafe) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function parseCaspar(str) {
  var xmlDoc;
  if (window.DOMParser) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(str, "text/xml");
  }
  dataCaspar = XML2JSON(xmlDoc.documentElement.childNodes);
}

function XML2JSON(node) {
  var data = {};
  for (k = 0; k < node.length; k++) {
    var idCaspar = node[k].getAttribute("id");
    var valCaspar = node[k].childNodes[0].getAttribute("value");
    if (idCaspar != undefined && valCaspar != undefined) {
      data[idCaspar] = valCaspar;
    };
  }
  return data;
}

function dataInsert(dataCaspar) {
  for (var idCaspar in dataCaspar) {
    var idTemplate = document.getElementById(idCaspar);
    if (idTemplate != undefined) {
      idTemplate.innerHTML = escapeHtml(dataCaspar[idCaspar]);
    }
  }
}

function update(str) {
  parseCaspar(str);
  dataInsert(dataCaspar);
}

function play(str) {
  parseCaspar(str);
  dataInsert(dataCaspar);
  gwd.actions.timeline.gotoAndPlay('document.body', 'start');
}

function next() {
  gwd.actions.timeline.play('document.body');
}

function stop() {
  gwd.actions.timeline.gotoAndPlay('document.body', 'out');
}

function preview(str) {
  parseCaspar(str);
  dataInsert(dataCaspar);
  gwd.actions.timeline.gotoAndPause('document.body', 'out');
}
