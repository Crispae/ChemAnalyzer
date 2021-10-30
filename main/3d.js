// Taken from "https://stackoverflow.com/questions/2592092/executing-script-elements-inserted-with-innerhtml"
// Mainly use to excute script for 3d view of picture
function insertAndExecute(id, text) {
    document.getElementById(id).innerHTML = text;
    var scripts = Array.prototype.slice.call(document.getElementById(id).getElementsByTagName("script"));
    for (var i = 0; i < scripts.length; i++)
    {
        if (scripts[i].src != "")
        {
            var tag = document.createElement("script");
            tag.src = scripts[i].src;
            document.getElementsByTagName("head")[0].appendChild(tag);
        }
        else 
        {
            eval(scripts[i].innerHTML);
        }
    }
}

// loader
function loader(state){
    var element = document.getElementById("loader")
    var element2 = document.getElementById("twirler")

    if (state === "on"){
        element2.style.display = "none"
        element.style.display = "block"
    }else{
        element2.style.display = "block"
        element.style.display = "none"
    }
}


// invoking  3d view
document.getElementById("3d_btn").addEventListener("click",()=>
    {
    document.getElementById("can").style.display = "none";
    chrome.storage.sync.get(["smi"],function(data)
    {
        
/* Using AJAX for requesting the SDF file and js from NIH sever */

        // instansiating the XHR object
        var request = new XMLHttpRequest();

        // adding timeout time limit for the server to respond
        //request.timeout = 3000;

        // Sending get request
        request.open("POST",`http://127.0.0.1:5000/cordinate`,true);



        request.onprogress = function(){
            loader("on");
        }

        // onload of request
        request.onload = function(){

            loader("off")

            if(this.status == 200){

                
                var src = window.eval(`
                                        var info =  
                                        {
                                        width: 365,
                                        height: 300,
                                        debug: false,
                                        color: "black",
                                        addSelectionOptions: false,
                                        //serverURL: "",
                                        use: "HTML5",
                                        readyFunction: 'hello',
                                        src: "http://127.0.0.1:5000/static/molecule.mol",
                                        bondWidth: 4,
                                        zoomScaling: 1.5,
                                        pinchScaling: 2.0,
                                        mouseDragFactor: 0.5,
                                        touchDragFactor: 0.15,
                                        multipleBondSpacing: 4,
                                        spinRateX: 0.2,
                                        spinRateY: 0.5,
                                        spinFPS: 20,
                                        spin:false,
                                        debug: false
                                            }

                                        Jmol.getTMApplet("myjmol",info)`);

                                        insertAndExecute("twirler",src._code)

                document.getElementById("twirler").style.display = "block"
            }};
        
        

        request.send(JSON.stringify({smiles:data.smi})) // data send
        
        
        ;})})
        
// invoking 2d view
document.getElementById("2d_btn").addEventListener("click",(e)=>{
    document.getElementById("twirler").style.display = "none";
    document.getElementById("can").style.display = "block";
})



