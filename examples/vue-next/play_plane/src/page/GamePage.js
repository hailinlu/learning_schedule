import { defineComponent, h, reactive, onMounted, onUnmounted } from '@vue/runtime-core'
import Map from '../components/Map';
import Plane from "../components/Plane"
import Enermy from '../components/Enermy'
import Bullet from '../components/Bullet'
import { game } from "../../Game"
import { hitObjectfunc } from '../utils/index'

function useCreatePlaneInfo() {
    const planeInfo = reactive({ x: 200, y: 500, width: 258, height: 364 });
    const speed = 10;
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
    const enermys = reactive([{ x: 50, y: 0, width: 308, height: 207 }]);
    return { enermys };
}

function useCreateBullets() {
    const bullets = reactive([])

    const addBulltes = (info) => {
        bullets.push(info);
    }

    return { bullets, addBulltes }
}

function useFighting(planeInfo, enermys, bullets, emit) {

    let enermyInterval = setInterval(() => {
        enermys.push({ x: Math.ceil(Math.random() * 500), y: 0, width: 308, height: 207 })
    }, 1000);

    const handleTicker = () => {
        enermys.forEach((info) => {
            info.y++;
        })

        enermys.forEach((info, enermyIndex) => {
            if (hitObjectfunc(info, planeInfo)) {
                emit("changePage", "EndPage");
            }

            bullets.forEach((binfo, bindex) => {
                if (hitObjectfunc(info, binfo)) {
                    enermys.splice(enermyIndex, 1);
                    bullets.splice(bindex, 1)
                }
            })
        })


        bullets.forEach(info => {
            info.y--;
        })
    }

    game.ticker.add(handleTicker);

    onMounted(() => {
        game.ticker.add(handleTicker);
    })

    onUnmounted(() => {
        game.ticker.remove(handleTicker);
        clearInterval(enermyInterval)
    })
}

export default defineComponent({
    setup(props, { emit }) {
        const { planeInfo } = useCreatePlaneInfo();

        const { enermys } = useCreateEnermyInfo();

        const { bullets, addBulltes } = useCreateBullets();

        const onAttack = (params) => {
            addBulltes({ x: params.x + planeInfo.width / 2, y: params.y, width: 61, height: 99 })
        }

        useFighting(planeInfo, enermys, bullets, emit);

        return {
            planeInfo,
            enermys,
            bullets,
            onAttack
        }
    },
    render(ctx) {
        const createEnermyPlane = () => {
            return ctx.enermys.map(info => {
                return h(Enermy, { x: info.x, y: info.y });
            })
        }

        const createBulltes = () => {
            return ctx.bullets.map(info => {
                return h(Bullet, { x: info.x, y: info.y })
            })
        }
        return h("Container", [h(Map), h(Plane, { x: ctx.planeInfo.x, y: ctx.planeInfo.y, onAttack: ctx.onAttack }), ...createEnermyPlane(), ...createBulltes()])
    }
})