<script>

    import Head from '../../components/Header.svelte'

    let username = '';
    let password = '';
    let error = '';

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username ,
                    password
                })
            });
            console.log(response.json())
            const data = await response.json();
            if (data.success) {
                const data = await response.json();
                console.log(data)
                location.href = '/login';
            } else {
                error = data.message;
            }
        } catch (err) {
            error = 'An error occurred while trying to register';
        }
    }

</script>

<Head/>

<body>
    <form on:submit={handleSubmit}>
        <h1>Create a new account</h1>
        <input type="text" bind:value={username} placeholder="Username" />
        <input type="password" bind:value={password} placeholder="Password" />
        <button type="submit">Register</button>
        <p></p>
        <a href="/login" >Already have an account? Login</a>
    </form>
</body>

{#if error}
    <p class="error">{error}</p>
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

    .error {
        color: red;
        margin-top: 1rem;
    }
</style>
