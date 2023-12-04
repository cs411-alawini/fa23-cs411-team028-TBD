/* Record user info when sign in */
var userId = "nothing";
var userName = -1;
var password = -1;
var userLatitude = "nothing";
var userLongitude = "nothing";
var userState = -1;

function comapSubmit(option){
    var state = document.getElementById("comapState").value;
    var county = "Whole state"
    if (state == ""){
        alert("Please type in a state.");
        return;
    }
    if(option == "state"){
        alert("Searching state: " + state);
    }
    if(option == "county"){
        county = document.getElementById("comapCounty").value;
        if (county == ""){
            county = "Whole state";
            alert("Searching all counties in state: " + state);
        }else{
            alert("searching county: " + county);
        }   
    }

    // send to flask
    $.ajax({ 
        url: '/comap', 
        type: 'POST', 
        data: { 'option': option, 'state': state, 'county': county }, 
        success: function(response) {
            if(county == "Whole state" && option == "county"){
                try{
                    document.getElementById('timeORcounty1').innerHTML = "Rank 1 County";
                    document.getElementById('timeORcounty2').innerHTML = "Rank 2 County";
                    document.getElementById('timeORcounty3').innerHTML = "Rank 3 County";
                    document.getElementById('comapShowTime1').innerHTML = response[0].county; 
                    document.getElementById('comapShowCase1').innerHTML = response[0].cases;
                    document.getElementById('comapShowTime2').innerHTML = response[1].county; 
                    document.getElementById('comapShowCase2').innerHTML = response[1].cases; 
                    document.getElementById('comapShowTime3').innerHTML = response[2].county; 
                    document.getElementById('comapShowCase3').innerHTML = response[2].cases;
                    document.getElementById('comapShowName').innerHTML = "All counties of " + state;  
                }catch(err){
                    document.getElementById('comapShowName').innerHTML = "State not found";
                    document.getElementById('comapShowTime1').innerHTML = "NaN"; 
                    document.getElementById('comapShowCase1').innerHTML = "NaN";
                    document.getElementById('comapShowTime2').innerHTML = "NaN"; 
                    document.getElementById('comapShowCase2').innerHTML = "NaN"; 
                    document.getElementById('comapShowTime3').innerHTML = "NaN"; 
                    document.getElementById('comapShowCase3').innerHTML = "NaN"; 
                }
            }else{
                try{
                    document.getElementById('timeORcounty1').innerHTML = "Peak Case Number 1";
                    document.getElementById('timeORcounty2').innerHTML = "Peak Case Number 2";
                    document.getElementById('timeORcounty3').innerHTML = "Peak Case Number 3"; 
                    document.getElementById('comapShowTime1').innerHTML = response[0].date; 
                    document.getElementById('comapShowCase1').innerHTML = response[0].cases;
                    document.getElementById('comapShowTime2').innerHTML = response[1].date; 
                    document.getElementById('comapShowCase2').innerHTML = response[1].cases; 
                    document.getElementById('comapShowTime3').innerHTML = response[2].date; 
                    document.getElementById('comapShowCase3').innerHTML = response[2].cases;
                    document.getElementById('comapShowName').innerHTML = county + ", " + state + " (Based on 14 days period)";  
                }catch(err){
                    document.getElementById('comapShowName').innerHTML = "State or County not found";
                    document.getElementById('comapShowTime1').innerHTML = "NaN"; 
                    document.getElementById('comapShowCase1').innerHTML = "NaN";
                    document.getElementById('comapShowTime2').innerHTML = "NaN"; 
                    document.getElementById('comapShowCase2').innerHTML = "NaN"; 
                    document.getElementById('comapShowTime3').innerHTML = "NaN"; 
                    document.getElementById('comapShowCase3').innerHTML = "NaN"; 
                }  
            }
        }, 
        error: function(error) { 
            console.log(error); 
        } 
    });
}

function askDataCheckVaccine(){
    var stateCounty = document.getElementById('askDataStateCounty').value;
    if(stateCounty == "county"){
        document.getElementById('askDataVaccine').disabled = true;
    }else if(stateCounty == "state"){
        document.getElementById('askDataVaccine').disabled = false;
    }
}

