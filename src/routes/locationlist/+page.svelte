<script>
    let films = [];
    let error = null;

    import Cookies from 'js-cookie';

    async function isLogged() {
        const jwt = await Cookies.get('jwt');
        if (!jwt) {
            console.log("NON");
            return false;
        }
        else {
            console.log(jwt)
            return jwt!= null; }
    };

    let isLog = false;
    isLogged().then(result => {
        isLog = result;
    });


    const fetchData = async () => {
        try {
            if(isLogged)
                {
                    const jwt = await Cookies.get('jwt');
                    if(!jwt
        )
            {
                //navigate('/login');
            }
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
        } catch (err) {
            error = err.message;
        }
    };

    fetchData();

    const logOut = async () => {
        const jwt = await Cookies.get('jwt');
        if (jwt) {
            Cookies.remove('jwt');
        }
        location.href="/"
    }


    async function isAdmin() {
        const jwt = await Cookies.get('jwt');

        const res = await fetch('http://localhost:3000/users/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (!res.ok) {
            console.log("ici");
        }

        try {
            const result = await res.json();
            return result.role === 'admin';
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    let isAdminUser = false;

    isAdmin().then(result => {
        isAdminUser = result;
    });

    let popup = false;
    let filmId = "";
    let film = {}

    function retrieveId(id){
        filmId=id
        console.log(filmId)
        film = films.find(film => film._id === filmId);
    }
    function ShowDetails(id) {
        popup = !popup;
    }



</script>

{#if isLog}
    {#if error}
        <p>An error occurred while fetching the data: {error}</p>

    {:else}
        <div>
            <form>
                <button class="logout" on:click={logOut}>Déconnexion</button>
                <h1>Location List</h1>
                {#if isAdminUser}
                    <a href="/addlocation">Add a new location</a>
                {/if}
                <br />
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
                                {#if isAdminUser}<a href="/updatelocation/{film._id}">Update</a> {/if}
                                <button on:click={() => {retrieveId(film._id); ShowDetails();}} >Details</button>
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
        <button on:click={ShowDetails}>Close</button>
    </div>
{/if}

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        margin: 100px auto;
    }
    p {
        font-size: 18px;
        margin: 10px 0;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
        font-size: 14px;
    }
    th {
        background-color: lightgray;
    }
    a {
        margin-bottom: 1rem;
        background-color: blue;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 5px;
        border: none;
        cursor: pointer;
    }
    button.logout {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 10px 20px;
        background-color: black;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
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


