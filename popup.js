
// communicate with background page to clear badge
 chrome.runtime.sendMessage({method:"changeBadge"},(Response)=>
 {

  console.log("message send");

 })

// Defining constant value
let input = document.getElementById("example-input");
const options = {
    width: 365,
    height: 200,
    bondThickness: 0.8,
    bondLength: 15,
    shortBondLength: 0.85,
    bondSpacing: 0.18 * 15,
    atomVisualization: 'default',
    isomeric: true,
    debug: false,
    terminalCarbons: false,
    explicitHydrogens: true,
    overlapSensitivity: 0.42,
    overlapResolutionIterations: 1,
    compactDrawing: false,
    fontSizeLarge: 5,
    fontSizeSmall: 3,
    padding: 15.0,
    experimental: false,
    themes: {
        dark: {
            C: '#fff',
            O: '#e74c3c',
            N: '#3498db',
            F: '#27ae60',
            CL: '#16a085',
            BR: '#d35400',
            I: '#8e44ad',
            P: '#d35400',
            S: '#f1c40f',
            B: '#e67e22',
            SI: '#e67e22',
            H: '#fff',
            BACKGROUND: '#141414'
        },
        light: {
            C: '#222',
            O: '#e74c3c',
            N: '#3498db',
            F: '#27ae60',
            CL: '#16a085',
            BR: '#d35400',
            I: '#8e44ad',
            P: '#d35400',
            S: '#f1c40f',
            B: '#e67e22',
            SI: '#e67e22',
            H: '#222',
            BACKGROUND: '#fff'
        }
    }
};


// initializing RDKkit Module
onRuntimeInitialized: initRDKitModule().then(function (instance)
{
  RDKitModule = instance;
  // console.log('version: ' + RDKitModule.version());

 // Initialize the drawer to draw to canvas
 let smilesDrawer = new SmilesDrawer.Drawer(options);

 // input.addEventListener("input", function() 
 chrome.storage.sync.get(["smi"],function(data)
 
 { 
   if (data.smi === undefined){
     input.value = "";
   }else{
    input.value = data.smi;
   }
   
  // Clean the input (remove unrecognized characters, such as spaces and tabs) and parse it
  SmilesDrawer.parse(data.smi, function(tree) {
    // Draw to the canvas
  smilesDrawer.draw(tree, "example-canvas", "light", false);
    // Alternatively, draw to SVG:
    // svgDrawer.draw(tree, 'output-svg', 'dark', false);
  });
  
  var input_Value,rdkit_mol;
  input_Value = String(data.smi); // convert input data in to string
  rdkit_mol = RDKitModule.get_mol(input_Value) // creating rdkit molecule
  var descriptor_obj = JSON.parse(rdkit_mol.get_descriptors());// storing desriptors
  var dataToShow = ["exactmw","tpsa","CrippenClogP","NumAromaticRings","NumHBD","NumHBA"]; // descriptors name to be shown

  for(var key in descriptor_obj){
    for(var dataShow in dataToShow){
      if(String(key) === String(dataToShow[dataShow]))
      {
        document.getElementById(String(key)).innerText = descriptor_obj[key]

      }
    }

  }
});

input.addEventListener("input",function(e){
  console.log(this.value)
  // Clean the input (remove unrecognized characters, such as spaces and tabs) and parse it
  SmilesDrawer.parse(this.value, function(tree) {
    // Draw to the canvas
  smilesDrawer.draw(tree, "example-canvas", "light", false);
    // Alternatively, draw to SVG:
    // svgDrawer.draw(tree, 'output-svg', 'dark', false);
  });
  
  var input_Value,rdkit_mol;
  input_Value = String(this.value); // convert input data in to string
  rdkit_mol = RDKitModule.get_mol(input_Value) // creating rdkit molecule
  var descriptor_obj = JSON.parse(rdkit_mol.get_descriptors());// storing desriptors
  var dataToShow = ["exactmw","tpsa","CrippenClogP","NumAromaticRings","NumHBD","NumHBA"]; // descriptors name to be shown

  for(var key in descriptor_obj){
    for(var dataShow in dataToShow){
      if(String(key) === String(dataToShow[dataShow]))
      {
        document.getElementById(String(key)).innerText = descriptor_obj[key]

      }
    }

  }


})


});