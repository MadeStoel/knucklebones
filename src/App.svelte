<script lang="ts">
    import { onAuthStateChanged } from 'firebase/auth';
    import { onMount } from 'svelte';
    import { auth } from './lib/firebase';
    import { userStore } from './lib/stores/user.store';
    import SignIn from './lib/pages/SignIn.svelte';
    import Spinner from './lib/components/Spinner.svelte';
    import Dashboard from './lib/pages/Dashboard.svelte';

    onMount(() =>
        onAuthStateChanged(auth, (user) => {
            if (user) {
                userStore.set({ isLoading: false, user });
            } else {
                userStore.set({ isLoading: false, user: null });
            }
        })
    );
</script>

{#if $userStore.user}
    <Dashboard />
{:else if !$userStore.isLoading}
    <SignIn />
{:else}
    <Spinner />
{/if}
