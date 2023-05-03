export const uploadImage = async (contentType, blob) => {
    const response = await fetch('/api/uploader', {
        method: 'PUT',
        headers: {
            'Content-Type': contentType
        },
        body: blob,
    });

    let result = await response.json();

    return result;
}

export const saveOpenGraph = async (dataOpenGraph) => {
    const response = await fetch('/api/opengraph', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dataOpenGraph }),
    });

    let result = await response.json();

    console.log(result);

    return result;
}