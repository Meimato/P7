<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a href="#" class="navbar-brand font-weight-bold">
            <img src="../assets/logo.svg" class="primary-text" width="30rem" alt="Groupomania logo">
            Groupomania
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarContent" class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <span class="nav-link"><router-link to="/">Home</router-link></span>
                </li>
                <li class="nav-item">
                    <span class="nav-link"><router-link to="/signup">Signup</router-link></span>
                </li>
                <li class="nav-item">
                    <span class="nav-link"><router-link to="/">Disconnect</router-link></span>
                </li>
            </ul>
        </div>
        
    </nav>    
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
a.navbar-brand {
    color: #FD2D01;
}
</style>