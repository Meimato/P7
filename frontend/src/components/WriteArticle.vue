<template>
    <form>
        <input type="text" id="article-title" class="form-control" placeholder="Title" required>
        <input type="textarea" name="description" id="article-description" class="form-control" placeholder="Description" required>
        <button type="button" class="btn btn-primary">Publier</button>
    </form>
</template>

<script>
export default {
    name: 'WriteArticle',
    
}
</script>

<style scoped>

</style>