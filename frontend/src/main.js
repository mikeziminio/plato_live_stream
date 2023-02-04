'use strict';

/*
const remoteClientId = 0;
const signalingChannel = new SignallingChannel(remoteClientId)
*/

/** @type {WebSocket} */
let ws;

function initSignalingChannel() {
    return new Promise((resolve, reject) => {
        ws = new WebSocket('ws://localhost:8080');

        ws.onerror = (e) => {
            console.log('signalling channel (ws) error: ', e);
        }

        ws.onopen = (e) => {
            console.log('signalling channel (ws) is open: ', e);
            resolve();
        };
    });
}

async function makeCall() {
    const configuration = {};
    const peerConnection = new RTCPeerConnection(configuration);
    /*
    signalingChannel.addEventListener('message', async (message) => {
        if (message.answer) {
            const remoteDescription = new RTCSessionDescription(message.answer);
            await peerConnection.setRemoteDescription(remoteDescription);
        }
    });
    */
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log(JSON.stringify(offer, null, 4));

    ws.onmessage = (e) => {
        console.log('Получено сообщение: ', e.data);
    }

    ws.send({ offer });

}


async function getAvailableDevices() {
    const devices = await window.navigator.mediaDevices.enumerateDevices();
    const audioDevices = devices.filter(d => d.kind === 'audioinput');
    const videoDevices = devices.filter(d => d.kind === 'videoinput');
    return { audioDevices, videoDevices };
}

async function initDeviceLists() {
    const devices = await getAvailableDevices();

    console.log(devices);
    
    const audioSelect = document.querySelector('.audio-device-list');
    devices.audioDevices.forEach(d => {
        const option = document.createElement('option');
        option.value = d.deviceId;
        option.innerHTML = 'Девайс ' + d.label;
        audioSelect.appendChild(option);
    });

    const videoSelect = document.querySelector('.video-device-list');
    devices.videoDevices.forEach(d => {
        const option = document.createElement('option');
        option.value = d.deviceId;
        option.innerHTML = 'Девайс ' + d.label;
        videoSelect.appendChild(option);
    });
}

async function addCamera(e) {
    const video = document.querySelector('.left-side video');
    console.log('camera');
    try {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        });
        /*
        const videoTracks = stream.getVideoTracks();
        const audioTracks = stream.getAudioTracks();
        */
        video.srcObject = stream;

    } catch (e) {
        console.error(e);
        /*
        if (error.name === 'OverconstrainedError') {
            const v = constraints.video;
            errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
          } else if (error.name === 'NotAllowedError') {
            errorMsg('Permissions have not been granted to use your camera and ' +
              'microphone, you need to allow the page access to your devices in ' +
              'order for the demo to work.');
          }
          errorMsg(`getUserMedia error: ${error.name}`, error);
        */
    }
}

function run() {
    console.log('run');
}

document.addEventListener("DOMContentLoaded", async () => {
    // document.querySelector('.camera-button').addEventListener('click', addCamera);
    await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    await initDeviceLists();

    await addCamera();

    await initSignalingChannel();
    await makeCall();
    
    // run();
    
    /*
    const routes = {
        '/': Main.init,
        '/output/:id/': Output.init
    };
    handleRouting();
    */
});