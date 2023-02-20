let swRegistration
const check = () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No Service Worker support!')
    }
    if (!('PushManager' in window)) {
      throw new Error('No Push API Support!')
    }
  }

const registerServiceWorker = async () => {
    console.log('reg')
    const swRegistration = await navigator.serviceWorker.register('service.js'); //notice the file name
    return swRegistration;
}

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    console.log(permission)
    if(permission !== 'granted'){
        throw new Error('Permission not granted for Notification');
    }
}

const showLocalNotification = (title, body, swRegistration) => {
    const options = {
        body,
        icon: "./icon/push.jpeg",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: "vibration-sample",
    };
    swRegistration.showNotification(title, options);
}

const handleNotifBtn = async () => {
    try {
        const permission =  await requestNotificationPermission();
    } finally {
        setTimeout(() => showLocalNotification('title', 'test', swRegistration),1000)
    }


}

window.onload = () => {
    const notifBtn = document.getElementById('notifbtn')
    notifBtn.onclick = handleNotifBtn
}

const main = async () => {
    check();
    swRegistration = await registerServiceWorker();
    console.log(swRegistration)
    console.log('test')

    
}

main();