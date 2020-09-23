import { defineComponent, h, reactive } from '@vue/runtime-core'
import Map from '../components/Map';
import Plane from "../components/Plane"
import Enermy from '../components/Enermy'
import { game } from "../../Game"

function useCreatePlaneInfo() {
    const planeInfo = reactive({ x: 200, y: 500 });
    const speed = 5;
    addEventListener("keydown", (e) => {
        switch (e.code) {
            case "ArrowUp":
                planeInfo.y -= speed;
                break;
            case "ArrowDown":
                planeInfo.y += speed;
                break;
            case "ArrowLeft":
                planeInfo.x -= speed;
                break;
            case "ArrowRight":
                planeInfo.x += speed;
                break;
            default:
                break;
        }
    })

    return {
        planeInfo
    }
}

function useCreateEnermyInfo() {
    const enermys = reactive([{ x: 50, y: 0 }]);
    return { enermys };
}

export default defineComponent({
    setup() {
        const { planeInfo } = useCreatePlaneInfo();

        const { enermys } = useCreateEnermyInfo();

        const handleTicker = () => {
            enermys.forEach((info) => {
                info.y++;
            })
        }

        game.ticker.add(handleTicker);

        return {
            planeInfo,
            enermys
        }
    },
    render(ctx) {
        const createEnermyPlane = () => {
            return ctx.enermys.map(info => {
                return h(Enermy, { x: info.x, y: info.y });
            })
        }
        return h("Container", [h(Map), h(Plane, { x: ctx.planeInfo.x, y: ctx.planeInfo.y }), ...createEnermyPlane()])
    }
})