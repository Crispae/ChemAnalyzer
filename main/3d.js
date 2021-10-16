// Taken from "https://stackoverflow.com/questions/2592092/executing-script-elements-inserted-with-innerhtml"
// Mainly use to excute script for 3d view of picture
function insertAndExecute(id, text) {
    document.getElementById(id).innerHTML = text;
    var scripts = Array.prototype.slice.call(document.getElementById(id).getElementsByTagName("script"));
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src != "") {
            var tag = document.createElement("script");
            tag.src = scripts[i].src;
            document.getElementsByTagName("head")[0].appendChild(tag);
        }
        else {
            eval(scripts[i].innerHTML);
        }
    }
}

// invoking  3d view
document.getElementById("3d_btn").addEventListener("click",(e)=>
    {
    document.getElementById("can").style.display = "none";
    document.getElementById("twirler").style.background = "#4a4858";
    var mol = chrome.storage.sync.get(["smi"],function(data){
        
/* Using AJAX for requesting the SDF file and js from NIH sever */

        // instansiating the XHR object
        var request = new XMLHttpRequest();

        // adding timeout time limit for the server to respond
        request.timeout = 3000;

        // Sending get request
        request.open("GET",`https://cactus.nci.nih.gov/chemical/structure/${String(data.smi)}/twirl_cached/twirler`,true);

        request.onload = function(){
            if(this.status == 200){
                document.getElementById("twirler").style.display = "block"
                console.log(this.responseText);
                var scr =  `<script>${this.responseText}</script>`;
                insertAndExecute("twirler",scr);
        
}};
        
        request.ontimeout = function(){
            document.getElementById("twirler").style.display = "none";
            document.getElementById("info").innerHTML = `<h1> Timeout Error Occured </h1>`;
            document.getElementById("info").style.display = "block";
        console.log("timeout occur")
        }

        request.onerror  = function(){
            console.log("error")
        }
        request.send();})})
        
// invoking 2d view
document.getElementById("2d_btn").addEventListener("click",(e)=>{
    document.getElementById("twirler").style.display = "none";
    document.getElementById("can").style.display = "block";
})

// hide timeout error on click 
document.onclick(e,function(){
    stat = document.getElementById("info").style.display;
    if (stat === "block"){
        stat = "none"
    }

})

 /* 
 
 [2H]C1=C(C(=C(C(=C1C)[2H])[2H])C=O)[2H] --> This molecule rendering cause multiple svg rendering error occured
 
 
 
 */