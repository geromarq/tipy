
document.getElementById('phone-number').addEventListener('input', function(event) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

function validateAndShowPrincipal() {
    var phoneNumber = document.getElementById('phone-number').value;
    if (!phoneNumber || phoneNumber.length !== 10) {
        alert('Por favor, ingrese su número de teléfono de 10 dígitos.');
    } else {
        showPrincipal();
    }
}
function showPrincipal() { 
    var principal = document.getElementById("principal"); 
    var bienvenida = document.getElementById("bienvenida");
    principal.style.display = "block";
    bienvenida.style.display = "none";
}

function showBienvenida(){
    var principal = document.getElementById("principal"); 
    var bienvenida = document.getElementById("bienvenida");
    /* asdasdasd */
    bienvenida.style.display = "block";
    principal.style.display = "none";
    
}// Function to generate a UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function generateUniqueID() {
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
    });
  }

// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Function to check for existing cookie or set a new one
function checkUserId() {
    var userId = getCookie("userId");
    if (!userId) {
        userId = generateUUID();
        setCookie("userId", userId, 365); // cookie expires in 1 year
        console.log("New user ID set: " + userId);
    } else {
        console.log("Existing user ID: " + userId);
    }
}

// VERIFICAR ESTO
window.onload = function() {
    checkUserId();
};
