<script lang="ts">
</script>

<div class="spinner-container">
	<div class="spinner">
		<i class="ph-fill ph-circle-notch"></i>
	</div>
</div>

<style>
	.spinner-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		flex: 1 0 0;
	}
	i {
		font-size: 48px;
	}
	.spinner {
		animation: spin 1s linear infinite;
		display: flex;
		width: fit-content;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
			color: var(--primary-color);
		}
		50% {
			color: var(--secondary-color);
		}
		100% {
			transform: rotate(720deg);
			color: var(--primary-color);
		}
	}
</style>
