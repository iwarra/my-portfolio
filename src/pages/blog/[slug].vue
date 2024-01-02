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

		<main>
			<!-- <pre>{{ post.body }}</pre> -->
			<div class="post-hero pink">
				<div class="hero-wrap">
					<h1>{{ post.title }}</h1>
					<span>Published on: {{ post.date.substring(0, 10) }}</span>
				</div>
			</div>
			<Separator styling="incline pink" />
			<ContentRenderer
				:value="post"
				class="post-body"
				tag="article" />
			<div class="nav">
				<div class="nav-miniWrap">
					<NuxtLink
						v-if="prev"
						class="link-wrap"
						:to="'/blog' + prev._path">
						<div class="nav-title"
						style="align-self: flex-start">
							<img
								v-if="prev"
								src="/arrow-left.svg"
								alt=""
								class="nav-icon" />
							<span>Previous</span>
						</div>
						<span
							class="nav-subtitle"
							v-if="prev">
							{{ prev.title.substring(0, 16) }}...
						</span>
					</NuxtLink>
				</div>
				<div
					v-if="next"
					class="nav-miniWrap">
					<NuxtLink
						v-if="next"
						class="link-wrap"
						:to="'/blog' + next._path">
						<div
							class="nav-title"
							style="align-self: flex-end">
							<span>Next</span>
							<img
								src="/arrow-right.svg"
								alt=""
								class="nav-icon" />
						</div>
						<span
							class="nav-subtitle"
							v-if="next">
							{{ next.title.substring(0, 16) }}...</span
						>
					</NuxtLink>
				</div>
			</div>
		</main>
	</Layout>
</template>

<script setup>
const route = useRoute();

const { data: post } = await useAsyncData("post", () =>
	queryContent("/")
		.where({ _path: `/${route.params.slug}` })
		.findOne(),
);

const metaData = {
	title: post.value.title + " - Blog | ivona.se",
	meta: [
		{
			hid: "description",
			name: "description",
			content: post.value.summary,
		},
	],
};
useHead(metaData);

const [prev, next] = await queryContent()
	.only(["_path", "title", "date"])
	.sort({ date: -1 })
	.findSurround(`/${route.params.slug}`);
</script>

<style lang="scss" scoped>
.post-hero {
	width: 100%;
	padding-top: 3rem;
	padding-inline: 2rem;
}

.hero-wrap {
	position: relative;
	z-index: 2;
	max-width: 1000px;
	margin: 0 auto;
}

.nav {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	max-width: 1000px;
	margin: 0 auto;
	padding-inline: 2rem;
}

.nav-miniWrap {
	margin-bottom: 3rem;
}

.link-wrap {
	color: var(--primary-accent);
	display: flex;
	flex-direction: column;
	align-items: center;
	text-decoration: none;

	.nav-title {
		display: flex;
		align-items: center;
		//justify-content: center;
		font-size: 1.4rem;
		font-weight: 600;
	}

	.nav-subtitle {
		font-size: 1rem;
		font-weight: 500;
		color: gray;
	}
	.nav-icon {
		height: 2.3rem;
	}
}

.post-body {
	display: flex;
	flex-direction: column;
	max-width: 1000px;
	margin: 0 auto;
	gap: 1.3rem;
	padding: 1rem 2rem 5rem 2rem;
	font-size: 1.2rem;
}

:global(.post-body > h2) {
	font-size: 1.4rem;
	font-weight: 600;
	text-decoration: none;
	color: unset;
}

:global(.post-body > h2 > a) {
	text-decoration: none;
	color: unset;
}

:global(code) {
	display: block;
	background-image: url(/grainy_texture.png),
		linear-gradient(var(--secondary-light), var(--secondary-light));
	padding: 0.8rem 1rem;
	border: 1px solid rgb(196, 195, 195);
	border-radius: var(--borderRadius-small);
	word-break: break-all;
	white-space: break-spaces;
}

:global(code) span {
	filter: brightness(95%);
}

@media (max-width: 750px) {
	.post-body {
		text-align: justify;
	}
}
</style>
