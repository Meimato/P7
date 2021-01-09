<template>
    <div class="container rounded shadow my-md-5">
        <div class="row">
            <section class="col-12 col-md-6 my-5">
                <h1>Groupomania</h1>
                <p>Partagez et restez en contact avec votre equipe.</p>
            </section>
            <section class="col-12 col-md-6 card m-auto">
                <form class="form-group">
                    <input type="email" name="user-mail" id="user-mail" placeholder="Email" class="col my-4" required>
                    <input type="password" name="user-password" id="user-password" class="col mb-4" placeholder="Password" required>
                    <button type="button" id="btn-login" value="login" class="rounded">Connexion</button>
                    <hr>
                    <button type="button" id="btn-signup" class="rounded">Créer un compte</button>
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
    background-color: #f0f2f5;
}

h1 {
    color: #1877f2;
}

#btn-login {
    background-color: #1877f2;
}

#btn-signup {
    background-color: #42b72a;
}

.shadow {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
</style>