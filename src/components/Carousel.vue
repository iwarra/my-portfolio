<script setup>
import { useScroll } from "@vueuse/core";

const emit = defineEmits(["arrowClicked"]);
const props = defineProps(["selector"]);
const ul = ref(null);
const { arrivedState } = useScroll(ul);
const { left, right } = toRefs(arrivedState);
</script>

<template>
	<div>
		<ClientOnly>
			<img
				src="/arrow-left.svg"
				alt="arrow pointing left"
				role="button"
				:aria-disabled="left"
				aria-label="previous"
				class="arrow-icon"
				@click="$emit('arrowClicked', 'left', ul)" />
		</ClientOnly>
		<ul
			:class="selector"
			ref="ul">
			<slot></slot>
		</ul>
		<ClientOnly>
			<img
				src="/arrow-right.svg"
				alt="arrow pointing right"
				role="button"
				:aria-disabled="right"
				aria-label="next"
				class="arrow-icon"
				@click="$emit('arrowClicked', 'right', ul)" />
		</ClientOnly>
	</div>
</template>

<style scoped lang="scss">
.arrow-icon[aria-disabled="true"] {
	filter: grayscale(80%);
	opacity: 65%;
	cursor: default;
}

.slider {
	list-style: none;
	display: flex;
	flex-direction: row;
	gap: 1rem;
	flex-wrap: nowrap;
	overflow: auto;
	scroll-behavior: smooth;
	scroll-snap-type: x mandatory;
	scrollbar-width: none;
	-webkit-overflow-scrolling: touch;
	-ms-overflow-style: -ms-autohiding-scrollbar;
}

.slider::-webkit-scrollbar {
  display: none;
}
</style>
