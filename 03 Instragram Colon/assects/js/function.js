const setAlert = (msg, type = 'danger') => {
    return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button data-bs-dismiss="alert" class="btn-close"></button></p>`
}


// read LS Data
const readLSData = (key) => {
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
    } else {
        return false;
    }
}



// Create LS Data
const createLSData = (key, value) => {
    // init value
    let data = [];

    // get data from LS
    if(localStorage.getItem(key)){
        data = JSON.parse(localStorage.getItem(key));
    }

    // data push
    data.push(value);

    // set data to LS
    localStorage.setItem(key, JSON.stringify(data));
}

// upload LS Data
const uploadLSData = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array));
}