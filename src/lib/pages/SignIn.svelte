<script lang="ts">
    import { userStore } from '../stores/user.store';

    let email: string;
    let password: string;
    let loading: boolean = false;

    let errors;

    function signIn() {
        loading = true;

        userStore.signIn(email, password).catch((e) => {
            loading = false;
            errors = e;
        });
    }
</script>

<form on:submit|preventDefault={signIn}>
    <label>
        Email
        <input type="text" bind:value={email} />
    </label>

    <label>
        Password
        <input type="password" bind:value={password} />
    </label>

    {#if loading}
        <button disabled>spinnin'</button>
    {:else}
        <button>Sign in</button>
    {/if}

    {#if errors}
        Something went wrong
    {/if}
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
    }
</style>
