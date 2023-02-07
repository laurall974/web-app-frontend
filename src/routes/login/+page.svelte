<script>
    import Head from '../../components/Header.svelte'
    import Cookies from 'js-cookie';

    let username = '';
    let password = '';
    let error = '';

    const handleLogin = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();
            if (data.error) {
                // handle error
                error = data.message;
            } else {
                // store JWT in a cookie
                Cookies.set('jwt', data.jwt, { expires: 1 });
                // navigate to protected page
                location.href = '/locationlist';
            }
        } catch (err) {
            console.error(err);
            error = 'An error occurred while trying to authenticate';
        }
    };

    // to allow or not the modal error to be display on the screen
    let popup = false;

    function Show() {
        popup = !popup;
    }

</script>

<Head/>
<body>
    <form on:submit={handleLogin}>
        <h1>Login</h1>
        <input type="text" bind:value={username} placeholder="Username" />
        <input type="password" bind:value={password} placeholder="Password" />
        <button type="submit">Login</button>
        <p></p>
        <a href="/register"  >Don't have an account? Register</a>
    </form>
</body>
{#if error}
    {#if !popup}
        <div class="modal-background" on:click={Show}></div>
        <div class="modal-content">
            <p>Incorrect username or password!</p>
        </div>
        <button on:click={Show}>Close</button>
    {/if}
{/if}




<style>
    body {
        background-image: url('../../DALL-E2023.png');
        background-size: cover;
        background-position: center;
        margin: 0;
        padding: 0;
        height: 94vh;

    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        background-color: #f2f2f2;
        border-radius: 10px;
        width: 400px;
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
        background-color: #000000;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 5px;
        border: none;
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
        color: red;
    }
</style>
