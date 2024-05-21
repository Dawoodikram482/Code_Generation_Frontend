<template>
    <div class="container login-container">
        <img src="/logo.png" class="text-center"/>
        <h2 class="text-center">Login</h2>
        <div class="alert alert-danger" role="alert" v-if="invalidLogin">
            Invalid Email or Password
        </div>
        <form v-on:submit.prevent="login">
            <div class="form-group">
                <label>Email:</label>
                <input class="form-control" type="email" v-model="email"/>
            </div>
            <div class="form-group mt-2">
                <label>Password:</label>
                <input class="form-control" type="password" v-model="password"/>
            </div>
            <div class="form-group mt-2">
                <button class="btn btn-primary w-100" disabled type="button" v-if="loading">
                    <span aria-hidden="true" class="spinner-grow spinner-grow-sm" role="status"></span>
                    Login
                </button>
                <button class="btn btn-primary w-100 mt-2" type="submit" v-else>Login</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                password: '',
                invalidLogin: false,
                loading: false,
            }
        },
        methods: {
            login() {
                this.loading = true
                let data = new FormData()
                data.append('grant_type', 'password')
                data.append('username', this.email)
                data.append('password', this.password)
                let uri = '/oauth/token'
                this.axios.post(uri, data).then((response) => {
                    localStorage.setItem('actoken', response.data.access_token)
                    localStorage.setItem('loggedIn', true)

                    this.axios.get('/users/me', {
                            headers: {Authorization: `Bearer ${response.data.access_token}`}
                        }
                    ).then(response => {
                        localStorage.setItem('email', response.data.email)
                        this.$router.replace({name: 'my-posts'})
                        this.loading = false
                        window.location.reload()
                    })
                }).catch(() => {
                    this.invalidLogin = true
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>
    .login-container {
        margin-left: 50%;
    }

    .login-container img {
        display: block;
        width: 50%;
        margin: 0 auto;
    }
</style>