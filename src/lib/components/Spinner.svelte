<script lang="ts">
    export let unit: string = 'px';
    export let duration: string = '0.75s';
    export let size: string = '60';
    export let color: 'primary' | 'secondary' = 'primary';
</script>

<div
    class="circle"
    style="--size: {size}{unit}; --duration: {duration}; --color: {color ===
    'primary'
        ? 'hsl(195, 85%, 41%)'
        : '#FFFFFF'}" />

<style>
    .circle {
        height: var(--size);
        width: var(--size);
        border-color: var(--color) transparent var(--color) var(--color);
        border-width: calc(var(--size) / 15);
        border-style: solid;
        border-image: initial;
        border-radius: 50%;
        animation: var(--duration) linear 0s infinite normal none running rotate;
    }
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
