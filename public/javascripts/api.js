const callApi = () => {
    const URL = "https://api.agrimetrics.co.uk/field-forecasts/context";
    const otherPram = {
        headers: {
            "Ocp-Apim-Subscription-Key": "b217e69110bb4c16ba6e8946201c19a6"
        }
    };
    fetch(URL, otherPram)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
};
