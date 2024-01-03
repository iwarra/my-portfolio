<script setup>
const props = defineProps({
	error: Object,
});
</script>

<template>
	<Layout
		navBackgroundColor="gray"
		headerBackground="pink">
		<template #navLinks>
			<menu class="header-links">
				<li><NuxtLink to="/">Home</NuxtLink></li>
				<li><NuxtLink to="/blog">Blog</NuxtLink></li>
			</menu>
		</template>
		<template #hero>
			<div class="error-container">
				<div class="error-wrapper">
					<h1 class="error-title">Oops, seems you've taken a wrong turn!</h1>
					<NuxtImg
						src="/page-not-found.svg"
						class="error-img"></NuxtImg>
				</div>
			</div>
		</template>
		<Separator styling="pink incline" />
		<main class="error-text">
			<h2 class="error-subtitle">{{ error.statusMessage }}</h2>
			<p>Something went wrong. We can't find the page you're looking for.</p>
			<div class="error-btnWrap">
				<NuxtLink class="error-btn" to="/">Back to home</NuxtLink>
				<NuxtLink to="/blog" class="error-btn">Back to blog</NuxtLink>
			</div>
		</main>
	</Layout>
</template>

<style scoped lang="scss">
@import "./global.scss";
.error-container {
	width: 100%;
	max-width: 1000px;
	padding: 4rem 2rem 3rem 2rem;
	margin: 0 auto;
	container-type: inline-size;
}

.error-wrapper {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.error-title {
	font-size: 2.5rem;
	max-width: 15ch;
}
.error-img {
	width: 300px;
	display: none;
	z-index: 2;
}

.error-text {
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	width: 100%;
	max-width: 1000px;
	padding: 3rem 2rem 0rem 2rem;
	margin: 0 auto;
}

.error-btnWrap {
	display: flex;
	gap: 1.5rem;
}
.error-btn {
	@extend %btn!optional; 
	padding: 0.6rem 1rem;
	color: var(--primary-accent);
	background-color: #FFF;
	text-decoration: none;
}

@container (min-width: 750px) {
	.error-wrapper {
		justify-content: space-evenly;
	}
	.error-img {
		display: inline-block;
	}
}
</style>
