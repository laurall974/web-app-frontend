<script>
    import Cookies from "js-cookie";

    let filmType = '';
    let filmProducerName = '';
    let endDate= new Date();
    let filmName = '';
    let district = 0;
    let coordinates = [];
    let type = '';
    let sourceLocationId = '';
    let filmDirectorName = '';
    let address = '';
    let startDate = new Date();
    let year= 0;

    let error = '';

    let popup = false;
    function Show() {
        popup = !popup;
    }

    async function isLogged() {
        const jwt = await Cookies.get('jwt');
        if (!jwt) {
            return false;
        }
        else {
            return jwt!= null; }
    };

    let isLog = false;
    isLogged().then(result => {
        isLog = result;
    });

    const handleReset = async () => {
        filmType = '';
        filmProducerName = '';
        endDate= new Date();
        filmName = '';
        district = 0;
        coordinates = [];
        type = '';
        sourceLocationId = '';
        filmDirectorName = '';
        address = '';
        startDate = new Date();
        year= 0;

    }

    const handleSubmit = async () => {
        try {
            const jwt = await Cookies.get('jwt');
            if (!jwt){
                error='You cannot access this content'
            }
            else {
                const response = await fetch(`http://localhost:3000/locations`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        filmType,
                        filmProducerName,
                        endDate,
                        filmName,
                        district,
                        coordinates,
                        type,
                        sourceLocationId,
                        filmDirectorName,
                        address,
                        startDate,
                        year
                    })
                });

                const data = await response.json();
                if (data.error) {
                    error = data.message;
                } else {
                    console.log(data)
                    Show()
                    await handleReset()
                }
            }
        } catch (err) {
            console.error(err);
            error = 'Location cannot be added';
        }
    };

    async function Return(){
        location.href = "/locationlist"
    }

</script>

{#if isLog}
    <header>Create a new location</header>
    <div>
    <button on:click={Return}>Return</button>
    <form>
        <input type="text" bind:value={filmType} placeholder="Film type" />
        <input type="text" bind:value={filmProducerName} placeholder="Film Producer Name" />
        <input type="date" bind:value={endDate} placeholder="End Date" />
        <input type="text" bind:value={filmName} placeholder="Film Name" />
        <input type="text" bind:value={district} placeholder="District" />
        <input type="text" bind:value={coordinates} placeholder="Coordinates" />
        <input type="text" bind:value={type} placeholder="Type" />
        <input type="text" bind:value={sourceLocationId} placeholder="Source Location Id" />
        <input type="text" bind:value={filmDirectorName} placeholder="Film Director Name" />
        <input type="text" bind:value={address} placeholder="Address" />
        <input type="date" bind:value={startDate} placeholder="Start Date" />
        <input type="text" bind:value={year} placeholder="Year" />
        <button on:click={handleSubmit}>Add this location</button>
    </form>
    </div>


    {#if popup}
        <div class="modal-background" on:click={Show}></div>
        <div class="modal-content">
            <p>Location successfully added!</p>
            <a href="/locationlist">Location List</a>
        </div>
    {/if}

    {#if error}
        <p class="error">{error}</p>
    {/if}
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
        margin-bottom: 1rem;
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        width: 50%;
    }

    button,a {
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
    .error {
        color: red;
        margin-top: 1rem;
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

