const getData = (dataId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Data :", dataId)
            resolve("Success");
        }, 2000);
    })
}

async function getAllData() {
    await getData(1);
    await getData(2);
    await getData(3);
}

getAllData();