function askDataSubmit(option){
    var stateCounty = document.getElementById('askDataStateCounty').value;
    if(option=="case_rank" || option=="death_rank"){
        // send to flask
        $.ajax({ 
            url: '/askData', 
            type: 'POST', 
            data: { 'stateCounty': stateCounty, 'option': option }, 
            success: function(response) {
                if(stateCounty == "state"){
                    try{                    
                        document.getElementById('askData11').innerHTML = response[0].state;
                        document.getElementById('askData12').innerHTML = response[0].netcase; 
                        document.getElementById('askData21').innerHTML = response[1].state; 
                        document.getElementById('askData22').innerHTML = response[1].netcase;
                        document.getElementById('askData31').innerHTML = response[2].state; 
                        document.getElementById('askData32').innerHTML = response[2].netcase;
                        document.getElementById('askData41').innerHTML = response[3].state; 
                        document.getElementById('askData42').innerHTML = response[3].netcase;
                        document.getElementById('askData51').innerHTML = response[4].state; 
                        document.getElementById('askData52').innerHTML = response[4].netcase;
                        document.getElementById('askData61').innerHTML = response[5].state; 
                        document.getElementById('askData62').innerHTML = response[5].netcase;
                        document.getElementById('askData71').innerHTML = response[6].state; 
                        document.getElementById('askData72').innerHTML = response[6].netcase;
                        document.getElementById('askData81').innerHTML = response[7].state; 
                        document.getElementById('askData82').innerHTML = response[7].netcase;
                        document.getElementById('askData91').innerHTML = response[8].state; 
                        document.getElementById('askData92').innerHTML = response[8].netcase;
                        document.getElementById('askData101').innerHTML = response[9].state; 
                        document.getElementById('askData102').innerHTML = response[9].netcase;
                        document.getElementById('askData111').innerHTML = response[10].state; 
                        document.getElementById('askData112').innerHTML = response[10].netcase;
                        document.getElementById('askData121').innerHTML = response[11].state; 
                        document.getElementById('askData122').innerHTML = response[11].netcase;
                        document.getElementById('askData131').innerHTML = response[12].state; 
                        document.getElementById('askData132').innerHTML = response[12].netcase;
                        document.getElementById('askData141').innerHTML = response[13].state; 
                        document.getElementById('askData142').innerHTML = response[13].netcase;
                        document.getElementById('askData151').innerHTML = response[14].state; 
                        document.getElementById('askData152').innerHTML = response[14].netcase;
                        document.getElementById('askData01').innerHTML = "State"; 
                        document.getElementById('askData02').innerHTML = "Population";
                    }catch(err){
                        document.getElementById('askData11').innerHTML = "";
                        document.getElementById('askData12').innerHTML = ""; 
                        document.getElementById('askData21').innerHTML = "";
                        document.getElementById('askData22').innerHTML = "";
                        document.getElementById('askData31').innerHTML = "";
                        document.getElementById('askData32').innerHTML = "";
                        document.getElementById('askData41').innerHTML = "";
                        document.getElementById('askData42').innerHTML = "";
                        document.getElementById('askData51').innerHTML = "";
                        document.getElementById('askData52').innerHTML = "";
                        document.getElementById('askData61').innerHTML = "";
                        document.getElementById('askData62').innerHTML = "";
                        document.getElementById('askData71').innerHTML = "";
                        document.getElementById('askData72').innerHTML = "";
                        document.getElementById('askData81').innerHTML = "";
                        document.getElementById('askData82').innerHTML = "";
                        document.getElementById('askData91').innerHTML = "";
                        document.getElementById('askData92').innerHTML = "";
                        document.getElementById('askData101').innerHTML ="";
                        document.getElementById('askData102').innerHTML ="";
                        document.getElementById('askData111').innerHTML =""; 
                        document.getElementById('askData112').innerHTML ="";
                        document.getElementById('askData121').innerHTML =""; 
                        document.getElementById('askData122').innerHTML ="";
                        document.getElementById('askData131').innerHTML =""; 
                        document.getElementById('askData132').innerHTML ="";
                        document.getElementById('askData141').innerHTML =""; 
                        document.getElementById('askData142').innerHTML ="";
                        document.getElementById('askData151').innerHTML =""; 
                        document.getElementById('askData152').innerHTML ="";
                        document.getElementById('askData01').innerHTML = "State"; 
                        document.getElementById('askData02').innerHTML = "Population";
                    }
                }else if(stateCounty == "county"){
                    try{                    
                        document.getElementById('askData11').innerHTML = response[0].county + ", " + response[0].state;
                        document.getElementById('askData12').innerHTML = response[0].netcase; 
                        document.getElementById('askData21').innerHTML = response[1].county + ", " + response[1].state;
                        document.getElementById('askData22').innerHTML = response[1].netcase;
                        document.getElementById('askData31').innerHTML = response[2].county + ", " + response[2].state;
                        document.getElementById('askData32').innerHTML = response[2].netcase;
                        document.getElementById('askData41').innerHTML = response[3].county + ", " + response[3].state; 
                        document.getElementById('askData42').innerHTML = response[3].netcase;
                        document.getElementById('askData51').innerHTML = response[4].county + ", " + response[4].state; 
                        document.getElementById('askData52').innerHTML = response[4].netcase;
                        document.getElementById('askData61').innerHTML = response[5].county + ", " + response[5].state; 
                        document.getElementById('askData62').innerHTML = response[5].netcase;
                        document.getElementById('askData71').innerHTML = response[6].county + ", " + response[6].state; 
                        document.getElementById('askData72').innerHTML = response[6].netcase;
                        document.getElementById('askData81').innerHTML = response[7].county + ", " + response[7].state;
                        document.getElementById('askData82').innerHTML = response[7].netcase;
                        document.getElementById('askData91').innerHTML = response[8].county + ", " + response[8].state;
                        document.getElementById('askData92').innerHTML = response[8].netcase;
                        document.getElementById('askData101').innerHTML = response[9].county + ", " + response[9].state;
                        document.getElementById('askData102').innerHTML = response[9].netcase;
                        document.getElementById('askData111').innerHTML = response[10].county + ", " + response[10].state;
                        document.getElementById('askData112').innerHTML = response[10].netcase;
                        document.getElementById('askData121').innerHTML = response[11].county + ", " + response[11].state;
                        document.getElementById('askData122').innerHTML = response[11].netcase;
                        document.getElementById('askData131').innerHTML = response[12].county + ", " + response[12].state;
                        document.getElementById('askData132').innerHTML = response[12].netcase;
                        document.getElementById('askData141').innerHTML = response[13].county + ", " + response[13].state;
                        document.getElementById('askData142').innerHTML = response[13].netcase;
                        document.getElementById('askData151').innerHTML = response[14].county + ", " + response[14].state;
                        document.getElementById('askData152').innerHTML = response[14].netcase;
                        document.getElementById('askData01').innerHTML = "County, State"; 
                        document.getElementById('askData02').innerHTML = "Population";
                    }catch(err){
                        document.getElementById('askData11').innerHTML = "";
                        document.getElementById('askData12').innerHTML = ""; 
                        document.getElementById('askData21').innerHTML = "";
                        document.getElementById('askData22').innerHTML = "";
                        document.getElementById('askData31').innerHTML = "";
                        document.getElementById('askData32').innerHTML = "";
                        document.getElementById('askData41').innerHTML = "";
                        document.getElementById('askData42').innerHTML = "";
                        document.getElementById('askData51').innerHTML = "";
                        document.getElementById('askData52').innerHTML = "";
                        document.getElementById('askData61').innerHTML = "";
                        document.getElementById('askData62').innerHTML = "";
                        document.getElementById('askData71').innerHTML = "";
                        document.getElementById('askData72').innerHTML = "";
                        document.getElementById('askData81').innerHTML = "";
                        document.getElementById('askData82').innerHTML = "";
                        document.getElementById('askData91').innerHTML = "";
                        document.getElementById('askData92').innerHTML = "";
                        document.getElementById('askData101').innerHTML ="";
                        document.getElementById('askData102').innerHTML ="";
                        document.getElementById('askData111').innerHTML =""; 
                        document.getElementById('askData112').innerHTML ="";
                        document.getElementById('askData121').innerHTML =""; 
                        document.getElementById('askData122').innerHTML ="";
                        document.getElementById('askData131').innerHTML =""; 
                        document.getElementById('askData132').innerHTML ="";
                        document.getElementById('askData141').innerHTML =""; 
                        document.getElementById('askData142').innerHTML ="";
                        document.getElementById('askData151').innerHTML =""; 
                        document.getElementById('askData152').innerHTML ="";
                        document.getElementById('askData01').innerHTML = "State"; 
                        document.getElementById('askData02').innerHTML = "Population";
                    }
                }
                  
            }, 
            error: function(error) { 
                console.log(error); 
            } 
        });
    }
    if(option=="vaccine"){
        // send to flask
        $.ajax({ 
            url: '/askData', 
            type: 'POST', 
            data: { 'stateCounty': stateCounty, 'option': option }, 
            success: function(response) {
                try{                    
                    document.getElementById('askData11').innerHTML = response[0].state;
                    document.getElementById('askData12').innerHTML = response[0].netcase; 
                    document.getElementById('askData21').innerHTML = response[1].state; 
                    document.getElementById('askData22').innerHTML = response[1].netcase;
                    document.getElementById('askData31').innerHTML = response[2].state; 
                    document.getElementById('askData32').innerHTML = response[2].netcase;
                    document.getElementById('askData41').innerHTML = response[3].state; 
                    document.getElementById('askData42').innerHTML = response[3].netcase;
                    document.getElementById('askData51').innerHTML = response[4].state; 
                    document.getElementById('askData52').innerHTML = response[4].netcase;
                    document.getElementById('askData61').innerHTML = response[5].state; 
                    document.getElementById('askData62').innerHTML = response[5].netcase;
                    document.getElementById('askData71').innerHTML = response[6].state; 
                    document.getElementById('askData72').innerHTML = response[6].netcase;
                    document.getElementById('askData81').innerHTML = response[7].state; 
                    document.getElementById('askData82').innerHTML = response[7].netcase;
                    document.getElementById('askData91').innerHTML = response[8].state; 
                    document.getElementById('askData92').innerHTML = response[8].netcase;
                    document.getElementById('askData101').innerHTML = response[9].state; 
                    document.getElementById('askData102').innerHTML = response[9].netcase;
                    document.getElementById('askData111').innerHTML = response[10].state; 
                    document.getElementById('askData112').innerHTML = response[10].netcase;
                    document.getElementById('askData121').innerHTML = response[11].state; 
                    document.getElementById('askData122').innerHTML = response[11].netcase;
                    document.getElementById('askData131').innerHTML = response[12].state; 
                    document.getElementById('askData132').innerHTML = response[12].netcase;
                    document.getElementById('askData141').innerHTML = response[13].state; 
                    document.getElementById('askData142').innerHTML = response[13].netcase;
                    document.getElementById('askData151').innerHTML = response[14].state; 
                    document.getElementById('askData152').innerHTML = response[14].netcase;
                    document.getElementById('askData01').innerHTML = "Jurisdiction"; 
                    document.getElementById('askData02').innerHTML = "Doses";
                }catch(err){
                    document.getElementById('askData11').innerHTML = "";
                    document.getElementById('askData12').innerHTML = ""; 
                    document.getElementById('askData21').innerHTML = "";
                    document.getElementById('askData22').innerHTML = "";
                    document.getElementById('askData31').innerHTML = "";
                    document.getElementById('askData32').innerHTML = "";
                    document.getElementById('askData41').innerHTML = "";
                    document.getElementById('askData42').innerHTML = "";
                    document.getElementById('askData51').innerHTML = "";
                    document.getElementById('askData52').innerHTML = "";
                    document.getElementById('askData61').innerHTML = "";
                    document.getElementById('askData62').innerHTML = "";
                    document.getElementById('askData71').innerHTML = "";
                    document.getElementById('askData72').innerHTML = "";
                    document.getElementById('askData81').innerHTML = "";
                    document.getElementById('askData82').innerHTML = "";
                    document.getElementById('askData91').innerHTML = "";
                    document.getElementById('askData92').innerHTML = "";
                    document.getElementById('askData101').innerHTML ="";
                    document.getElementById('askData102').innerHTML ="";
                    document.getElementById('askData111').innerHTML =""; 
                    document.getElementById('askData112').innerHTML ="";
                    document.getElementById('askData121').innerHTML =""; 
                    document.getElementById('askData122').innerHTML ="";
                    document.getElementById('askData131').innerHTML =""; 
                    document.getElementById('askData132').innerHTML ="";
                    document.getElementById('askData141').innerHTML =""; 
                    document.getElementById('askData142').innerHTML ="";
                    document.getElementById('askData151').innerHTML =""; 
                    document.getElementById('askData152').innerHTML ="";
                    document.getElementById('askData01').innerHTML = "Jurisdiction"; 
                    document.getElementById('askData02').innerHTML = "Doses";
                }  
            }, 
            error: function(error) { 
                console.log(error); 
            } 
        });
    }
     
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }else{
        alert("Cannot get your location.")
    }
}

