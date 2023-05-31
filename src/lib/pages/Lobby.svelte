<script lang="ts">
    import { onValue, ref } from 'firebase/database';
    import { db } from '../firebase';
    import { onMount } from 'svelte';
    import { pendingGameStore } from '../stores/pending-game.store';

    const pendingGameRef = ref(db, `/pendingGames/${$pendingGameStore.id}`);
    let pendingGame;

    onMount(() =>
        onValue(pendingGameRef, (snapshot) => {
            pendingGame = snapshot.val() ?? {};
        })
    );
</script>

<h1>Lobby</h1>

{#if pendingGame}
    <section>
        <p class="player-name">{pendingGame.playerOne.displayName}</p>

        <p class="versus">Vs</p>

        {#if pendingGame.playerTwo}
            <p class="player-name">{pendingGame.playerTwo.displayName}</p>
        {:else}
            <i>Waiting for opponent...</i>
        {/if}
    </section>
{/if}

<style>
    section {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .player-name {
        font-size: 3rem;
    }

    .versus {
        font-size: 1.5rem;
        margin: 0 2rem;
    }
</style>
