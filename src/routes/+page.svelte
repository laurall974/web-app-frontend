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
    <nav>
        <a href="/">Home</a>
        <a href="/register">Register  </a>
        <a href="/login">Login</a>
        <a href="" on:click={isConnected}>Location</a>
    </nav>
</header>

<body>
    <div class="welcome">
        Filming locations of paris
    </div>
</body>


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
        background: linear-gradient(to right, #000000, #000000);

        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        border-radius: 5px 5px 0 0;

    }
    body {
        background-image: url('../DALL-E.png');
        background-size: cover;
        background-position: center;
        margin: 0;
        padding: 0;
        height: 100vh;

    }

    .welcome {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        text-align: center;
        font-size: 30px;
        margin-left: 180px;
        font-family: Georgia, serif;
        font-weight: bold;
    }



</style>






