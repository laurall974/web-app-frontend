
export async function load({ params, cookies}) {

    const fetchData = async (id) => {
        try {
            const jwt = await cookies.get('jwt');
            if (!jwt) {
                console.log("Nullos")
            }
            else {
                let url = `https://web-app-back-laurall.onrender.com/locations/${id}`;

                let options = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                };
                const res = await fetch(url, options)

                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                const data = await res.json();
                return data;
            }
        }
        catch (err) {
            //throw(err)
            console.log(err)

        }
    };

    const location = await fetchData(params.id)
    return {location};
}