function showPosition(pos){
    userLatitude = pos.coords.latitude;
    userLongitude = pos.coords.longitude;
}

function showError(error){
    console.log(error);
}

function myTBDSubmit1(){
    var option = document.getElementById("signInUp").value;
    userId = document.getElementById("myTBDUserId").value;
    if(userId.length <= 0){
        alert("Please input a valid userId.");
        userId = "nothing";
        userName = -1;
        password = -1;
        return;
    }
    userId = Number(userId);
    userName = document.getElementById("myTBDName").value;
    password = document.getElementById("myTBDPassword").value;

    // sanity check
    if((!Number.isInteger(userId)) || (userId > 99999999999)){
        alert("Please input a valid userId.");
        userId = "nothing";
        userName = -1;
        password = -1;
        return;
    }
    if((userName.length <= 0) || (typeof userName !== "string") || userName.length > 40){
        alert("Please input a valid user name.");
        userId = "nothing";
        userName = -1;
        password = -1;
        return;
    }
    if((password.length <= 0) || (typeof password !== "string") || userName.length > 40){
        alert("Please input a valid password.");
        userId = "nothing";
        userName = -1;
        password = -1;
        return;
    }
    
    // send to flask
    $.ajax({ 
        url: '/myTBDSign', 
        type: 'POST', 
        data: { 'option': option, 'userId': userId, 'userName': userName, 'password': password }, 
        success: function(response) {
            if(option == "signIn"){
                if(response[0].status == 0){
                    alert("Welcome " + userName + "!");
                    document.getElementById("myTBDSubmit2").disabled = false;
                    document.getElementById("myTBDStatus").disabled = false;
                    document.getElementById("myTBDState").disabled = false;
                    document.getElementById("myTBDLogout").disabled = false;
                    document.getElementById("myTBDDelete").disabled = false;
                    if(response[1].state != 0){
                        document.getElementById("myTBDTips").innerHTML = "Your state (" + response[1].state + ") has " + String(response[1].cases) + " in total according to myTBD statistics.";
                    }
                }else if(response[0].status == -2){
                    alert("Password is not correct, please try again.");
                    userId = "nothing";
                    userName = -1;
                    password = -1;
                }else{
                    alert("User does not exist, please sign up.");
                    userId = "nothing";
                    userName = -1;
                    password = -1;
                }
            }else if(option == "signUp"){
                if(response[0].status == 0){
                    alert("Account creat successfully. Welcome " + userName + "!");
                    document.getElementById("myTBDSubmit2").disabled = false;
                    document.getElementById("myTBDStatus").disabled = false;
                    document.getElementById("myTBDState").disabled = false;
                    document.getElementById("myTBDLogout").disabled = false;
                    document.getElementById("myTBDDelete").disabled = false;
                    document.getElementById("myTBDTips").innerHTML = "";
                }else{
                    alert("UserID already exist, please try another one.");
                    userId = "nothing";
                    userName = -1;
                    password = -1;
                }
            }
        }, 
        error: function(error) { 
            console.log(error); 
        } 
    });
}

