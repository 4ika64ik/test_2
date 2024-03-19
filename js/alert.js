function showNotification() {
    // Отобразить уведомление
    var notification = document.getElementById("notification");
    notification.style.display = "block";

    // Скрыть уведомление через 5 секунд
    setTimeout(function() {
        notification.style.display = "none";
    }, 5000);
}

setInterval(showNotification, 4000);
