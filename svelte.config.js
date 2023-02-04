import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter()
    },
    proxy: {
        "/api/authenticate": {
            target: "http://localhost:3000/users/login"
        }
    }
};



export default config;