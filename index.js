'use strict';

(() => {
    let currentY = 0;  // Current scroll y offset
    let prevHeight = 0; // 이전 섹션 높이 합
    let currentScene = 0;   // 현재 화면에 보이는 scene
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

    //  레이아웃 초기화
    const setLayout = () => {
        //  각 스크롤 섹션의 높이 세팅
        sceneInfo.forEach((scene) => {
            scene.scrollHeight = scene.heightNum * window.innerHeight;
            scene.objs.container.style.height = `${scene.scrollHeight}px`
        });

        // 페이지 새로고침 시
        let totalHeight = 0;
        currentY = window.scrollY;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalHeight += sceneInfo[i].scrollHeight;
            if (totalHeight >= currentY) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute("class", `current-scene-${currentScene}`);
    }

    // Track current scene.
    const setCurrentScene = () => {
        prevHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevHeight += sceneInfo[i].scrollHeight;
        }

        if (currentY > prevHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            // body에 현재 활성화된 scene class 지정
            document.body.setAttribute('class', `current-scene-${currentScene}`);
        }
        if (currentY < prevHeight) {
            if (currentY === 0) return; // Safari Mobile 최상단 바운스 시 -1 값 방지
            currentScene--;
            // body에 현재 활성화된 scene class 지정
            document.body.setAttribute('class', `current-scene-${currentScene}`);
        }
    }

    window.addEventListener('scroll', () => {
        currentY = window.scrollY;
        setCurrentScene();
    })

    // Update scene height if window is reloaded.
    window.addEventListener('load', setLayout);
    // Update scene height if window size is changed.
    window.addEventListener('resize', setLayout);

})();