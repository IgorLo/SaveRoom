# Select: allow an option-only dropdown without an empty placeholder

**Type:** missing capability

**Consumer project and user task:** Save Room, a two-choice sort dropdown. The default sort is “По прикольности”; the menu should contain only that and “По дате”.

**Package name and exact version:** `svelte-ascii-ui@0.2.0`.

**Component, size, theme, relevant props:** `Select`, size `s`, custom dark `Theme`, `options` with two values, `bind:value` initialized to `author`. No form submission in this consumer.

**Browser / OS / viewport / input method:** Chromium via Playwright on Windows, 1440px and 360px viewports, pointer and keyboard. Other browsers not checked.

**Expected result and why it matters:** When a valid initial value is provided and no empty choice is wanted, the closed control shows that value and its menu contains exactly the two supplied options. A separate required/optional setting should govern whether an empty value is valid in forms; a default selection should not implicitly force an empty option into the menu.

**Actual result and practical impact:** The component always renders `<option value="">Choose an option</option>` before supplied options. It remains available even when `value` is `author`. Users can switch from a meaningful sort mode to an empty value, and the English placeholder appears in the Russian menu. `required` can make a submitted empty value invalid but does not remove the extra choice.

**Steps to reproduce:**

1. Render the public `Select` with `value = 'author'` and the two options below.
2. Open the native dropdown.
3. Observe the additional “Choose an option” choice; select it and observe `value === ''`.

**Minimal example using public exports:**

```svelte
<script lang="ts">
	import { Select, Theme } from 'svelte-ascii-ui';

	let sortBy = $state('author');
	const options = [
		{ value: 'author', label: 'По прикольности' },
		{ value: 'date', label: 'По дате' }
	];
</script>

<Theme>
	<label for="sort">Сортировка</label>
	<Select id="sort" size="s" {options} bind:value={sortBy} />
</Theme>
```

**Screenshot or recording:** Not attached. The browser test and installed component source confirm the third option; a screenshot can be added if requested.

**Diagnosis:**

- Public options and app-level fixes tried: The public API offers `value`, `options`, `placeholder`, and native `required`. `placeholder=""` only changes the empty option's label; `required` affects validation rather than removing it. The consumer already supplies a valid default through `bind:value`.
- Why the remaining problem belongs to the kit: `Select.svelte` unconditionally inserts the empty `<option>`. No public prop controls its presence. Styling or removing a descendant from the app would depend on private kit markup.
- Related issue / duplicate search result: `gh issue list -R IgorLo/svelte-ascii-ui --state all --search "Select placeholder"` returned none. A broader `select` search returned unrelated closed issue #8.
- Existing workaround: None introduced in Save Room; it retains the extra option until a public API is available.

**Proposed acceptance checks:**

- With a valid initial value and explicit opt-out of the placeholder, the closed control and native option list contain only the supplied choices.
- With an optional value and placeholder enabled, users can choose and return to the empty value.
- With `required`, an empty choice fails native form validation when present; a valid preselected choice passes.
- Changing the bound value and resetting a form keep selection and displayed text in sync.
- Existing consumers retain their current behavior unless they opt in to the new capability.

**Affected variants and possible regressions:** S/M/L sizes, controlled `bind:value`, native form reset and validation, loading and error states, disabled options, SSR/hydration, keyboard and touch. A change to the default placeholder behavior could break existing forms.

**Severity and evidence:** Minor product friction; observed third option in the rendered dropdown and unconditional option in installed version. No standards failure claimed.

**Suggested direction:** Consider an explicit way to omit the empty placeholder option, separately from native `required` and initial value. Exact prop shape and default behavior are for the kit maintainer to decide.
