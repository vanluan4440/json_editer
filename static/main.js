const domain = 'http://192.168.1.8:5000'

const URLDATA = '/api/titles'

const URL_PADDING = '/getPadding'

const URL_RECORD_PADDING = '/getRecordPage'

const keyTitle = 'jpk'

const keyPadding = 'jkp'

const keyPage = 'pkv'


function SetDataLocal(name, data) {
    localStorage.setItem(`${name}`, JSON.stringify(data))
}

function checkLocal(data, key) {
    if (localStorage.getItem(`${key}`) !== undefined) {
        SetDataLocal(`${key}`, data)
    } else {
        localStorage.removeItem(`${key}`)
        getTitles()
        getPadding()
    }
}

async function getTitles() {
    const page = localStorage.getItem(`${keyPage}`)
    const url = domain + URL_RECORD_PADDING + `?page=${page}`
    const response = await fetch(url, { method: 'POST' });
    var data = await response.json();
    if (data) {
        //checkLocal(data['record'], keyTitle)
        //renderTitle(data['record'])
        getPadding()
        loading(data['record'])



    } else {
        console.error('get data flase ', url);
    }
}

async function getPadding() {
    const url = domain + URL_PADDING
    const response = await fetch(url, { method: 'POST' });
    var data = await response.json();
    if (data) {
        // checkLocal(data, keyPadding)
        renderPage(data['total'])
    } else {
        console.error('get data flase ', url);
    }
}
//run function
getTitles()

//jquery

function getDataLocal(name) {
    const data = localStorage.getItem(`${name}`)
    return JSON.parse(data)
}

function routeDetail(data) {
    window.location.replace(`/file?name=${data}`)
}

function renderTitle(data) {
    for (let index = 0; index < data.length; index++) {
        // console.log(data[index]);
        let el_item =
            `
        <div class="col">
                        <div class="card shadow-sm">
                            <svg id="thumbnail" class="bd-placeholder-img card-img-top" width="100%" height="145" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${data[index]}" focusable="false"><title>${data[index]}</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">${data[index]}</text></svg>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" onclick="routeDetail('${data[index]}')" class="btn btn-sm btn-outline-success">View</button>
                                    </div>     
                                </div>
                            </div>
                        </div>
                    </div>
        `
        $("#body").append(el_item)
    }
}



function setPage(number) {
    localStorage.setItem(`${keyPage}`, number)
        // const titles = getDataLocal(`${keyTitle}`)
        // renderTitle(titles)
}

function renderPage(data) {
    for (let index = 1; index <= data; index++) {
        let el = `
        <li class="page-item"><a class="page-link" onclick="setPage('${index}')" href="?page=${index}">${index}</a></li>
        `
        $(".pagination").append(el)
    }
}

function loading(data) {
    $('#padding').hide()
    $('.loading').show()
    setTimeout(() => {
        $('.loading').hide()
        $('#padding').show()
        renderTitle(data)
    }, 1000)
}

$(document).ready(function() {
    const titles = getDataLocal(`${keyTitle}`)
    const page = getDataLocal(`${keyPadding}`)
        // render Title
        // renderTitle(titles)
        // renderPage(page['total'])

    $('.loading').hide()

});