'use strict';

(() => {
    const sceneInfo = [{
        // 0
        type: 'sticky',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
            container: document.querySelector("#ss__0")
        }
    }, {
        // 1
        type: 'normal',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
            container: document.querySelector("#ss__1")
        }
    },{
        // 2
        type: 'sticky',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
            container: document.querySelector("#ss__2")
        }
    },{
        // 4
        type: 'sticky',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
            container: document.querySelector("#ss__3")
        }
    }];

    //  각 스크롤 섹션의 높이 세팅
    const setLayout = () => {
      sceneInfo.forEach((scene) => {
          scene.scrollHeight = scene.heightNum * window.innerHeight;
          scene.objs.container.style.height = `${scene.scrollHeight}px`
      });

        console.log(sceneInfo);
    }

    // Update scene height if window size is changed.
    window.addEventListener('resize', setLayout);

    setLayout();
})();