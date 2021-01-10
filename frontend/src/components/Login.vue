<template>
    <div class="container d-flex flex-column justify-content-md-center">
        <div class="row">
            <section class="col-12 col-md-5 offset-md-1 my-5">
                <h1 class="font-weight-bold">Groupomania</h1>
                <h2 class="lead">Partagez et restez en contact avec votre equipe.</h2>
            </section>
            <section class="col-12 col-md-4 offset-md-1 card rounded-corners shadow">
                <form class="form-group">
                    <input type="email" name="user-mail" id="user-mail" placeholder="Email" class="form-control col rounded-corners my-3 py-3" required>
                    <input type="password" name="user-password" id="user-password" class="form-control col rounded-corners mb-3 py-3" placeholder="Password" required>
                    <button type="submit" id="btn-login" value="login" class="btn btn-primary btn-block rounded-corners text-white p-2">Connexion</button>
                    <hr>
                    <button type="button" id="btn-signup" class="btn btn-success btn-block rounded-corners text-white p-2">Créer un compte</button>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    props: {
        msg: String
    }
}
</script>

<style scoped>
.container {
    height: 70vh;
    background-color: #f0f2f5;
}

h1 {
    color: #FD2D01;
}

.rounded-corners {
    border-radius: 0.5rem;
}

#user-mail, #user-password {
    border: 1px solid #c4c4c4;
}

#user-mail:hover, #user-password:hover {
    border: 1px solid #1877f2;
}

</style>