// العناصر الأساسية
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const fileList = document.getElementById('fileList');

// --------- زر اختيار الملفات ---------
browseBtn.addEventListener('click', () => {
    fileInput.click();
});

// --------- عند تغيير الملفات المختارة ---------
fileInput.addEventListener('change', () => {
    fileList.innerHTML = ''; // مسح القائمة السابقة
    const files = fileInput.files;

    for (let i = 0; i < files.length; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.textContent = files[i].webkitRelativePath || files[i].name;
        a.href = URL.createObjectURL(files[i]);
        a.target = "_blank"; // يفتح الملف في نافذة جديدة
        li.appendChild(a);
        fileList.appendChild(li);
    }

    // حفظ الملفات بعد الاختيار
    saveFiles(files);
});

// --------- دالة لحفظ الملفات في localStorage ---------
function saveFiles(files) {
    // استرجاع الملفات المحفوظة مسبقًا
    let items = JSON.parse(localStorage.getItem('myFiles') || '[]');
    let loaded = 0;

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            items.push({
                name: files[i].name,
                data: e.target.result
            });

            loaded++;
            // بعد تحميل كل الملفات، نحفظها في localStorage
            if (loaded === files.length) {
                localStorage.setItem('myFiles', JSON.stringify(items));
            }
        };
        reader.readAsDataURL(files[i]);
    }
}

// --------- دالة لتحميل الملفات المحفوظة وعرضها ---------
function loadFiles() {
    const savedItems = JSON.parse(localStorage.getItem('myFiles') || '[]');
    fileList.innerHTML = '';

    savedItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.href = item.data;
        a.textContent = item.name;
        a.target = "_blank";
        li.appendChild(a);
        fileList.appendChild(li);
    });
}

// --------- حفظ دوري كل 30 ثانية إذا كانت هناك ملفات ---------
setInterval(() => {
    if (fileInput.files.length > 0) {
        saveFiles(fileInput.files);
    }
}, 30000);

// --------- تحميل الملفات المحفوظة عند بدء الصفحة ---------
loadFiles();

// --------- زر التمرير إلى القسم الثاني ---------
document.getElementById('scrollBtn').addEventListener('click', () => {
    const section = document.getElementById('section2');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
});


