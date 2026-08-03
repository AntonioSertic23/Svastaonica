<script setup>
import { ref, watch } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";

const emit = defineEmits(["findData"]);

const props = defineProps({
  isForNavbar: Boolean,
  /** Stay on current page and only emit the query (used on Gallery). */
  inline: Boolean,
  placeholder: {
    type: String,
    default: "",
  },
});

const route = useRoute();
const text = ref(
  props.inline ? "" : route.params.search && route.params.search.trim()
    ? route.params.search
    : ""
);

watch(
  () => route.params.search,
  (val) => {
    if (!props.inline) {
      text.value = val && String(val).trim() ? val : "";
    }
  }
);

function Search() {
  const query = (text.value || "").trim();
  emit("findData", text);

  if (props.inline) {
    return;
  }

  if (query !== "") {
    router.push({ path: "/search/" + query });
  } else {
    router.push({ path: "/search/ " });
  }

  if (props.isForNavbar) {
    text.value = "";
  }
}

function onInput() {
  if (props.inline) {
    emit("findData", text);
  }
}
</script>

<template>
  <div class="input-group search-div" :class="{ 'me-4': isForNavbar }">
    <input
      type="text"
      class="form-control"
      v-model="text"
      :placeholder="placeholder"
      @input="onInput"
      @keyup.enter="Search()"
      :class="isForNavbar ? '' : 'search-input-page'"
    />
    <button
      class="btn search-btn px-3"
      type="button"
      id="button-addon2"
      @click="Search()"
    >
      <i
        class="fa fa-search"
        aria-hidden="true"
        :class="isForNavbar ? '' : 'search-btn-page'"
      ></i>
    </button>
  </div>
</template>

<style scoped>
.search-div {
  box-shadow: var(--shadow-soft);
  border-radius: var(--radius);
  overflow: hidden;
}

.search-div input {
  border: none;
}
.form-control:focus {
  border: none;
  z-index: 0 !important;
  box-shadow: none !important;
}

.search-btn:focus {
  box-shadow: none !important;
}

.search-btn {
  background-color: var(--color-lavender);
  color: var(--color-text);
  border: none;
}
.search-btn:hover {
  background-color: var(--color-lavender-hover);
  color: var(--color-text);
}

.search-input-page {
  font-size: 20px;
  padding: 1rem;
}

.search-btn-page {
  font-size: 20px;
}

@media (max-width: 991.98px) {
  .search-input-page {
    font-size: 20px;
    padding: 0.7rem;
  }

  .search-btn-page {
    font-size: 20px;
  }
}
</style>
