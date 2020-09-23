import { defineComponent, h, reactive, toRefs } from "@vue/runtime-core"
import planeImg from '../assets/plane.png';

export default defineComponent({
    props: ["x", "y"],
    setup(props, ctx) {
        const { x, y } = toRefs(props);
        return {
            x,
            y
        }
    },
    render(ctx) {
        return h("Container", [h("Sprite", { texture: planeImg, x: ctx.x, y: ctx.y })]);
    }
})