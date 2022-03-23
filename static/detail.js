const domain = 'http://192.168.1.8:5000'

const URL_FILE = "/getDetailFile"

const URL_GET_TYPE_MIC = "/getTypeMic"

const URL_GET_OBJ_MIC = '/getOjectMicDetail'

const URL_hotword = '/get_hotword'

const URL_get_obj_hotword = '/get_obj_hotword'

const led_off_color = 'led_off_color'
const led_wakeup_color = 'led_wakeup_color'

const getOject_hotword_engine = '/getOject_hotword_engine'

const filename = new URL(location.href).searchParams.get("name");



$(document).ready(() => {
    const file = new URL(location.href).searchParams.get("name");

    getDetail(file)
    getTypeMic()

    $('#type-mic').hide()
    $('#type_hotword_engine').hide()
    $('#type_hotword').hide()

    $('#type-mic').on('change', () => {
        const type_change = $('#type-mic').find(":selected").val()
        $('#body').empty()
        getOjectMicDetail(type_change)
    })

    $('#type_hotword_engine').on('change', () => {
        const type_hotword_engine = $('#type_hotword_engine').find(":selected").val()
        $('#body').empty()
        getOjectHotwordEngine(type_hotword_engine)
    })
    $('#type_hotword').on('change', () => {
        const type_hotword = $('#type_hotword').find(":selected").val()
        $('#body').empty()
        get_obj_hotword(type_hotword)
    })
})

async function getDetail(file) {
    const url = domain + URL_FILE + `?name=${file}`
    const response = await fetch(url, { method: 'POST' });
    var data = await response.json();
    if (data) {
        console.log(data);
        renderTemplates(data)
        render_volume(data)
        render_hotword_engine(data)
    } else {
        console.error('get data flase ', url);
    }
}
async function getOjectMicDetail(type) {
    const url = domain + URL_GET_OBJ_MIC + `?type=${type}`
    const response = await fetch(url, { method: 'POST' });
    var data = await response.json();
    if (data) {
        renderMic(data)
    } else {
        console.error('get data flase ', url);
    }
}

async function getOjectHotwordEngine(type) {
    const url = domain + getOject_hotword_engine + `?type=${type}`
    const response = await fetch(url, { method: 'POST' });
    var data = await response.json();
    if (data) {
        render_detail_hotword_engine(data)
    } else {
        console.error('get data flase ', url);
    }
}

async function getTypeMic() {
    const url = domain + URL_GET_TYPE_MIC
    const response = await fetch(url, { method: 'POST' });
    var data = await response.json();
    if (data) {
        checkType(filename, data)
    } else {
        console.error('get data flase ', url);
    }
}


async function get_hotword(file) {
    const url = domain + URL_hotword
    const response = await fetch(url, { method: 'POST' });
    var data = await response.json();
    if (data) {
        //console.log(data);
        render_hotword(data)
    } else {
        console.error('get data flase ', url);
    }
}

///get_obj_hotword
async function get_obj_hotword(file) {
    const url = domain + URL_get_obj_hotword + `?type=${file}`
    const response = await fetch(url, { method: 'POST' });
    var data = await response.json();
    if (data) {
        // console.log(data);
        render_detail_hotword(data)
    } else {
        console.error('get data flase ', url);
    }
}

function checkType(input, data) {
    switch (input) {
        case 'mic':
            // code block
            $('#type-mic').show()
            console.log('mic');
            //render_mic(data)
            render_type_mic(data)
            break;
        case 'volume':
            // code block
            console.log('volume');
            //getDetail(filename)
            break;

        case 'hotword_engine':
            console.log('hotword_engine');
            $('#type_hotword_engine').show()
                // code block
            break;
        case 'hotword':
            console.log('hotword');
            $('#type_hotword').show()
            get_hotword(filename)

            // code block
            break;
        case 'continuous_asking':
            console.log('continuous_asking');
            // code block
            break;
        case 'local_stt':
            console.log('local_stt');
            // code block
            break;
        case 'local_tts':
            console.log('local_tts');
            // code block
            break;
        case 'playback_time':
            console.log('playback_time');
            // code block
            break;
        case 'internet_timeout':
            console.log('internet_timeout');
            // code block
            break;
        case 'check_url':
            console.log('check_url');
            // code block
            break;
        case 'server':
            console.log('server');
            // code block
            break;
        case 'button_data':
            console.log('button_data');
            // code block
            break;
        case 'smh_skill':
            console.log('smh_skill');
            // code block
            break;
        case 'incrase_volume':
            console.log('incrase_volume');
            // code block
            break;
        case 'decrase_volume':
            console.log('decrase_volume');
            // code block
            break;
        case 'pause':
            console.log('pause');
            // code block
            break;
        case 'continue':
            console.log('continue');
            // code block
            break;
        case 'reply':
            console.log('reply');
            // code block
            break;
        case 'next':
            console.log('next');
            // code block
            break;
        case 'exit':
            console.log('exit');
            // code block
            break;
        default:
            // code block
            console.log('null');
    }
}


function renderTemplates(data) {
    data.forEach(element => {
        //checkType(filename, element)
        //console.log(element);
        // for (const item in element) {
        //     //switchCase(element[item], item, total)
        //     checkType(filename, item)
        // }
    });
    //console.log(total);
}

