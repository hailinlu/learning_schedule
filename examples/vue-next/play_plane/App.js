import { computed, defineComponent, h, ref } from '@vue/runtime-core'
import StartPage from './src/page/StartPage';
import GamePage from './src/page/GamePage';
import EndPage from './src/page/EndPage';

export default defineComponent({
    setup(props, ctx) {
        const currentPageName = ref("StartPage");

        const currentPage = computed(() => {
            if (currentPageName.value === "StartPage") {
                return StartPage;
            } else if (currentPageName.value === "GamePage") {
                return GamePage;
            } else {
                return EndPage;
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