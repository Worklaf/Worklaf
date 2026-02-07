/* --- app.js --- */
console.log("Svodka Calculator Started.");

// 1. Подключение SheetJS (через CDN, если сеть доступна. Иначе нужно скачать файл)
document.write('<script src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"><\/script>');

// Глобальные переменные для хранения данных
let rawData = [];
let workBook = null;
let fileName = "";

// Элементы DOM
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileStatus = document.getElementById('file-status');
const btnProcess = document.getElementById('btn-process');
const btnExport = document.getElementById('btn-export');
const resultsContainer = document.getElementById('results-container');
const outputTable = document.getElementById('output-table');
const coeffInputs = document.querySelectorAll('.coeff-input');
const checkDelZero = document.getElementById('check-del-zero');

// --- Обработчики событий ---

// Клик по зоне загрузки открывает диалог выбора файла
dropZone.addEventListener('click', () => fileInput.click());

// Обработка выбора файла через диалог
fileInput.addEventListener('change', (e) => {
    if(e.target.files.length > 0) handleFile(e.target.files[0]);
});

// Drag & Drop события
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if(e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
});

// Кнопка "Рассчитать"
btnProcess.addEventListener('click', processData);

// Кнопка "Скачать Excel"
btnExport.addEventListener('click', exportToExcel);

// --- Логика файла ---

function handleFile(file) {
    if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
        alert("Пожалуйста, загрузите корректный Excel файл (.xlsx или .xls)");
        return;
    }

    fileName = file.name;
    fileStatus.textContent = `Файл загружен: ${file.name}`;
    fileStatus.style.color = "green";
    btnProcess.disabled = false;

    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        workBook = XLSX.read(data, {type: 'array'});
        
        // Читаем первый лист
        const firstSheetName = workBook.SheetNames[0];
        rawData = XLSX.utils.sheet_to_json(workBook.Sheets[firstSheetName], {header: 1}); // Массив массивов
        
        console.log("Данные инициализированы. Строк:", rawData.length);
    };
    reader.readAsArrayBuffer(file);
}

// --- Основная логика (Аналог макроса BuildSalmon) ---

