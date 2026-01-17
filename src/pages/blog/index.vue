<script setup>
const metaData = {
	title: 'Blog | ivona.se',
	meta: [
		{
			hid: 'description',
			name: 'description',
			content: 'Blog posts about coding',
		},
	],
};
useHead(metaData);

const categoryValue = ref('');
const searchValue = ref('');
const postsPerView = ref(3);
const posts = ref(await getPosts());
const totalNumOfPosts = ref(await queryContent('/').count());
const timer = ref(false);

onMounted(() => {
	const observer = new IntersectionObserver(() => getPosts({ loadMore: true }), {
		root: null,
		rootMargin: '0%',
		threshold: 0, // between 0-1; how much of the target to be visible before loading
	});
	observer.observe(document.querySelector('footer'));
});

async function getPosts(obj = {}) {
	const { loadMore, search, filter, reset } = obj;

	if (loadMore) {
		if (categoryValue.value !== '' || searchValue.value !== '') return;

		posts.value = await queryContent('/')
			.limit((postsPerView.value += 3))
			.sort({ date: -1, $numeric: true })
			.without('body')
			.find();
		return;
	}

	if (search) {
		const { data: source } = await useAsyncData('allPosts', () => queryContent('/').find());
		posts.value = useSearch(obj.search, source.value);
		return;
	}

	if (filter) {
		// try idempotency?
		posts.value = await queryContent('/')
			.where({ category: { $contains: obj.filter } })
			.find();

		if (searchValue.value) searchValue.value = '';
		return;
	}

	if (reset) {
		searchValue.value = '';
		categoryValue.value = '';
	}

	return useAsyncData('posts', () =>
		queryContent('/')
			.limit(postsPerView.value)
			.sort({ date: -1, $numeric: true })
			.without('body')
			.find(),
	).data;
}

const debounce = (callback, ms) => {
	clearTimeout(timer.value);
	timer.value = setTimeout(() => {
		callback();
		timer.value = false;
	}, ms);
};

// categories
const { data: categories } = await useAsyncData('categories', async () => {
	const list = new Set();
	const result = await queryContent('/').only('category').find();

	 result.forEach((obj) => {
    if (obj.category && Array.isArray(obj.category)) {
      obj.category.forEach((el) => list.add(el));
    }
  });

	return list;
});
</script>

<template>
	<Layout
		navBackgroundColor="gray"
		headerBackground="pink">
		<template #navLinks>
			<menu class="header-links">
				<li><NuxtLink to="/">Home</NuxtLink></li>
			</menu>
		</template>
		<template #hero>
			<div class="blog-hero pink">
				<div class="hero-wrapper">
					<div class="hero-miniWrap">
						<h1 class="blog-title">My Blog</h1>
						<form>
							<div class="search-wrapper">
								<div
									role="search"
									class="search-group">
									<component
										class="search-icon"
										is="IconsSearch" />
									<input
										name="search"
										type="search"
										placeholder="Search posts..."
										v-model="searchValue"
										@input.prevent="debounce(() => getPosts({ search: searchValue }), 500)"
										@keypress.enter.prevent="" />
								</div>
								<div class="filter-group">
									<component
										class="filter-icon"
										is="IconsFilter" />
									<select
										name="category"
										v-model="categoryValue"
										@change="() => getPosts({ filter: categoryValue })">
										<option
											selected
											value="">
											All categories
										</option>
										<option
											v-for="category in categories"
											:key="category"
											:value="category">
											{{ category }}
										</option>
									</select>
								</div>
							</div>
						</form>
					</div>
					<img
						src="/search.svg"
						alt=""
						class="hero-img" />
				</div>
			</div>
		</template>

		<main>
			<Separator styling="pink incline" />
			<div class="posts-wrapper">
				<ul class="posts-list">
					<template
						v-for="(post, index) in posts"
						:key="post._path">
						<li class="post-card">
							<div class="post-wrap">
								<NuxtLink
									class="post-title"
									:to="'/blog' + post._path">
									<h2>{{ post.title }}</h2>
								</NuxtLink>
								<p>{{ post.summary }}</p>
								<div class="post-extraInfo">
									<span
										>{{ dateFormatter(post.date).year }}/{{ dateFormatter(post.date).month }}/{{
											dateFormatter(post.date).date
										}}</span
									>
									<!-- <NuxtLink :to="'/blog' + post._path" class="post-link">Read more 
                  <img src="/arrow-right.svg" alt="">
                  </NuxtLink> -->
								</div>
							</div>
						</li>
						<Separator :class="index % 2 !== 0 ? 'incline pink' : 'decline gray'" />
					</template>
				</ul>
				<!-- <span class="message" v-if="posts.length >= totalNumOfPosts">Oops, we're all out of posts.</span> -->
			</div>
		</main>
	</Layout>
</template>

<style scoped lang="scss">
@import '../../global.scss';

.blog-hero {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
}

.hero-wrapper {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	max-width: 1000px;
	padding-top: 4rem;
	padding-bottom: 2rem;
	z-index: 2;
}

.hero-miniWrap {
	display: flex;
	flex-direction: column;
}

.blog-title {
	margin-block: 0;
}

.search-wrapper {
	margin-top: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	input,
	select {
		font-weight: 600;
		font-size: 1.1rem;
		border: none;
		background-color: #fff;
		color: var(--primary-accent);
	}

	input::placeholder {
		color: var(--primary-accent);
		opacity: 1;
	}

	//Removes the webkit browser default styles
	input,
	select {
		-webkit-appearance: none;
	}

	select {
		width: 100%;
		cursor: pointer;
	}

	.filter-group::after {
		content: url('/arrow-down.svg');
		color: black;
		width: 0.8rem;
		height: 0.8rem;
		position: absolute;
		transform: translate(5%, 20%);
		right: 1rem;
		pointer-events: none;
	}

	button {
		@extend %btn;
		padding: 0.6rem 1rem;
		color: var(--primary-accent);
		background-color: #fff;
	}

	.search-group,
	.filter-group {
		display: flex;
		background-color: #fff;
		padding: 0.6rem 1rem;
		border-radius: 10px;
		position: relative;
	}

	.search-icon,
	.filter-icon {
		font-size: 24px;
		margin-right: 0.7rem;
	}
}

.hero-img {
	display: none;
}

.posts-wrapper {
	display: flex;
	flex-direction: column;
	gap: 5rem;
	padding-bottom: 3rem;
}

.posts-list {
	list-style: none;
	display: flex;
	flex-direction: column;
}

.posts-list > li + div {
	margin-bottom: 0;
}

li.post-card:nth-of-type(2n) {
	background-image: url(/grainy_texture.png),
		linear-gradient(var(--secondary-light), var(--secondary-light));
	padding-block: 3rem;
	padding: 4rem 0 3rem 0;
}

.post-wrap {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin: 0 auto;
	max-width: 1000px;
	padding: 6rem 2rem 2rem 2rem;
	position: relative;
	z-index: 2;
}

.post-title {
	color: var(--font-primary);
}

.post-extraInfo {
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
}

// .message {
// 	text-align: center;
// 	color: var(--primary-accent);
// 	font-size: 1.3rem;
// 	font-weight: 500;
// }

@media (min-width: 800px) {
	.hero-img {
		display: unset;
		height: 280px;
	}
}
</style>
