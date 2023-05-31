<script lang="ts">
    import NavBar from '../components/NavBar.svelte';
    import { routeStore } from '../stores/route.store';
    import Dashboard from './Dashboard.svelte';
    import Lobby from './Lobby.svelte';
</script>

<NavBar />

{#if $routeStore === 'dashboard'}
    <Dashboard />
{/if}

{#if $routeStore === 'lobby'}
    <Lobby />
{/if}
