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
        background-color: blue;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }


</style>


<script>
    let films = [];
    let error = null;

    import Cookies from 'js-cookie';

    const fetchData = async () => {
        try {

            const jwt = await Cookies.get('jwt');
            if (!jwt) {
                //navigate('/login');
            } else {
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

</script>

{#if error}
    <p>An error occurred while fetching the data: {error}</p>

{:else}
    <div>
        <form>
            <button class="logout" on:click={logOut}>Déconnexion</button>

            <h1>Location List</h1>
            <a href="/addlocation">Add a new location</a>
            <br />
            {#each films as film}
                <table>
                    <tr>
                        <th>Actions</th>
                        <th>Film Type</th>
                        <th>Film Producer Name</th>
                        <th>End Date</th>
                        <th>Film Name</th>
                        <th>District</th>
                        <th>Geolocation</th>
                        <th>Source Location ID</th>
                        <th>Film Director Name</th>
                        <th>Address</th>
                        <th>Start Date</th>
                        <th>Year</th>
                    </tr>
                    <tr>
                        <!-- Add data from your filmSchema model here -->
                        <td>
                            <a href="/updatelocation/{film._id}">Update</a>
                        </td>
                        <td>{film.filmName}</td>
                        <td>{film.filmProducerName}</td>
                        <td>{film.endDate}</td>
                        <td>{film.filmName}</td>
                        <td>{film.district}</td>
                        <td>{film.geolocation}</td>
                        <td>{film.sourceLocationId}</td>
                        <td>{film.filmDirectorName}</td>
                        <td>{film.address}</td>
                        <td>{film.startDate}</td>
                        <td>{film.year}</td>
                    </tr>
                    <br />
                </table>
                <br />
            {/each}
        </form>
    </div>
{/if}




