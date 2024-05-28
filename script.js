var main = document.getElementById("main")


function render() {
    const table = document.createElement("table");

    const count = 31;

    const arr = load();

    for (let i = 0; i < count + 1; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 2; j++) {

            switch (j) {
                case 0:
                    const th = document.createElement('th');
                    if (i == count) {
                        th.innerText = 'Tea:';
                    }
                    else {
                        th.innerText = i + 1;
                    }
                    tr.appendChild(th);
                    break;
                case 1:
                    let innerHTML = '';

                    if (arr != undefined) {
                        for (let index = 0; index < arr[i].length; index++) {
                            const elem = arr[i][index];
                            if (index == 0) {
                                innerHTML = `<th class="sum">${elem}</th>`;
                            }
                            else {
                                innerHTML = `<th><input type="number" data-row="${i}" value=${elem}></th>`;
                            }
                            tr.insertAdjacentHTML('beforeend', innerHTML);                            
                        }
                        break;
                    }
                    else {
                        innerHTML += '<th class="sum">0</th>';
                        innerHTML += `<th><input type="number" data-row="${i}"></th>`;

                        tr.insertAdjacentHTML('beforeend', innerHTML);
                    }
                    break;
            }
            
        }
        table.appendChild(tr);
    }
    
    table.insertAdjacentHTML('afterbegin', '<tr><th>Date:</th><th>Money:</th></tr>');
    main.appendChild(table);
    table.insertAdjacentHTML('beforeend', '<tr><th>Sum:</th><th class="sum">0</th><th><span class="precent"></span></th></tr>');

    document.querySelectorAll('input[type="number"]').forEach(e => {
        e.addEventListener('input', onchange);
    });


}

function onchange(e) {
    const sumRow = document.querySelectorAll('.sum')[e.target.dataset.row];
    const nodes = sumRow.parentNode.childNodes;

    let sum = 0;
    nodes.forEach((elem, i) => {
        if (i >= 2 && elem.firstChild.value != '') {
            sum += parseInt(elem.firstChild.value);
        }
    });
    sumRow.innerText = sum;

    const sums = document.querySelectorAll('.sum')
    sum = 0;
    sums.forEach((e, i) => {
        if (i != sums.length - 1) {
            sum += parseInt(e.innerText);
        }
    });
    sums[sums.length - 1].innerText = sum;

    document.querySelector('.precent').innerText = ((sum / 100) * 45).toFixed(2);


    if (nodes[nodes.length - 1].firstChild == e.target) {
        const th = document.createElement('th');

        const input = document.createElement('input');
        input.type = "number";
        input.dataset.row = e.target.dataset.row;
        input.addEventListener('input', onchange);

        th.appendChild(input);
        sumRow.parentNode.appendChild(th);
    }
    
    save();
}

function save() {
    let saveArr = [];
    const sumArr = document.querySelectorAll('.sum');
    
    sumArr.forEach(e => {
        const elem = e.parentNode;
        let arr = [];
        arr.push(elem.childNodes[1].innerText);
        elem.childNodes.forEach((e, i) => {
            if (i >= 2) {
                arr.push(e.firstChild.value);
            }
        });
        saveArr.push(arr);
    })

    localStorage.setItem("save", JSON.stringify(saveArr))
}
function load() {
    if (localStorage.getItem("save") == undefined)
        return undefined;

    var arr = JSON.parse(localStorage.getItem("save"));
    return arr;
}

document.querySelector('.clear').addEventListener('click', e => {
    if (confirm("Точно видалити?")) {
        localStorage.clear();
        location.reload();
    }
});

render()