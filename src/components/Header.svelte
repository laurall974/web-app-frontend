<script>
    import Cookies from "js-cookie";

    async function isConnected(){
        const jwt = await Cookies.get('jwt');
        if (!jwt) {
            location.href="/login"
        }
        else {
            location.href="/register"
        }
    }
</script>

<header>
    Filming locations of paris
    <nav>
        <a href="/">Home</a>
        <a href="/register">Register  </a>
        <a href="/login">Login</a>
        <a href="" on:click={isConnected}>Location</a>
    </nav>
</header>

<style>
    header a {
        color: #fff;
        padding: 0 10px;
        text-decoration: none;
        font-size: 30px;
        border: 1px solid #fff;
        border-radius: 5px;
        margin-left: 10px;
    }

    header nav {
        display: flex;
        justify-content: flex-end;
    }
    header {
        background: linear-gradient(to right, black,black);

        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        font-size: 30px;


    }
    body {
        background-image: url('../DALL-E2023.png');
        background-size: cover;
        background-position: center;
        margin: 0;
        padding: 0;
        height: 100vh;

    }

</style>






