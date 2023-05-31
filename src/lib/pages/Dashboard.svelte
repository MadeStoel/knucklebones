<script lang="ts">
    import { db } from '../firebase';
    import { onValue, push, ref, set, update } from 'firebase/database';
    import { userStore } from '../stores/user.store';
    import { onMount } from 'svelte';
    import { routeStore } from '../stores/route.store';
    import { pendingGameStore } from '../stores/pending-game.store';

    let pendingGames = {};

    const pendingGamesRef = ref(db, '/pendingGames');

    onMount(() =>
        onValue(pendingGamesRef, (snapshot) => {
            pendingGames = snapshot.val() ?? {};
        })
    );

    /**
     * Create a new game
     */
    function newGame() {
        const newPendingGameRef = push(pendingGamesRef);

        set(newPendingGameRef, {
            playerOne: {
                id: $userStore.user.uid,
                displayName: $userStore.user.displayName,
            },
        });

        pendingGameStore.set({ id: newPendingGameRef.key });
        routeStore.set('lobby');
    }

    function joinGame(id: string, pendingGame) {
        const pendingGameRef = ref(db, `/pendingGames/${id}`);

        update(pendingGameRef, {
            playerTwo: {
                id: $userStore.user.uid,
                displayName: $userStore.user.displayName,
            },
        });

        pendingGameStore.set({ id });
        routeStore.set('lobby');
    }
</script>

<section class="dashboard-container">
    <ul class="game-list">
        {#each Object.entries(pendingGames) as [id, pendingGame]}
            <li class="game-list-item">
                <p>{pendingGame.playerOne.displayName}</p>

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-interactive-supports-focus -->
                <i role="button" on:click={() => joinGame(id, pendingGame)}
                    >Join</i>
            </li>
        {/each}
    </ul>

    <form class="new-game-form" on:submit|preventDefault={newGame}>
        <button>New game</button>
    </form>
</section>

<style>
    .dashboard-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: --webkit-fill-available;
    }

    .new-game-form {
        margin-top: auto;
    }

    .game-list {
        list-style: none;
    }

    .game-list-item {
        display: flex;
        align-items: center;
    }

    .game-list-item p {
        margin: 0 1rem 0 0;
    }
</style>
