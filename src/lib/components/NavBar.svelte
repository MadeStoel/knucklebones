<script lang="ts">
    import { userStore } from '../stores/user.store';

    export function signOut(): void {
        userStore.signOut();
    }
</script>

<nav>
    <ul>
        <li><strong>Knucklebones</strong></li>
    </ul>
    <ul>
        <li>
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="#" role="button" on:click|preventDefault={signOut}
                >Sign out</a>
        </li>
    </ul>
</nav>
