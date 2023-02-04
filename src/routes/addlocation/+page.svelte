<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        background-color: #f2f2f2;
        margin: 100px auto;
    }

    input {
        margin-bottom: 1rem;
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        width: 50%;
    }

    button {
        margin-bottom: 1rem;
        background-color: blue;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 5px;
        border: none;
        cursor: pointer;
    }

    .error {
        color: red;
        margin-top: 1rem;
    }
</style>


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
    let result = '';

    const handleSubmit = async () => {
        try {
            const jwt = await Cookies.get('jwt');
            if (!jwt){
                console.log('ERROR')
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
                    // handle error
                    error = data.message;
                } else {
                    // store JWT in a cookie
                    result = data;

                    // navigate to protected page
                }
            }
        } catch (err) {
            console.error(err);
            error = 'Location cannot be added';
        }
    };
    async function Retour(){
        location.href = "/locationlist"
    }


</script>


<form on:submit={handleSubmit}>
    <h1>Create a new location</h1>
    <input bind:value={result}/>
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
    <button type="submit">Add this location</button>
    <br />
    <button on:click={Retour}>Return</button>
    <p></p>
</form>

{#if error}
    <p class="error">{error}</p>
{/if}