function myTBDLogout(){
    document.getElementById("myTBDSubmit2").disabled = true;
    document.getElementById("myTBDStatus").disabled = true;
    document.getElementById("myTBDState").disabled = true;
    document.getElementById("myTBDDelete").disabled = true;
    document.getElementById("myTBDState").value = "";
    document.getElementById("myTBDUserId").value = "";
    document.getElementById("myTBDName").value = "";
    document.getElementById("myTBDPassword").value = "";
    document.getElementById("myTBDTips").innerHTML = "";

    alert("See you next time, " + userName);
    userId = "nothing";
    userName = -1;
    password = -1;
    document.getElementById("myTBDLogout").disabled = true;
}

function myTBDSubmit2(){
    var userStatus = document.getElementById("myTBDStatus").value;
    var userState = document.getElementById("myTBDState").value;

    // sanity check
    if(userId == "nothing" || userName == -1 || userState == -1){
        alert("Please sign in first.");
        return;
    }
    if(userStatus.length <= 0){
        alert("Please choose a health condition.");
        return;
    }
    if(userState.length <= 0){
        alert("Please input a state.");
        return;
    }
    
    // send to flask
    $.ajax({ 
        url: '/myTBDUpdate', 
        type: 'POST', 
        data: { 'userId': userId, 'userStatus': userStatus, 'userState': userState }, 
        success: function(response) {
            if(response[0].status == 0){
                alert("Successfully updated!")
            }else{
                alert("State not found, please try again.")
            }
        }, 
        error: function(error) { 
            console.log(error); 
        } 
    });
}

