<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a href="#" class="navbar-brand font-weight-bold">
            <img src="../assets/logo.svg" class="primary-text" width="30rem" alt="Groupomania logo">
            Groupomania
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarContent" class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a href="/" class="nav-link">Login</a>
                </li>
                <li class="nav-item">
                    <a href="/signup" class="nav-link">Signup</a>
                </li>
                <li class="nav-item">
                    <a href="/" class="nav-link">Disconnect</a>
                </li>
            </ul>
        </div>
        
    </nav>    
</template>

<script>
export default {
    name: 'Navbar',
    props: {
        msg: String
    }
}
</script>

<style scoped>
a.navbar-brand {
    color: #FD2D01;
}
</style>