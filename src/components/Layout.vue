<script setup>
//Created a custom layout component to be able to use named slots
defineOptions({
	inheritAttrs: false,
});

const attrs = useAttrs();
//toggles the color class according to the attribute passed
const headerWrap = computed(() => ({
	[attrs.navBackgroundColor]: isNavbarVisible.value,
	'header-wrap': true,
}));

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const isNavbarVisible = ref(false);
const isLangVisible = ref(false);

const toggleLangs = () => {
	isLangVisible.value = !isLangVisible.value;
};
const toggleNavbar = () => {
	isNavbarVisible.value = !isNavbarVisible.value;
};

const languages = ref(
	locales.value.reduce(
		(acc, lang) => {
			const obj = {
				name: lang.name,
				code: lang.code,
				icon: lang.code + '.svg',
			};

			if (lang.code === locale.value) {
				acc.selected = obj;
			} else {
				acc.available = [...acc.available, obj];
			}

			return acc;
		},
		{
			selected: {},
			available: [],
		},
	),
);

//Date for footer
let now = new Date();
let currentYear = now.getFullYear();
</script>

<template>
	<header
		id="header"
		:class="`${$attrs.headerBackground}`">
		<div :class="headerWrap">
			<div class="header-navWrapper">
				<NuxtLink to="/">
					<img
						src="/logo.png"
						alt=""
						class="header-logo" />
				</NuxtLink>
				<div
					class="header-toggle"
					:class="{ 'header--active': isNavbarVisible }">
					<div
						class="header-trigger"
						tabindex="0"
						:aria-expanded="isNavbarVisible"
						role="button"
						aria-label="Toggle"
						@click="toggleNavbar"
						@keyup.enter="toggleNavbar"
						@keydown.space.prevent="toggleNavbar">
						<span class="header-icon"></span>
					</div>
					<!-- <div
						class="lang-wrapper"
						:class="{ hidden: isNavbarVisible }"
						tabindex="0"
						:aria-expanded="isLangVisible"
						@keydown.enter="toggleLangs"
						@keydown.space.prevent="toggleLangs">
						<div
							@click="toggleLangs"
							class="lang-select"
							:class="{ 'no-radius': isLangVisible }">
							<img
								:src="`/${languages.selected.icon}`"
								:alt="languages.selected.name"
								class="lang-flag" />
						<span> {{ languages.selected.name }}</span> 
							<img
								src="/arrow-down.svg"
								class="lang-arrow"
								alt="" />
						</div>
						<ul
							class="lang-list"
							:class="{ hidden: !isLangVisible }">
							<li
								v-for="lang in languages.available"
								class="lang-el">
								<NuxtLink
									:key="lang.code"
									:to="switchLocalePath(lang.code)">
									<img
										:src="`/${lang.icon}`"
										:alt="lang.name"
										class="lang-flag" />
								</NuxtLink>
							</li>
						</ul>
					</div> -->
					<nav
						id="nav"
						class="header-nav"
						:class="{ hidden: !isNavbarVisible }">
						<slot name="navLinks"> </slot>
					</nav>
				</div>
			</div>

			<Separator
				:styling="`decline ${$attrs.navBackgroundColor}`"
				:class="{ hidden: !isNavbarVisible }"
				id="navTransitionEl">
			</Separator>
		</div>
	</header>
	<slot name="hero"></slot>
	<slot></slot>

	<footer>
		<div class="footer-wrapper">
			<small class="footer-copy">Copyright ©{{currentYear}} Ivona Josipovic</small>
			<a href="#">
				<component
					class="footer-icon"
					is="IconsCircle" />
			</a>
		</div>
	</footer>
</template>

<style lang="scss">
@import '../global.scss';

header {
	.header-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.header-navWrapper {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 2rem 1rem 1rem 1rem;
		max-width: 1000px;
	}

	.header-logo {
		display: block;
		height: 30px;
		z-index: 2;
		position: relative;
	}

	.header-toggle {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		justify-content: end;
	}

	.lang-wrapper {
		position: relative;
		width: 100%;

		.lang-select {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0.15rem 0.7rem;
			background-color: #fff;
			outline: 2px solid var(--primary-accent);
			border-radius: 10px;
			width: 4.2rem;
		}

		.no-radius {
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			border-bottom-left-radius: 0px;
			border-bottom-right-radius: 0px;
		}

		a {
			text-decoration: none;
			color: black;
			display: flex;
			justify-content: start;
		}

		.lang-list {
			list-style: none;
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;

			li {
				outline: 2px solid var(--primary-accent);
				border-top: 0px;
				background-color: #fff;
				padding: 0.15rem 0 0.15rem 0.7rem;
			}

			li:last-of-type {
				border-bottom-left-radius: 10px;
				border-bottom-right-radius: 10px;
			}
		}

		.lang-arrow {
			height: 0.6rem;
		}

		.lang-flag {
			height: 1.5rem;
		}
	}

	.header-nav {
		order: 1;
	}

	.header-trigger {
		cursor: pointer;
		display: inline;
		order: 2;
		z-index: 2;
	}

	.header-icon {
		display: inline-block;
		width: 30px;
		height: 5px;
		background-color: var(--primary-accent);
		transition-property: background-color, transform;
		transition-duration: 300ms;

		&:before,
		&:after {
			content: '';
			display: block;
			width: 30px;
			height: 5px;
			position: absolute;
			background: var(--primary-accent);
			transition-property: margin, transform;
			transition-duration: 300ms;
		}

		&:before {
			margin-top: -10px;
		}

		&:after {
			margin-top: 10px;
		}
	}

	.header--active .header-icon {
		background: rgba(0, 0, 0, 0);
		height: 2px;

		&:before {
			margin-top: 0;
			transform: rotate(45deg);
		}

		&:after {
			margin-top: 0;
			transform: rotate(-45deg);
		}
	}

	.header-links {
		list-style: none;
		display: flex;
		flex-direction: column;
		align-items: end;
		gap: 0.6rem;
		position: relative;
		z-index: 2;

		a {
			text-decoration: none;
			font-size: 1.25rem;
			font-weight: 500;
			color: var(--primary-accent);
		}
	}

	.decline {
		margin-top: calc(var(--spacing) * -1);
	}

	@media (min-width: 850px) {
		.header-links {
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			gap: 1rem;
			list-style: none;

			a {
				text-decoration: none;
				color: var(--primary-accent);
				font-size: 1.5rem;
			}
		}
	}

	@media (min-width: 1200px) {
		.header-navWrapper {
			padding: 3rem 0rem 0.5rem 0rem;
		}
	}
}

footer {
	.footer-wrapper {
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding-block: 1.8rem;
	}

	.footer-icon {
		font-size: 2.4rem;
		color: var(--primary-accent);
		cursor: pointer;
		margin-bottom: -3px;
	}
}
</style>
