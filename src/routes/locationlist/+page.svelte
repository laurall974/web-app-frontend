<script>
    let films = [];
    let error = null;

    import Cookies from 'js-cookie';
    import { onMount } from 'svelte';

    const fetchData = async () => {
        try {
            console.log("ICI")
                    const jwt = await Cookies.get('jwt');
                    if(!jwt){
                        location.href('/login') }
                    else
                    {
                        const res = await fetch(`http://localhost:3000/locations`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${jwt}`
                            }
                        });

                        if (!res.ok) {
                            throw new Error(res.statusText);
                        }
                        const data = await res.json();
                        films = data;
                    }
        }
        catch (err) {
            error = err.message;
        }
    };

    onMount(fetchData);

    const logOut = async () => {
        const jwt = await Cookies.get('jwt');
        if (jwt) {
            Cookies.remove('jwt');
        }
        location.href="/"
    }

    // To check the role
    async function isAdmin() {
        const jwt = await Cookies.get('jwt');
        const res = await fetch('http://localhost:3000/users/me', {
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

    //Popup : to display details of one location
    let popup = false;
    let filmId = "";
    let film = {}

    function retrieveId(id){
        filmId=id
        console.log(filmId)
        film = films.find(film => film._id === filmId);
    }
    function ShowDetails() {
        popup = !popup;
    }

</script>


    {#if error}
        <p>An error occurred while fetching the data: {error}</p>

    {:else}
        <header>
            Location List
        </header>
        <div>
            <button class="logout" on:click={logOut}>Déconnexion</button>
            <form>
                {#if isAdminUser}
                    <a href="/addlocation">Add a new location</a>
                    <br />
                {/if}
                {#each films as film}
                    <table>
                        <tr>
                            <th>Actions</th>
                            <th>Film Type</th>
                            <th>Film Producer Name</th>
                            <th>Film Name</th>
                        </tr>
                        <tr>
                            <!-- Add data from your filmSchema model here -->
                            <td>
                                {#if isAdminUser}<a href="/updatelocation/{film._id}">Manage</a> {/if}
                                <button on:click={() => {retrieveId(film._id); ShowDetails();}} >Display details</button>
                            </td>
                            <td>{film.filmType}</td>
                            <td>{film.filmProducerName}</td>
                            <td>{film.filmName}</td>
                        </tr>
                        <br />
                    </table>
                    <br />
                {/each}
            </form>
        </div>
    {/if}

{#if popup}
    <div class="modal-background" on:click={ShowDetails}></div>
    <div class="modal-content">
        <table>
            <tr>
                <th>Film Type</th>
                <th>Film Producer Name</th>
                <th>Film Name</th>
                <th>End Date</th>
                <th>District</th>
                <th>Source Location ID</th>
                <th>Film Director Name</th>
                <th>Address</th>
                <th>Start Date</th>
                <th>Year</th>
            </tr>
            <tr>
                <td>{film.filmType}</td>
                <td>{film.filmProducerName}</td>
                <td>{film.filmName}</td>
                <td>{film.endDate}</td>
                <td>{film.district}</td>
                <td>{film.sourceLocationId}</td>
                <td>{film.filmDirectorName}</td>
                <td>{film.address}</td>
                <td>{film.startDate}</td>
                <td>{film.year}</td>
            </tr>
        </table>
        <button class="close" on:click={ShowDetails}>Close</button>
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
        margin: 50px auto;
    }
    p {
        font-size: 18px;
        margin: 10px 0;
    }
    table {
        width: 100%;
        margin: 10px 0;
        border-radius: 10px;
        overflow: hidden;
    }
    th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
        font-size: 16px;
    }
    th {
        background-color: lightgrey;
    }
    a {
        margin-bottom: 1rem;
        background-color: rosybrown;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 5px;
        border: none;
        cursor: pointer;
    }
    button {
        padding: 10px 20px;
        background-color: rosybrown;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    .logout {
        position: absolute;
        top: 80px;
        right: 10px;
        padding: 10px 20px;
        background-color: rosybrown;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
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
        color: black;
    }
</style>
