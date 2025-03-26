var sendMailOverHTTP = null;


var VENDOR_EMAIL = `rajasidhadrvks68@yahoo.co.in`

function reInitWebflow() {
    //RE-INIT WF as Vue.js init breaks WF interactions


    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require('ix2').init();

    document.dispatchEvent(new Event('readystatechange'));

    // IX 2 Fix for if you have different interactions at different breakpoints
    var resizeTimer;
    $(window).on('resize', function (e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            //When the page is resized re-start animations
            document.dispatchEvent(new Event('readystatechange'));
        }, 500);
    });
}


function initFirebase() {


    var firebaseConfig = {
        /* cSpell:disable */

        apiKey: "AIzaSyBr_1j1aQLuxJn4mrMVn52TewOjHheCtWs",
        authDomain: "vks-raja.firebaseapp.com",
        projectId: "vks-raja",
        storageBucket: "vks-raja.appspot.com",
        messagingSenderId: "738565544109",
        appId: "1:738565544109:web:295e094d327050c2f40e24"
    };
    firebase.initializeApp(firebaseConfig);

    sendMailOverHTTP = firebase.app().functions('us-central1').httpsCallable('sendMailOverHTTP')


    /* cSpell:enable */

}

function validateEmail(email) {


    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    return re.test(String(email).toLowerCase());
}

