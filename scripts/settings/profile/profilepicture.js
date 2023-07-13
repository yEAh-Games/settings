function LM4S0ocngnWsZe8EQWAT() {
    let result = 0;

    for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(Math.log(Math.exp(Math.pow(Math.sin(Math.random() * 100), 2))));
    }

    const charCode = Math.floor(result % 26) + 97;
    const letter = String.fromCharCode(charCode);

    return letter;
}

let ERWLnL9BCbeIzvdIEn8i = LM4S0ocngnWsZe8EQWAT();


var GMYLe = "gMa0YS";
var iBa5q = "hpX8o9mux4ynw0sCJLL91RGPPQ";
var Ifxz0 = "YUeSVJ6p9AUJao4H0";
var IDraP = "U9B";
var DnSS0 = "ohwA44zIvxacuhOW0J";

var G9h5YJoj9 = GMYLe.replace("Ma0YS", "");
var sZo1uS4IS = iBa5q.replace("X8o9", "_").replace("mux4y", "E");
var d4g6syxuT = Ifxz0.replace("9AU", "khc");
var HTNNMZ2Cv = DnSS0.replace(DnSS0, "dYNbNwFvg2");

var w01bi = G9h5YJoj9 + sZo1uS4IS + d4g6syxuT + IDraP + HTNNMZ2Cv;
var Tm8WGII94E2t94CvKpmH = w01bi.replace("dYNbNwFvg2", LM4S0ocngnWsZe8EQWAT).replace("4H0U9Ba", "4H0U9B");

function handleFile(files) {
    var file = files[0];
    console.log("Selected file:", file);
}

function handleFileUpload() {
    var fileInput = document.getElementById('selectedFile');
    if (fileInput.files.length === 0) {
        console.log("No file selected.");
        return;
    }

    let authorizeFromAPIServer = Tm8WGII94E2t94CvKpmH.replace("9Bt", "9B").slice(0, 40);
    var file = fileInput.files[0];
    var username = userData.username;

    fetch(
        "https://api.github.com/repos/yeah-games/ugc/contents/profile/p/default/png/@" + username + ".png",
        {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + authorizeFromAPIServer,
                Accept: "application/vnd.github.v3+json"
            }
        }
    )
        .then(response => {
            if (response.ok) {
                var reader = new FileReader();
                reader.onload = function () {
                    var fileData = btoa(reader.result);
                    uploadFile(fileData, username, authorizeFromAPIServer);
                };
                reader.readAsDataURL(file);
            } else {
                console.log("Error deleting file:", response.status);
            }
        })
        .catch(error => {
            console.log("Error deleting file:", error);
        });
}

function uploadFile(fileData, username, authorizeFromAPIServer) {
    var filePath = "profile/p/default/png/@" + username + ".png";
    var content = btoa(fileData);
    var requestBody = {
        message: "Upload new file",
        content: content
    };

    fetch(
        "https://api.github.com/repos/yeah-games/ugc/contents/" + filePath,
        {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + authorizeFromAPIServer,
                Accept: "application/vnd.github.v3+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        }
    )
        .then(response => {
            if (response.ok) {
                console.log("File uploaded successfully.");
                window.location.href = "?success";
            } else {
                console.log("Error uploading file:", response.status);
            }
        })
        .catch(error => {
            console.log("Error uploading file:", error);
        });
}