function render_type_mic(data) {
    data.forEach((element, index) => {
        // console.log(element['active']);
        let el = ''
        if (element['active'] == true) {
            el = `<option value="${element['type']}" selected>${element['type']}</option> `
            getOjectMicDetail(element['type'])

        } else {
            el = `<option value="${element['type']}">${element['type']}</option>`
        }
        $('#type-mic').append(el)

    });

}

function renderMic(data) {
    for (const item in data) {
        //console.log(item);
        if (data[item] == true && data[item] !== '') {
            el = `
            <div class="alert alert-dark" role="alert">
            ${item} : 
            <select class="custom-select">
            <option selected>${data[item]}</option>
            <option value="1">false</option>
            </select>
            </div>
            `
        } else if (data[item] == false && data[item] !== '') {
            el = `
            <div class="alert alert-dark" role="alert">
            ${item} : 
            <select class="custom-select">
            <option selected>${data[item]}</option>
            <option value="1">true</option>
            </select>
            </div>
            `
        } else if (checkString(item, 'color') == true) {
            el = `
            <div class="alert alert-dark" role="alert">
            ${item} : 
            <input type="color" class="form-control" value="#076e3e">
            </div>
            
            `
        } else if (checkString(item, 'mode') == true) {

            el = `
            <div class="alert alert-dark" role="alert">
            ${item} :
            <select class="custom-select">
                ${renderSelectNumber(0,9)}
            </select>
            </div>
            
            `
        } else {
            el = `
            <div class="alert alert-dark" role="alert">
            ${item} : ${data[item]}
            </div>
            
            `
        }

        $('#body').append(el)
    }
}


function checkString(str, check) {
    return `${str}`.includes(`${check}`)
}

function renderSelectNumber(start, end) {
    let str = ''
    for (let index = start; index <= end; index++) {
        str += `<option value='${index}' selected>${index}</option>`
    }
    return str
}

function render_volume(data) {
    data.forEach(element => {
        if (filename == 'volume') {
            el =
                `
        <div class="alert alert-dark" role="alert">
        ${element['type']} </br>
        <input type="range" min="0" value="${element['value']}" max="100" step="1">
        </div>
        `
            $('#body').append(el)
        }


    });
}

function render_hotword_engine(data) {
    data.forEach(element => {
        let el = ''
        if (element['is_active'] == true && filename == 'hotword_engine') {
            el = `<option value="${element['name']}" selected>${element['name']}</option> `
                // getOjectMicDetail(element['type'])
            getOjectHotwordEngine(element['name'])

        } else {
            el = `<option value="${element['name']}">${element['name']}</option>`
        }
        $('#type_hotword_engine').append(el)
    });
}

function render_detail_hotword_engine(data) {
    for (const item in data) {
        if (data[item] == true) {
            el = `
            <div class="alert alert-dark" role="alert">
            ${item} : 
            <select class="custom-select">
            <option selected>${data[item]}</option>
            <option value="1">false</option>
            </select>
            </div>
            `
        } else if (data[item] == false) {
            el = `
            <div class="alert alert-dark" role="alert">
            ${item} : 
            <select class="custom-select">
            <option selected>${data[item]}</option>
            <option value="1">true</option>
            </select>
            </div>
            `
        } else if (item == "porcupine_access_key") {
            el = `
            <div class="alert alert-dark" role="alert">
            ${item} </br>
            <input type="text" class="form-control" placeholder="${data[item]}" value="${data[item]}">
            </div>
            `
        } else {

            el = `
        <div class="alert alert-dark" role="alert">
        ${item}: ${data[item]}
        </div>
        
        `
        }


        $('#body').append(el)
    }
}

function render_hotword(data) {
    data.forEach(element => {
        if (filename == 'hotword') {
            if (element == 'porcupine') {
                el = `<option value="${element}" selected>${element}</option> `
                get_obj_hotword(element)
            } else {
                el = `<option value="${element}">${element}</option>`
            }

        }
        $('#type_hotword').append(el)

    });
}

function render_detail_hotword(data) {
    data.forEach(element => {
        if (element['is_active'] == true) {
            el = `
            <div class="alert alert-dark" role="alert">
            is_active :
            <select class="custom-select">
            <option value='false' selected>false</option>
            <option value="1">true</option>
            </select>
            <hr>
            file_name: </br>
            <input type="text" class="form-control" id="exampleInputEmail1" value="${element['file_name']}"  placeholder="${element['file_name']}">
            <hr>
            sensitive</br>
            <input type="number" class="form-control" id="exampleInputEmail1" value="${element['sensitive']}"  min="0.1" max="1" step="0.1">
            </div>
            `
        } else if (element['is_active'] == false) {
            el = `
            <div class="alert alert-dark" role="alert">
            is_active :
            <select class="custom-select">
            <option value='true' selected>true</option>
            <option value="flase">flase</option>
            </select>
            <hr>
            file_name: </br>
            <input type="text" class="form-control" id="exampleInputEmail1" value="${element['file_name']}"  placeholder="${element['file_name']}">
            <hr>
            sensitive</br>
            <input type="number" class="form-control" id="exampleInputEmail1" value="${element['sensitive']}"  min="0.1" max="1" step="0.1">
            </div>
            `
        }

        $('#body').append(el)

    });
}