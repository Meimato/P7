<template>
    <section class="container w-25 d-flex flex-column align-items-center justify-content-center">
        <div class="row card rounded-corners shadow">
            <form class="p-3">
                <input type="text" name="user-name" id="user-name" placeholder="Nom utilisateur" class="form-control col rounded-corners my-3 py-3" required>
                <input type="email" name="user-mail" id="user-mail" placeholder="E-mail" class="form-control col rounded-corners my-3 py-3" required>
                <input type="password" name="user-password" id="user-password" class="form-control col rounded-corners mb-3 py-3" placeholder="Nouveau mot de passe" required>
                <button type="button" id="btn-signup" class="btn btn-success btn-block rounded-corners text-white p-2">S'inscrire</button>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Register'
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