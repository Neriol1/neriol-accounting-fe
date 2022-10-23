import { defineComponent, ref } from "vue"
export const Welcome = defineComponent({
	setup: (props, context) => {
		return () => (
			<>
				<div>
					<router-view></router-view>
				</div>
			</>
		)
	},
})
