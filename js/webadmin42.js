let table = document.querySelector("#table tbody");
let modalTitle = document.getElementById("moduleTitle");
let modalShow = document.getElementById("modalShow");
let moduleTitle = document.getElementById("moduleTitle");
let tableBody = document.getElementById("table-body");
let modalTable = document.getElementById("table-aktors");
let status = document.getElementById("status");
let timeSatrt = document.getElementById("time-start");
let timeWork = document.getElementById("time-work");
let commandString = document.getElementById("commandString");
let refreshModal = document.getElementById("refresh-show");
let reloadModal = document.getElementById("reload-show");
let refreshBtn = document.getElementById("refresh");
let reloadBtn = document.getElementById("reload");
let closeBtn = document.getElementById("btn-close-popup");
let closeBtnRefresh = document.getElementById("close-btn-refresh");
let closeBtnReload = document.getElementById("close-btn-reload");
let popupFlag;
// Для проверки логики страницы (можно удалять)
let array = [{
        "name": "Mongo",
        "isAlive": true,
        "workload": 22,
        "ip": "192.168.0.3",
        "path": "/var/s42/work/Mongo",
        "startTime": 16473559840,
        "actionTime": 16475690784
    },
    {
        "name": "MeterProxy",
        "isAlive": false,
        "workload": 0,
        "ip": "192.168.0.3",
        "path": "/var/s42/work/MeterProxy ",
        "startTime": 16473559840,
        "actionTime": 16475690784
    },
    {
        "name": "PageController",
        "isAlive": true,
        "workload": 16,
        "ip": "192.168.0.3",
        "path": "/var/s42/server/PageController ",
        "startTime": 16473559840,
        "actionTime": 16475690784
    },
    {
        "name": "MeterBirth",
        "isAlive": true,
        "workload": 38,
        "ip": "192.168.0.3",
        "path": "/var/s42/server/MeterBirth",
        "startTime": 16473559840,
        "actionTime": 16475690784
    },
    {
        "name": "MeterProxy",
        "isAlive": false,
        "workload": 0,
        "ip": "192.168.0.3",
        "path": "/var/s42/work/MeterProxy ",
        "startTime": 16473559840,
        "actionTime": 16475690784
    },
    {
        "name": "MeterProxy",
        "isAlive": false,
        "workload": 0,
        "ip": "192.168.0.3",
        "path": "/var/s42/work/MeterProxy ",
        "startTime": 16473559840,
        "actionTime": 16475690784
    },
    {
        "name": "MeterProxy",
        "isAlive": false,
        "workload": 0,
        "ip": "192.168.0.3",
        "path": "/var/s42/work/MeterProxy ",
        "startTime": 16473559840,
        "actionTime": 16475690784
    },
    {
        "name": "MeterProxy",
        "isAlive": false,
        "workload": 0,
        "ip": "192.168.0.3",
        "path": "/var/s42/work/MeterProxy ",
        "startTime": 16473559840,
        "actionTime": 16475690784
    },
    {
        "name": "MeterProxy",
        "isAlive": false,
        "workload": 0,
        "ip": "192.168.0.3",
        "path": "/var/s42/work/MeterProxy ",
        "startTime": 16473559840,
        "actionTime": 16475690784
    },
    {
        "name": "MeterProxy",
        "isAlive": false,
        "workload": 0,
        "ip": "192.168.0.3",
        "path": "/var/s42/work/MeterProxy ",
        "startTime": 16473559840,
        "actionTime": 16475690784
    },
    {
        "name": "MeterProxy",
        "isAlive": false,
        "workload": 0,
        "ip": "192.168.0.3",
        "path": "/var/s42/work/MeterProxy ",
        "startTime": 16473559840,
        "actionTime": 16475690784
    },
    {
        "name": "MeterProxy",
        "isAlive": false,
        "workload": 0,
        "ip": "192.168.0.3",
        "path": "/var/s42/work/MeterProxy ",
        "startTime": 16473559840,
        "actionTime": 16475690784
    },
    {
        "name": "MeterProxy",
        "isAlive": false,
        "workload": 0,
        "ip": "192.168.0.3",
        "path": "/var/s42/work/MeterProxy ",
        "startTime": 16473559840,
        "actionTime": 16475690784
    }
];
let modalArray = [{
    "type": "Inserter",
    "name": "gasInserter",
    "all": 4,
    "active": 1
}, {
    "type": "Inserter",
    "name": "waterInserter",
    "all": 4,
    "active": 1
}, {
    "type": "Timer",
    "name": "timer",
    "all": 1,
    "active": 0
}, {
    "type": "Inserter",
    "name": "timer",
    "all": 1,
    "active": 0
}, {
    "type": "Timer",
    "name": "timer",
    "all": 1,
    "active": 0
}, {
    "type": "Inserter",
    "name": "timer",
    "all": 1,
    "active": 0
}, {
    "type": "Timer",
    "name": "timer",
    "all": 1,
    "active": 0
}, {
    "type": "Inserter",
    "name": "timer",
    "all": 1,
    "active": 0
}, {
    "type": "Timer",
    "name": "timer",
    "all": 1,
    "active": 0
}, {
    "type": "Inserter",
    "name": "timer",
    "all": 1,
    "active": 0
}, {
    "type": "Timer",
    "name": "timer",
    "all": 1,
    "active": 0
}, {
    "type": "Inserter",
    "name": "timer",
    "all": 1,
    "active": 0
}, {
    "type": "Timer",
    "name": "timer",
    "all": 1,
    "active": 0
}]

