
<script>

    import Cookies from 'js-cookie';

    /** @type {import('./$types').PageData} */
    export let data;

    let error = null;
    let filmType = data.location.filmType;
    let filmProducerName = data.location.filmProducerName;
    let endDate= data.location.endDate;
    let filmName = data.location.filmName;
    let district = data.location.district;
    let coordinates = data.location.geolocation.coordinates;
    let type = data.location.geolocation.type;
    let sourceLocationId = data.location.sourceLocationId;
    let filmDirectorName = data.location.filmDirectorName;
    let address = data.location.address;
    let startDate = data.location.startDate;
    let year = data.location.year;
    const id = data.location._id;

    const handleUpdate = async () => {
        try {
            const jwt = await Cookies.get('jwt');

            let url = `https://web-app-back-laurall.onrender.com/locations/${id}`;

            let options = {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    filmType,
                    filmProducerName,
                    endDate,
                    filmName,
                    district,
                    "geolocation" : {coordinates,
                    type},
                    sourceLocationId,
                    filmDirectorName,
                    address,
                    startDate,
                    year
                })
            }
            console.log(options)
            const res = await fetch(url, options)
            console.log(res.body)

            const data = await res.json();
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data)
                location.href='/locationlist'
            }
        } catch (err) {
            console.error(err);
        }
    };

    async function Retour(){
        location.href = "/locationlist"
    }

    let popup = false;

    function Show() {
        popup = !popup;
    }

    // To check the role
    async function isAdmin() {
        const jwt = await Cookies.get('jwt');
        const res = await fetch('https://web-app-back-laurall.onrender.com/users/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        if (!res.ok) {
            return false;
        }
        try {
            const result = await res.json();
            return result.role === 'admin';
        } catch (error) {
            return false;
        }
    }
    //to allow or not to see update button
    let isAdminUser = false;

    isAdmin().then(result => {
        isAdminUser = result;
    });

    const handleDelete = async () => {
        try {

            const jwt = await Cookies.get('jwt');
            if (!jwt) {
                console.log('ERROR');
            } else {
                const response = await fetch(`https://web-app-back-laurall.onrender.com/locations/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                    }
                });
                const data = await response.json();
                if (data.error) {
                    error = data.message;
                } else {
                    console.log(data);
                    location.href="/locationlist"
                }
            }
        } catch (err) {
            console.error(err);
            error = 'Location cannot be deleted';
        }
    };

</script>

{#if isAdminUser}
    <div>
        <header>Update/Delete location</header>
        <div>
        <button on:click={Retour}>Return</button>
        <form >
            <button on:click={Show}>Delete</button>
            <h2>Film type:</h2>
            <input type="text" bind:value={filmType} />
            <h2>Film Producer Name:</h2>
            <input type="text" bind:value={filmProducerName} />
            <h2>End Date:</h2>
            <input type="text" bind:value={endDate}/>
            <h2>Film Name:</h2>
            <input type="text" bind:value={filmName} />
            <h2>Film district:</h2>
            <input type="text" bind:value={district} />
            <h2>Geolocation : coordinates:</h2>
            <input type="text" bind:value={coordinates}  />
            <h2>Geolocation : type:</h2>
            <input type="text" bind:value={type} />
            <h2>Source Location Id:</h2>
            <input type="text" bind:value={sourceLocationId}  />
            <h2>Film Director Name:</h2>
            <input type="text" bind:value={filmDirectorName} />
            <h2>Address:</h2>
            <input type="text" bind:value={address} />
            <h2>Start Date:</h2>
            <input type="text" bind:value={startDate} />
            <h2>Year:</h2>
            <input type="text" bind:value={year} />

            <button on:click={handleUpdate}>Update this location</button>
            <p></p>
        </form>
        </div>

        {#if popup}
            <div class="modal-background" on:click={Show}></div>
            <div class="modal-content">
                <p>Are you sure?</p>
                <button on:click={Show}>No</button>
                <button on:click={() => handleDelete(id)}>Yes</button>
            </div>
        {/if}
    </div>
{/if}


<style>
    header {
        background: rosybrown;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        font-size: 30px;

    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        background-color: #f2f2f2;

    }
    div {
        background-color: #f2f2f2;
    }

    input {
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        width: 50%;
        color: #333
    }
    h2 {
        font-size: 1rem;
        width: 50%;
        color: #333
    }

    button {
        background-color: rosybrown;
        display: inline-block;
        color: white;
        padding: 1rem 3rem;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        margin: 0.5rem;
        font-size: 13px;
        align-content: center;

    }


    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 1rem;
        border-radius: 0.5rem;
    }

</style>