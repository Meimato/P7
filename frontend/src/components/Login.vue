<template>
    <div class="container d-flex flex-column justify-content-md-center align-items-center">
        <div class="row">
            <section class="col-12 col-md-5 my-5">
                <h1 class="font-weight-bold">Groupomania</h1>
                <p>Partagez et restez en contact avec votre equipe.</p>
            </section>
            <section class="col-12 col-md-5 card rounded-corners shadow m-auto">
                <form class="form-group">
                    <input type="email" name="user-mail" id="user-mail" placeholder="Email" class="col rounded-corners my-3 py-3" required>
                    <input type="password" name="user-password" id="user-password" class="col rounded-corners mb-3 py-3" placeholder="Password" required>
                    <button type="submit" id="btn-login" value="login" class="btn btn-block rounded-corners text-white p-2">Connexion</button>
                    <hr>
                    <button type="button" id="btn-signup" class="btn btn-block rounded-corners text-white p-2">Créer un compte</button>
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
    height: 90vh;
    background-color: #f0f2f5;
}

h1 {
    color: #FD2D01;
}

#btn-login {
    background-color: #1877f2;
}

#btn-signup {
    background-color: #42b72a;
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