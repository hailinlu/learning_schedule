import { defineComponent, h } from '@vue/runtime-core'
import endPageImg from '../assets/endPage.jpg'
import reStartBtnImg from '../assets/restartBtn.png';

export default defineComponent({
    setup(props, ctx) {
        const onClick = () => {
            ctx.emit("changePage", "GamePage")
        }

        return {
            onClick
        }
    },
    render(ctx) {
        return h("Container", [h("Sprite", { texture: endPageImg }), h("Sprite", { texture: reStartBtnImg, x: 225, y: 518, interactive: true, onClick: ctx.onClick })])
    }
})