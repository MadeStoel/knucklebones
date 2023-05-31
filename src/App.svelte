<script lang="ts">
    import { onAuthStateChanged } from 'firebase/auth';
    import { onMount } from 'svelte';
    import { auth } from './lib/firebase';
    import { userStore } from './lib/stores/user.store';
    import Spinner from './lib/components/Spinner.svelte';
    import Authenticate from './lib/pages/Authenticate.svelte';
    import Layout from './lib/pages/Layout.svelte';

    onMount(() => {
        const app = document.getElementById('app');
        app.style.height = `${window.innerHeight}px`;
        app.style.overflow = 'hidden';
        app.style.padding = '1rem';

        return onAuthStateChanged(auth, (user) => {
            if (user) {
                userStore.set({ isLoading: false, user });
            } else {
                userStore.set({ isLoading: false, user: null });
            }
        });
    });
</script>

{#if $userStore.user}
    <Layout />
{:else if !$userStore.isLoading}
    <Authenticate />
{:else}
    <Spinner />
{/if}