function myTBDDelete(){
    $.ajax({ 
        url: '/myTBDDelete', 
        type: 'POST', 
        data: { 'userId': userId }, 
        success: function(response) {
            if(response[0].status == 0){
                alert("Thank you for your support, bye!");
            }
        }, 
        error: function(error) { 
            console.log(error); 
        } 
    });
    userId = "nothing";
    userName = -1;
    password = -1;
    document.getElementById("myTBDSubmit2").disabled = true;
    document.getElementById("myTBDStatus").disabled = true;
    document.getElementById("myTBDState").disabled = true;
    document.getElementById("myTBDLogout").disabled = true;
    document.getElementById("myTBDDelete").disabled = true;
    document.getElementById("myTBDState").value = "";
    document.getElementById("myTBDUserId").value = "";
    document.getElementById("myTBDName").value = "";
    document.getElementById("myTBDPassword").value = "";
    document.getElementById("myTBDTips").innerHTML = "";
}

function SOSSubmit(){
    userState = document.getElementById("SOSState").value;

    // sanity check
    if(userLatitude == "nothing" || userLongitude == "nothing"){
        alert("Sorry, we can not have your location. Please share your location first.");
        return;
    }

    if(userState == -1){
        alert("Please input your state.");
        return;
    }

    var option = document.getElementById("SOSSelect").value;
    userLatitude = Math.round(userLatitude);
    userLongitude = Math.round(userLongitude);

    $.ajax({ 
        url: '/SOS', 
        type: 'POST', 
        data: { 'option': option, 'latitude': userLatitude, 'longitude': userLongitude, 'userState': userState }, 
        success: function(response) {
            if(response[0].hospital == -1){
                alert("State does not exist, please try again.");
                return;
            }else{
                if(option=="distance"){
                    document.getElementById('SOSData11').innerHTML = response[0].hospital;
                    document.getElementById('SOSData12').innerHTML = response[0].state;
                    document.getElementById('SOSData13').innerHTML = response[0].beds;
                    document.getElementById('SOSData14').innerHTML = response[0].distance;
                    document.getElementById('SOSData21').innerHTML = response[1].hospital; 
                    document.getElementById('SOSData22').innerHTML = response[1].state;
                    document.getElementById('SOSData23').innerHTML = response[1].beds;
                    document.getElementById('SOSData24').innerHTML = response[1].distance;
                    document.getElementById('SOSData31').innerHTML = response[2].hospital; 
                    document.getElementById('SOSData32').innerHTML = response[2].state;
                    document.getElementById('SOSData33').innerHTML = response[2].beds;
                    document.getElementById('SOSData34').innerHTML = response[2].distance;
                    document.getElementById('SOSData41').innerHTML = response[3].hospital; 
                    document.getElementById('SOSData42').innerHTML = response[3].state;
                    document.getElementById('SOSData43').innerHTML = response[3].beds;
                    document.getElementById('SOSData44').innerHTML = response[3].distance;
                    document.getElementById('SOSData51').innerHTML = response[4].hospital; 
                    document.getElementById('SOSData52').innerHTML = response[4].state;
                    document.getElementById('SOSData53').innerHTML = response[4].beds;
                    document.getElementById('SOSData54').innerHTML = response[4].distance;
                    document.getElementById('SOSData61').innerHTML = response[5].hospital; 
                    document.getElementById('SOSData62').innerHTML = response[5].state;
                    document.getElementById('SOSData63').innerHTML = response[5].beds;
                    document.getElementById('SOSData64').innerHTML = response[5].distance;
                    document.getElementById('SOSData71').innerHTML = response[6].hospital; 
                    document.getElementById('SOSData72').innerHTML = response[6].state;
                    document.getElementById('SOSData73').innerHTML = response[6].beds;
                    document.getElementById('SOSData74').innerHTML = response[6].distance;
                    document.getElementById('SOSData81').innerHTML = response[7].hospital; 
                    document.getElementById('SOSData82').innerHTML = response[7].state;
                    document.getElementById('SOSData83').innerHTML = response[7].beds;
                    document.getElementById('SOSData84').innerHTML = response[7].distance;
                    document.getElementById('SOSData91').innerHTML = response[8].hospital; 
                    document.getElementById('SOSData92').innerHTML = response[8].state;
                    document.getElementById('SOSData93').innerHTML = response[8].beds;
                    document.getElementById('SOSData94').innerHTML = response[8].distance;
                    document.getElementById('SOSData101').innerHTML = response[9].hospital; 
                    document.getElementById('SOSData102').innerHTML = response[9].state;
                    document.getElementById('SOSData103').innerHTML = response[9].beds;
                    document.getElementById('SOSData104').innerHTML = response[9].distance;
                    document.getElementById('SOSData111').innerHTML = response[10].hospital; 
                    document.getElementById('SOSData112').innerHTML = response[10].state;
                    document.getElementById('SOSData113').innerHTML = response[10].beds;
                    document.getElementById('SOSData114').innerHTML = response[10].distance;
                    document.getElementById('SOSData121').innerHTML = response[11].hospital; 
                    document.getElementById('SOSData122').innerHTML = response[11].state;
                    document.getElementById('SOSData123').innerHTML = response[11].beds;
                    document.getElementById('SOSData124').innerHTML = response[11].distance;
                    document.getElementById('SOSData131').innerHTML = response[12].hospital; 
                    document.getElementById('SOSData132').innerHTML = response[12].state;
                    document.getElementById('SOSData133').innerHTML = response[12].beds;
                    document.getElementById('SOSData134').innerHTML = response[12].distance;
                    document.getElementById('SOSData141').innerHTML = response[13].hospital; 
                    document.getElementById('SOSData142').innerHTML = response[13].state;
                    document.getElementById('SOSData143').innerHTML = response[13].beds;
                    document.getElementById('SOSData144').innerHTML = response[13].distance;
                    document.getElementById('SOSData151').innerHTML = response[14].hospital; 
                    document.getElementById('SOSData152').innerHTML = response[14].state;
                    document.getElementById('SOSData153').innerHTML = response[14].beds;
                    document.getElementById('SOSData154').innerHTML = response[14].distance;
                    document.getElementById('SOSData01').innerHTML = "Hospital"; 
                    document.getElementById('SOSData02').innerHTML = "State";
                    document.getElementById('SOSData03').innerHTML = "Beds"; 
                    document.getElementById('SOSData04').innerHTML = "Distance";
                }else if(option=="resource"){
                    document.getElementById('SOSData11').innerHTML = response[0].hospital;
                    document.getElementById('SOSData12').innerHTML = response[0].county + ", " + response[0].state;
                    document.getElementById('SOSData13').innerHTML = response[0].beds;
                    document.getElementById('SOSData14').innerHTML = response[0].distance;
                    document.getElementById('SOSData21').innerHTML = response[1].hospital; 
                    document.getElementById('SOSData22').innerHTML = response[1].county + ", " + response[1].state;
                    document.getElementById('SOSData23').innerHTML = response[1].beds;
                    document.getElementById('SOSData24').innerHTML = response[1].distance;
                    document.getElementById('SOSData31').innerHTML = response[2].hospital; 
                    document.getElementById('SOSData32').innerHTML = response[2].county + ", " + response[2].state;
                    document.getElementById('SOSData33').innerHTML = response[2].beds;
                    document.getElementById('SOSData34').innerHTML = response[2].distance;
                    document.getElementById('SOSData41').innerHTML = response[3].hospital; 
                    document.getElementById('SOSData42').innerHTML = response[3].county + ", " + response[3].state;
                    document.getElementById('SOSData43').innerHTML = response[3].beds;
                    document.getElementById('SOSData44').innerHTML = response[3].distance;
                    document.getElementById('SOSData51').innerHTML = response[4].hospital; 
                    document.getElementById('SOSData52').innerHTML = response[4].county + ", " + response[4].state;
                    document.getElementById('SOSData53').innerHTML = response[4].beds;
                    document.getElementById('SOSData54').innerHTML = response[4].distance;
                    document.getElementById('SOSData61').innerHTML = response[5].hospital; 
                    document.getElementById('SOSData62').innerHTML = response[5].county + ", " + response[5].state;
                    document.getElementById('SOSData63').innerHTML = response[5].beds;
                    document.getElementById('SOSData64').innerHTML = response[5].distance;
                    document.getElementById('SOSData71').innerHTML = response[6].hospital; 
                    document.getElementById('SOSData72').innerHTML = response[6].county + ", " + response[6].state;
                    document.getElementById('SOSData73').innerHTML = response[6].beds;
                    document.getElementById('SOSData74').innerHTML = response[6].distance;
                    document.getElementById('SOSData81').innerHTML = response[7].hospital; 
                    document.getElementById('SOSData82').innerHTML = response[7].county + ", " + response[7].state;
                    document.getElementById('SOSData83').innerHTML = response[7].beds;
                    document.getElementById('SOSData84').innerHTML = response[7].distance;
                    document.getElementById('SOSData91').innerHTML = response[8].hospital; 
                    document.getElementById('SOSData92').innerHTML = response[8].county + ", " + response[8].state;
                    document.getElementById('SOSData93').innerHTML = response[8].beds;
                    document.getElementById('SOSData94').innerHTML = response[8].distance;
                    document.getElementById('SOSData101').innerHTML = response[9].hospital; 
                    document.getElementById('SOSData102').innerHTML = response[9].county + ", " + response[9].state;
                    document.getElementById('SOSData103').innerHTML = response[9].beds;
                    document.getElementById('SOSData104').innerHTML = response[9].distance;
                    document.getElementById('SOSData111').innerHTML = response[10].hospital; 
                    document.getElementById('SOSData112').innerHTML = response[10].county + ", " + response[10].state;
                    document.getElementById('SOSData113').innerHTML = response[10].beds;
                    document.getElementById('SOSData114').innerHTML = response[10].distance;
                    document.getElementById('SOSData121').innerHTML = response[11].hospital; 
                    document.getElementById('SOSData122').innerHTML = response[11].county + ", " + response[11].state;
                    document.getElementById('SOSData123').innerHTML = response[11].beds;
                    document.getElementById('SOSData124').innerHTML = response[11].distance;
                    document.getElementById('SOSData131').innerHTML = response[12].hospital; 
                    document.getElementById('SOSData132').innerHTML = response[12].county + ", " + response[12].state;
                    document.getElementById('SOSData133').innerHTML = response[12].beds;
                    document.getElementById('SOSData134').innerHTML = response[12].distance;
                    document.getElementById('SOSData141').innerHTML = response[13].hospital; 
                    document.getElementById('SOSData142').innerHTML = response[13].county + ", " + response[13].state;
                    document.getElementById('SOSData143').innerHTML = response[13].beds;
                    document.getElementById('SOSData144').innerHTML = response[13].distance;
                    document.getElementById('SOSData151').innerHTML = response[14].hospital; 
                    document.getElementById('SOSData152').innerHTML = response[14].county + ", " + response[14].state;
                    document.getElementById('SOSData153').innerHTML = response[14].beds;
                    document.getElementById('SOSData154').innerHTML = response[14].distance;
                    document.getElementById('SOSData01').innerHTML = "Hospital"; 
                    document.getElementById('SOSData02').innerHTML = "County, State";
                    document.getElementById('SOSData03').innerHTML = "Beds"; 
                    document.getElementById('SOSData04').innerHTML = "Distance";
                }
            }
        }, 
        error: function(error) { 
            console.log(error); 
        } 
    });
}





