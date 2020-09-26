import { defineComponent, h } from "@vue/runtime-core";
import startPageImg from "../assets/startPage.jpg";
import startBtnImg from "../assets/startBtn.png";

export default defineComponent({
  setup(props, ctx) {
    const onClick = () => {
      ctx.emit("changePage", "GamePage");
    };

    return {
      onClick,
    };
  },
  render(ctx) {
    return h("Container", [
      h("Sprite", { texture: startPageImg }),
      h("Sprite", {
        texture: startBtnImg,
        x: 225,
        y: 518,
        interactive: true,
        onClick: ctx.onClick,
      }),
    ]);
  },
});
