<script lang="ts">
    import { userStore } from '../stores/user.store';
</script>

<h1>Logged in: {$userStore.user.email}</h1>

<button on:click={userStore.signOut}>Sign out</button>
