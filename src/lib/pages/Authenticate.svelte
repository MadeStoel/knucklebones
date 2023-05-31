<script lang="ts">
    import { updateProfile } from 'firebase/auth';
    import Spinner from '../components/Spinner.svelte';
    import { userStore } from '../stores/user.store';

    let pageType: 'signIn' | 'register' = 'signIn';

    let email: string;
    let password: string;
    let confirmPassword: string;
    let displayName: string;
    let loading: boolean = false;
    let error: string;

    /**
     * Register a new user
     */
    function register(): void {
        loading = true;

        if (password !== confirmPassword) {
            loading = false;
            error = 'Passwords do not match';
            return;
        }

        userStore
            .register(email, password)
            .then((result) => {
                updateProfile(result.user, {
                    displayName,
                });
            })
            .catch(() => {
                loading = false;
                error = 'Something went wrong, try again';
            });
    }

    /**
     * Sign in an existing user
     */
    function signIn(): void {
        loading = true;

        userStore.signIn(email, password).catch(() => {
            loading = false;
            error = 'Something went wrong, try again';
        });
    }

    function togglePage(): void {
        pageType = pageType === 'signIn' ? 'register' : 'signIn';
    }
</script>

<div class="page-container">
    <h1>{pageType === 'signIn' ? 'Sign in' : 'Register'}</h1>

    <form on:submit|preventDefault={pageType === 'signIn' ? signIn : register}>
        {#if pageType === 'register'}
            <label>
                Display name
                <input type="text" required bind:value={displayName} />
            </label>
        {/if}

        <label>
            Email
            <input type="text" required bind:value={email} />
        </label>

        <label>
            Password
            <input type="password" required bind:value={password} />
        </label>

        {#if pageType === 'register'}
            <label>
                Confirm password
                <input type="password" required bind:value={confirmPassword} />
            </label>
        {/if}

        {#if loading}
            <button disabled>
                <div class="spinner-container">
                    <Spinner color="secondary" size="30" />
                </div>
            </button>
        {:else}
            <button>{pageType === 'signIn' ? 'Sign in' : 'Register'}</button>
        {/if}

        <p>
            {pageType === 'signIn'
                ? " Don't have an account yet?"
                : 'Already have an account?'}

            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <a on:click|preventDefault={togglePage}
                >{pageType === 'signIn' ? 'Register' : 'Sign In'}</a>
        </p>
        {#if error}
            <p class="error">{error}</p>
        {/if}
    </form>
</div>

<style>
    form,
    .page-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1rem;
    }

    .page-container {
        height: 100%;
    }

    h1 {
        margin: 0 auto;
    }

    .spinner-container {
        width: fit-content;
        margin: auto;
    }

    .error {
        background-color: var(--del-color);
        padding: 1rem;
        border-radius: 1rem;
    }
</style>