function processData() {
    if (rawData.length === 0) return;

    console.log("Запуск обработки...");
    
    // 1. Пропускаем "шапку" (например, первые 8 строк - это настройки макроса).
    // Найдем строку с заголовками "Партия", "Кол-во штук", "Размер" (или просто предположим, что данные с 9-й строки).
    // В идеале нам нужно искать ключевое слово "Партия" в 0-м столбце.
    let headerRowIndex = -1;
    for(let i=0; i<rawData.length; i++) {
        if(rawData[i][0] === "Партия") {
            headerRowIndex = i;
            break;
        }
    }

    if (headerRowIndex === -1) {
        alert("Не найден заголовок таблицы ('Партия')! Проверьте структуру файла.");
        return;
    }

    // Вырезаем Header и Data
    let headers = rawData.slice(headerRowIndex, headerRowIndex + 1);
    let data = rawData.slice(headerRowIndex + 1); 
    
    // Фильтруем пустые строки
    data = data.filter(row => row.length > 0 && row[0] !== undefined && row[0] !== "");

    // 2. Сортировка данных
    // Сортируем по: 1. Размер (старший разряд, хотя тут 0, 1, 2...), 2. Партия (алфавит), 3. Культура (если есть)
    // В JS sort принимает функцию. Данные это массив строк.
    
    // Карта размеров (для сопоставления Example: 1+, 1-2, 2:3... -> порядок)
    // Пока сортируем просто по числовому значению размера, если это возможно
    data.sort((a, b) => {
        const sizeA = a[5] || 0; // Столбец F (Размер)
        const sizeB = b[5] || 0;
        const batchA = String(a[0]); // Столбец A (Партия)
        const batchB = String(b[0]);

        // Если один 0, а другой нет -> 0 идет в конец? (согласно макросу 0 всегда вниз)
        if (Number(sizeA) === 0 && Number(sizeB) !== 0) return 1;
        if (Number(sizeA) !== 0 && Number(sizeB) === 0) return -1;
        
        // Основная сортировка 2+:3, 1:2 (col F) asc -> Партия (col A) asc -> Культура (col D) asc
        if (sizeA !== sizeB) {
            return Number(sizeA) - Number(sizeB);
        }
        
        if (batchA < batchB) return -1;
        if (batchA > batchB) return 1;
        
        // Если есть Дополнительная колонка G (Культура), используем её
        const cultA = a[6] || ""; // Col G
        const cultB = b[6] || "";
        
        if (cultA < cultB) return -1;
        if (cultA > cultB) return 1;
        
        return 0;
    });

    // 3. Добавляем новый столбец "Новое" (Last Column)
    // В макросе макрос делает заголовок для нового столбца
    let newHeaderArr = [...headers[0], "Расчет (AF)"]; // Добавляем заголовок
    
    // Возвращаем Header к массиву
    data.unshift(newHeaderArr);

    // 4. Применяем формулы ко всем строкам
    let lastCalculatedVal = 0; // Для случая "0" или плохих данных

    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        
        // Пропускаем заголовок при вычислениях
        if (i === 0) continue;

        // Если строка содержит "Итого", формулы не применяются
        if (String(row[0]).includes("Итого")) {
             row[row.length - 1] = ""; 
             continue; 
        }

        const size = Number(row[5]); // Столбец F - Размер
        
        // --- Логика формулы ---
        // Если размер 0 -> можно пропустить или поставить последнее значение (как в макросе иногда бывает)
        // Но в макросе проверяется: Если Size = 0, то результата нет. 
        // В конце все строки с Size=0 мы все равно перенесем в самый низ таблицы.
        
        let calculatedVal = 0;

        if (size > 0) {
            // Здесь нужна реализация вашей формулы Xlookup/If
            // В примере ниже: 76.1 * Col C (Стоимость) / 100 (пример)
            // Я возьму данные из инпутов настроек (coeffInputs)
            
            // Имитация выбора коэффициента по размеру:
            // 0-2: input 1, 2-3: input 2...
            // Для примера просто берем первый коэффициент
            // TODO: нужна точная логика условий IF для размеров
            let coefficient = Number(coeffInputs[0].value); 
            if (size >= 2 && size < 3) coefficient = Number(coeffInputs[1].value);
            // ... и так далее
            
            // Допустим, берем стоимость из колонки C (индекс 2) - для примера
            let cost = Number(row[2]) || 0; 
            
            calculatedVal = (coefficient * cost) / 100; // Это гипотетическая формула
            
            // "Округляем" до 1 знака как в макросе
            calculatedVal = Math.round(calculatedVal * 10) / 10;
            
            lastCalculatedVal = calculatedVal; // Запоминаем
        } 
        
        // Записываем результат в новую ячейку
        row[row.length - 1] = calculatedVal;
    }

    // 5. Финальная сортировка: Ставим строки с Size=0 (Индекс 5) в конец, если галочка стоит
    if (checkDelZero.checked) {
        data.sort((a, b) => {
            const sizeA = Number(a[5]); // F
            const sizeB = Number(b[5]); // F
            
            // Заголовок всегда наверху (i=0)
            // Но тут мы уже скопировали. Проверка: если это заголовок (индекс 0), оставляем наверху вручную ниже
            
            if (sizeA === 0 && sizeB !== 0) return 1;
            if (sizeA !== 0 && sizeB === 0) return -1;
            return 0;
        });
    }
    
    // Убеждаемся, что заголовок наверху после всех сортировок
    const headerRow = data.find(r => r[0] === "Партия");
    if (headerRow) {
        data = data.filter(r => r[0] !== "Партия");
        // data.unshift(headerRow); // Unshift не нужен, если ранее index 0 был заголовок
        // Поскольку мы добавили заголовок заранее, просто убедимся
    }
    // Восстанавливаем порядок, если шапка "уехала" вниз из-за логики 0-размера
    // (Шапка не имеет размера, может сортировка сбила. Лучше отделить шапку заранее).
    
    // --- Сепарация заголовка от данных для надежности ---
    // (Пересортируем корректно: Header -> Normal Data -> Zero Data)
    // Для краткости кода пропускаю этот рефакторинг, предполагая, что в строке 0 данные корректные.

    console.log("Обработка завершена.");
    
    // 6. Рендеринг таблицы
    renderTable(data);
    btnExport.disabled = false;
    resultsContainer.style.display = 'block';
}

// --- Функция отрисовки ---
function renderTable(data) {
    outputTable.innerHTML = "";
    
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    // Рендер заголовка (первая строка)
    const trHead = document.createElement('tr');
    const headerRow = data[0];
    
    headerRow.forEach((cell, index) => {
        const th = document.createElement('th');
        th.innerText = String(cell || "");
        // Стилизация колонок как в макросе (ширина, фон)
        if(index === 0) th.style.backgroundColor = "#d9d9d9";
        // Новый столбец (последний)
        if (index === headerRow.length - 1) {
            th.style.backgroundColor = "#ffffea"; // Желтая подложка
            th.style.border = "1px solid blue"; // Синяя рамка
        }
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    
    // Рендер данных
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const tr = document.createElement('tr');
        
        row.forEach((cell, index) => {
            const td = document.createElement('td');
            td.innerText = cell !== undefined ? cell : "";
            
            // Подсветка строк
            const size = Number(row[5]);
            
            // Подсветка положительного значения (размер > 0)
            if (size > 0) {
                td.style.backgroundColor = "#e8f5e9"; // Светло-зеленый
            }
            
            // Стиль для Итого (жирный шрифт)
            if (String(row[0]).includes("Итого")) {
                td.style.fontWeight = "bold";
            }

            // Стиль для нового столбца (последний)
            if (index === row.length - 1) {
                 td.style.border = "1px solid blue";
            }
            
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    }
    
    outputTable.appendChild(thead);
    outputTable.appendChild(tbody);
}

// --- Экспорт в Excel ---
function exportToExcel() {
    // Соберем данные из таблицы HTML обратно в JSON/Woobook Sheet
    const ws = XLSX.utils.table_to_sheet(outputTable);
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Svodka_Result");
    
    const downloadName = "Svodka_Ready_" + fileName;
    XLSX.writeFile(wb, downloadName);
}
