import { computed, defineComponent, h, ref } from '@vue/runtime-core'
import StartPage from './src/page/StartPage';
import GamePage from './src/page/GamePage';

export default defineComponent({
    setup(props, ctx) {
        const currentPageName = ref("StartPage");

        const currentPage = computed(() => {
            if (currentPageName.value === "StartPage") {
                return StartPage;
            } else if (currentPageName.value === "GamePage") {
                return GamePage;
            }
        })

        return {
            currentPageName,
            currentPage
        }
    },
    render(ctx) {
        return h("Container", [h(ctx.currentPage, {
            onChangePage(page) {
                ctx.currentPageName = page;
            }
        }
        )]);
    }
})