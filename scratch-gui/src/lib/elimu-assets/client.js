//import io from "socket.io-client";
const uniqid = require('uniqid');

let socket = null;
let eventoName = '';
let state = '';
let loaded = null;
let uId = uniqid();
let queue = [];

window.nickName = null;


// window.addEventListener("load", () => {
//     //socket = io("https://elimu-analyzer.herokuapp.com/");
//     while (!socket) { }
//     socket.emit('setUrl', {
//         url: window.location.pathname.substring(1),
//         id: uId
//     });
//     while (queue.length > 0) {
//         let offlineData = queue.shift();
//         socket.emit('newState', offlineData);
//     }
// });

// window.addEventListener("online", () => {
//     socket = io("https://elimu-analyzer.herokuapp.com/");
//     while (!socket) { }
//     socket.emit('setUrl', {
//         url: window.location.pathname.substring(1),
//         id: uId
//     });
//     while (queue.length > 0) {
//         let offlineData = queue.shift();
//         socket.emit('newState', offlineData);
//     }
// });

let eventWrapper = function (eventName) {
    return function () {
        eventoName = eventName;
        state = this;
    }
}

var callNewState = function (eventName, vm) {
    let xml = window.xml;
    newState(eventName, vm, xml);
}

let newState = function (event, vm, xml) {
    let serializer = new XMLSerializer();
    let newXml = serializer.serializeToString(xml);
    // if (socket && loaded && navigator.onLine) {
    //     socket.emit('newState', {
    //         nickName: window.nickName,
    //         event: event,
    //         jsonState: vm.toJSON(),
    //         targetId: vm.editingTarget['id'],
    //         xmlState: newXml
    //     });
    // }
    console.log({
        nickName: window.nickName,
        event: event,
        jsonState: vm.toJSON(),
        targetId: vm.editingTarget['id'],
        xmlState: newXml
    })
    if (!navigator.onLine) {
        queue.push({
            nickName: window.nickName,
            event: event,
            jsonState: vm.toJSON(),
            targetId: vm.editingTarget['id'],
            xmlState: newXml
        })
    }
    loaded = true;
}

export default {
    newState() {
        callNewState(eventoName, state);
    },
    bindEvents(vm) {
        vm.on("MONITORS_UPDATE", eventWrapper("MONITORS_UPDATE"));
        vm.on("BLOCK_DRAG_UPDATE", eventWrapper("BLOCK_DRAG_UPDATE"));
        vm.on("TURBO_MODE_ON", eventWrapper("TURBO_MODE_ON"));
        vm.on("TURBO_MODE_OFF", eventWrapper("TURBO_MODE_OFF"));
        vm.on("PROJECT_RUN_START", eventWrapper("PROJECT_RUN_START"));
        vm.on("PROJECT_RUN_STOP", eventWrapper("PROJECT_RUN_STOP"));
        vm.on("targetsUpdate", eventWrapper("targetsUpdate"));
        vm.on("PROJECT_START", eventWrapper("PROJECT_START"));
    }
}