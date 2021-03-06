// Boring functions that work with the dom/html.
function DomUtils(){
  // DomUtils knows how to manipulate the dom.
  // It hides most of the html specific stuff.
  // It keeps a list of surfaces (Diagram Canvases).
  this.surfaces = {};
  return this;
}



function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  var id = +(tabName.match(/\D*(\d*)/)[1]);
  var id2;
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    id2 = +(tabcontent[i].id.match(/\D*(\d*)/)[1]);
    if( id == id2 )
      tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    id2 = +(tablinks[i].id.match(/\D*(\d*)/)[1]);
    if( id == id2 )
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function escapeEmoji( str ){
  // italics for non unicode characters.    
  return str.replace(/([^\u0000-\u00ff]+)/g, "<span class='emoji'>$1</span>");
}


DomUtils.prototype ={
  setFavicon( icon ){
    var link = document.querySelector("link[rel~='icon']");
    link.href = icon;
  },   
  setSize( what, size ){
    if( typeof what == "string")
      what = document.getElementById(what);
    what.style.width = size.x + "px";
    what.style.height = size.y + "px";
    return what;
  },
  setAtOrigin( what ){
    if( typeof what == "string")
      what = document.getElementById(what);
    what.style.position = "absolute";
    what.style.left = "0px";
    what.style.top = "0px";
    return what;
  },
  initDiagramDiv( name,size ){
    //if( typeof what == "string")
    //   what = document.getElementById(what);
    this.surfaces[name] = new DiagramCanvas( name, size);
  },
  newCanvas( size ){
    var s = {};
    s.canvas = document.createElement("canvas");
    this.setAtOrigin( s.canvas );
    s.canvas.width = size.x;
    s.canvas.height = size.y;
    s.ctx = s.canvas.getContext('2d');
    return s;
  },
  getChecked( what ){
    var div = document.getElementById(what);
    return div.checked;
  },
  toggleChecked( what ){
    var div = document.getElementById(what);
    div.style.checked = !div.style.checked;
  },
  toggleVisibility( what ){
    var div = document.getElementById(what);
    div.style.display = (div.style.display==='none')? 'inline-block':'none';
  },
  setVisibility( what, show ){
    var div = document.getElementById(what);
    if( div )
      div.style.display = show ? 'inline-block':'none';
  },
  getValue( what ){
    var div = document.getElementById(what);
    return div.value;
  },   
  setValue( what, value){
    var div = document.getElementById(what);
    if( div )
      div.value = value;
  },
  set( what, value){
    var div = document.getElementById(what);
    div.innerHTML = value;
  },
  getSetting( name){
    return "// "+ name + ": "+(this.getChecked( name )?"Yes":"No")+"\n";
  },
  get2dCtx( name ){
    return this.surfaces[ name ].draw.ctx;
  },
  get2dCanvas( name ){
    return this.surfaces[ name ].draw.canvas;
  },
  getArg(arg){
    var line = window.location.href;
    line = "&" + line.split('?')[1] || "";
    line = line.split('&' + arg + '=')[1] || "";
    line = (line + '&').split('&')[0];
    return line;
  },
  getAnchor(){
    var line = window.location.href;
    line = line.split('#')[1] || "";
    return line;
  },
}

DomUtils = new DomUtils();

