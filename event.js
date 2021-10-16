// creating context object for contextMenus

var context = {
    id:"smiles",
    title:"Analyze molecule",
    contexts:["selection"]
};

// creating contextMenus object
chrome.contextMenus.create(context);

// smiles variable
var smiles_data = null;

// Receving data from context menu
chrome.contextMenus.onClicked.addListener((info, tab) =>

{
    // update smiles_data received from context menu
    smiles_data = info.selectionText;
    chrome.storage.sync.set({'smi': `${smiles_data}`});
    
    // Adding badge just after clicking the icon on context menu
    chrome.storage.onChanged.addListener((change,storageName)=>
    {
        chrome.browserAction.setBadgeText({text:' '})
        chrome.browserAction.setBadgeBackgroundColor({
            color:"#228B22"
        })
    })
})

// communicate with popup.js for handling the badge icon
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>
{
    if (request.method === "changeBadge"){
        chrome.browserAction.setBadgeText({text:""})
        chrome.browserAction.setBadgeBackgroundColor({
            color:"#FF0000"
        })
    }
})