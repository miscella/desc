const empty = '\n';

const name = 'DESCRIPT';

const data = './data/collection.json';
const refs = './data/references.json';
const desc = './data/description.json';

var collection = null;
var description = null;
var references = null;

/*
    ENTRY FUNCTION
*/

function showPage(){
    createHome();
    initRemoteContent(data, initContent);
}

/*
    CREATE HOME PAGE
*/

function createHome(){
    let root = document.getElementById('b');
    let pre = createNode('pre','content');
    root.appendChild(pre);
    createSection('start', name);
    let start = document.getElementById('start');
    start.onclick = function() {showSections(Object.keys(description));};
}

/*
    INITIALISE REMOTE JSON CONTENT
*/

function initContent(raw_data){
    content = JSON.parse(raw_data);
    initRemoteContent(refs, initReferences);
}

function initReferences(raw_data) {
    references = JSON.parse(raw_data);
    initRemoteContent(desc, initDescriptors);
}

function initDescriptors(raw_data) {
    description = JSON.parse(raw_data);
    // comment out next line to show entry page
    showSections(Object.keys(description));
}


/*
    SHOW MENU SECTIONS
*/

function showSections(sections) {
    let root = document.getElementById('b');
    let pre = document.getElementById('content');
    pre.innerHTML = '';
    pre.onclick = null;
    for ( var i = 0; i < sections.length; i++ ) {
        createSection(sections[i],sections[i]);
    }
    makeSectionsClickable(sections);
}

function createSection(id, name) {
    let pre = document.getElementById('content');
    let span = createNode('span');
    let a = createNode('a', id);
    a.innerHTML = name;
    span.appendChild(a);
    // span.innerHTML += '\n';
    span.innerHTML += ' ';
    pre.appendChild(span);
}

/*
    MAKE MENU CLICKABLE
*/

function makeSectionsClickable(sections) {
    for ( var i = 0; i < sections.length; i++ ) {
        makeSectionClickable(sections[i]);
    }
}

function makeSectionClickable(id,content=true) {
    if (content) {
        let a = document.getElementById(id);
        a.onclick = function () { fillSectionContent(id); };
    } else {
        console.log("implement me!")
    }
}

/*
    CLEAR DOCUMENT AND FILL WITH CONTENT
*/

function fillSectionContent(descriptor) {
    let root = document.getElementById('b');
    root.innerHTML = '';
    let pre = createNode('pre','content');
    root.appendChild(pre);
    let editions = Object.keys(description[descriptor]);
    for(var i = 0; i < editions.length; i++) {
        let ed = editions[i];
        processContent(ed, description[descriptor][ed]);
    }
}

function processContent(idx, range){
    let pre = document.getElementById('content');
    let ref = references[idx].split(",")
    let author = ref[0];
    let title = ref.slice(1).join(",");
    pre.innerHTML +=  author + empty;
    pre.innerHTML +=  title.substring(1) + empty + empty;
    let parts = idx.split(".");
    let pos = 0;
    let val = 0;
    let end = range.length;
    while (true) {
        val = range[pos];
        pre.innerHTML += content[parts[0]][parts[1]][parts[2]][val][0] + '\n\n';
        pos++;
        if (pos == end) {
            break;
        }
    }
    pre.innerHTML = pre.innerHTML.slice(0,-1)
    pre.innerHTML += empty;
    pre.innerHTML += empty;
}