//Функция перевода времени из юникс формата
function convertFromUnixTime(timestamp, utc = false) {
    if (!timestamp) return "";
    let time = "";
    if (!utc) {
        let dt = new Date(timestamp * 1000);

        year = dt.getFullYear();
        month = ("0" + (dt.getMonth() + 1)).slice(-2);
        day = ("0" + dt.getDate()).slice(-2);
        hours = ("0" + dt.getHours()).slice(-2);
        minutes = ("0" + dt.getMinutes()).slice(-2);
        seconds = ("0" + dt.getSeconds()).slice(-2);
        time = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    } else {
        let dt = new Date(timestamp * 1000);

        year = dt.getUTCFullYear();
        month = ("0" + (dt.getUTCMonth() + 1)).slice(-2);
        day = ("0" + dt.getUTCDate()).slice(-2);
        hours = ("0" + dt.getUTCHours()).slice(-2);
        minutes = ("0" + dt.getUTCMinutes()).slice(-2);
        seconds = ("0" + dt.getUTCSeconds()).slice(-2);

        time = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    return time;
}

// Функция заполнения таблицы  истории действий пользователя
function showModuleTable(arr) {
    resetCellValue(1);
    let data;
    // Отрисовка таблицы
    // Ячейки таблицы
    for (let i = 0; i < arr.length; i++) {
        let div = document.createElement("div");
        let row = document.createElement("tr");
        let row_cell = document.createElement("td");
        let row_cell_1 = document.createElement("td");
        let row_cell_2 = document.createElement("td");
        let row_cell_3 = document.createElement("td");
        let row_cell_4 = document.createElement("td");
        let row_cell_5 = document.createElement("td");
        let row_cell_6 = document.createElement("td");
        let row_cell_7 = document.createElement("td");
        let row_cell_8 = document.createElement("td");
        let deleteBtn = document.createElement("button");
        let img = document.createElement("img");
        // Заполнение идет рядами так что это порядковый номер.
        row_cell.innerHTML = `${i + 1}`;
        row_cell.classList.add("cell", "cell_min", "text_white");
        row_cell.setAttribute("id", `number-row-${i}-cell`);
        // Заполняем таблицу
        data = arr[i];
        // Запоняем ячейки имя модуля
        row_cell_1.innerHTML = `${data.name}`;
        row_cell_1.classList.add("cell", "cell_min", "text_white", "td");
        row_cell_1.setAttribute("id", `module-row-${i}-cell`);
        // Запоняем ячейки Alive
        if (data.isAlive) {
            div.classList.add("green")
        } else {
            div.classList.add("red")
        }
        div.classList.add("cell", "cell_min", "text_white", "circle", "td");
        div.setAttribute("id", `alive-row-${i}-cell`);
        row_cell_2.append(div);
        // Заполняем ячейку ЗАГРУЗКА
        row_cell_3.innerHTML = `${data.workload}`;
        row_cell_3.classList.add("cell", "cell_min", "text_white", "td");
        row_cell_3.setAttribute("id", `load-row-${i}-cell`);
        // Заполняем ячейку IP
        row_cell_4.innerHTML = `${data.ip}`;
        row_cell_4.classList.add("cell", "cell_min", "text_white", "td");
        row_cell_4.setAttribute("id", `ip-row-${i}-cell`);
        // Заполняем ячейку Путь на диске
        row_cell_5.innerHTML = `${data.path}`;
        row_cell_5.classList.add("cell", "cell_min", "text_white", "td");
        row_cell_5.setAttribute("id", `path-row-${i}-cell`);
        // Заполняем ячейку Время Запуска
        row_cell_6.innerHTML = convertFromUnixTime(data.startTime);;
        row_cell_6.classList.add("cell", "cell_min", "text_white", "td");
        row_cell_6.setAttribute("id", `startTime-row-${i}-cell`);
        // Заполняем ячейку Время последней автивности
        row_cell_7.innerHTML = convertFromUnixTime(data.actionTime);
        row_cell_7.classList.add("cell", "cell_min", "text_white", "td");
        row_cell_7.setAttribute("id", `actionTime-row-${i}-cell `);
        // Заполняем ячейку delete
        deleteBtn.classList.add("cell", "cell_min", "cell__color_black", "cell__text_orange");
        deleteBtn.setAttribute("id", `deleteButton-row-${i}-cell`);
        deleteBtn.setAttribute("type", "button");
        deleteBtn.setAttribute("aria-label", "Close");
        deleteBtn.innerHTML = "&#935";
        row_cell_8.setAttribute("id", `cellDeleteButton-row-${i}-cell`);
        deleteBtn.appendChild(img);
        row_cell_8.appendChild(deleteBtn);

        // Вставка в Dom
        row.appendChild(row_cell);
        row.appendChild(row_cell_1);
        row.appendChild(row_cell_2);
        row.appendChild(row_cell_3);
        row.appendChild(row_cell_4);
        row.appendChild(row_cell_5);
        row.appendChild(row_cell_6);
        row.appendChild(row_cell_7);
        row.appendChild(row_cell_8);
        table.appendChild(row);
    }

}

// Функция открытия мдального окна
function showModalWindow(value) {
    let name = value.innerHTML;
    for (let i = 0; i < array.length; i++) {
        let data = array[i];
        if (name === data.name) {
            moduleTitle.innerHTML = `Модуль` + " " + data.name + " " + "(" + data.ip + data.path + ")" + "-" + data.workload + "%";
            status.innerHTML = data.isAlive ? "Активен" : "не Активен";
            timeSatrt.innerHTML = convertFromUnixTime(data.startTime);
            timeWork.innerHTML = "20 часов ";
            commandString.innerHTML = "командная строка";
        }
    }
    showAktors();
    modalShow.classList.add("popup_open")
}

// Функция заполнения таблицы в модальном окне 
function showAktors() {
    resetCellValue(2);
    let data;
    // Ячейки таблицы
    for (let i = 0; i < modalArray.length; i++) {
        let row = document.createElement("tr");
        let row_cell = document.createElement("td");
        let row_cell_1 = document.createElement("td");
        let row_cell_2 = document.createElement("td");
        let row_cell_3 = document.createElement("td");
        let row_cell_4 = document.createElement("td");
        // Заполнение идет рядами так что это порядковый номер.
        row_cell.innerHTML = `${i + 1}`;
        row_cell.classList.add("text_white");
        row_cell.setAttribute("id", `number-row-${i+1}-cell`);
        // Заполняем таблицу
        data = modalArray[i];
        // Запоняем ячейки тип актора
        row_cell_1.innerHTML = data.type;
        row_cell_1.classList.add("text_white");
        row_cell_1.setAttribute("id", `type-row-${i}-cell`);
        // Запоняем ячейки имя актора
        row_cell_2.innerHTML = data.name
        row_cell_2.classList.add("text_white");
        row_cell_2.setAttribute("id", `name-row-${i}-cell`);
        // Заполняем ячейку всего
        row_cell_3.innerHTML = data.all;
        row_cell_3.classList.add("text_white");
        row_cell_3.setAttribute("id", `all-row-${i}-cell`);
        // Заполняем ячейку активно
        row_cell_4.innerHTML = data.active;
        row_cell_4.classList.add("text_white");
        row_cell_4.setAttribute("id", `ip-row-${i}-cell`);
        // Вставка в Dom
        row.appendChild(row_cell);
        row.appendChild(row_cell_1);
        row.appendChild(row_cell_2);
        row.appendChild(row_cell_3);
        row.appendChild(row_cell_4);
        modalTable.appendChild(row);
    }
}

function resetCellValue(value) {
    if(value===1){table.innerHTML = "";}else{ modalTable.innerHTML = "";}  
}

// Функция удаленя элемента из таблицы  showModuleTable
function deleteRow(index) {
    let newArr = [];
    for (i = 0; i < array.length; i++) {
        if (index !== `${i}`) {
            newArr.push(array[i]);
        }
    }
    array = newArr;
    showModuleTable(newArr);
}

// Функция убирает полосу прокрутки при открытии модального окна
function hiddenOverflow() {
    $("body").css({
        "overflow": "hidden"
    })
}

// Функция закрытия попапов
// function popupClose() {
//     closeButtonPopoup;
// }

document.addEventListener("click", function(event) {
    let td = event.target.closest("td");
    if (!td) {
        return;
    } else {
        let id = td.getAttribute("id");
        let type = id.split("-");
        let name = type[0];
        if (name === "module") {
            showModalWindow(td);
        } else {
            if (name === "cellDeleteButton") {
                deleteRow(type[2]);
            }
        }
    }
});

reloadBtn.addEventListener("click", () => {
    reloadModal.classList.add("popup_open");
})
closeBtnReload.addEventListener("click", () => { reloadModal.classList.remove("popup_open"); })
closeBtnRefresh.addEventListener("click", () => { refreshModal.classList.remove("popup_open"); })
closeBtn.addEventListener("click", () => { modalShow.classList.remove("popup_open") })
refreshBtn.addEventListener("click", () => {
    refreshModal.classList.add("popup_open");
})

showModuleTable(array);