'use strict';

(() => {
    let currentY = 0;  // Current scroll y offset
    let prevHeight = 0; // 이전 섹션 높이 합
    let currentScene = 0;   // 현재 화면에 보이는 scene
    let checkSceneChanged = false; // 새로운 섹션이 시작되면 true
    const sceneInfo = [{
        // 0
        type: 'sticky',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
            container: document.querySelector("#ss__0"),
            textA: document.querySelector("#ss__0 .text_a"),
            textB: document.querySelector("#ss__0 .text_b"),
            textC: document.querySelector("#ss__0 .text_c"),
            textD: document.querySelector("#ss__0 .text_d"),
        },
        values: {
            textA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
            textA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
            textA_opacity_out: [1, 0, { start: 0.25, end: 0.35 }],
            textA_translateY_out: [0, -20, { start: 0.25, end: 0.35 }],
            textB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
            textB_opacity_out: [],
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
        // type === normal인 경우 기본 컨테이너 높이 적용
        sceneInfo.forEach((scene) => {
            if (scene.type === "sticky") {
                scene.scrollHeight = scene.heightNum * window.innerHeight;
            } else if(scene.type === "normal") {
                scene.scrollHeight = scene.objs.container.offsetHeight;
            }

            scene.objs.container.style.height = `${scene.scrollHeight}px`;
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

    // Calculate animation option value
    const calcValues = (values, currentYOffset) => {
        let rv = 0;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight

        // 애니메이션의 시작, 종료 시점이 명시된 경우
        if (values.length === 3) {
            // start, end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;
            const partScrollRatio = (currentYOffset - partScrollStart) / partScrollHeight;

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
            // 범위 안
                rv = partScrollRatio * (values[1] - values[0]) + values[0];
            } else if (currentYOffset < partScrollStart) {
            // 범위 이전
                rv = values[0];
            } else if (currentYOffset > partScrollEnd) {
            // 범위 이후
                rv = values[1];
            }
        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }

        return rv;
    }

    // Control animation
    const playAnimation = () => {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = currentY - prevHeight;
        const currentScrollHeight = sceneInfo[currentScene].scrollHeight;
        const currentScrollRatio = currentYOffset / currentScrollHeight;

        switch (currentScene) {
            case 0:
                // CSS 세팅
                if (currentScrollRatio <= 0.22) {
                    // in
                    objs.textA.style.opacity = calcValues(values.textA_opacity_in, currentYOffset);
                    objs.textA.style.transform = `translateY(${calcValues(values.textA_translateY_in, currentYOffset)}%)`
                } else {
                    // out
                    objs.textA.style.opacity = calcValues(values.textA_opacity_out, currentYOffset);
                    objs.textA.style.transform = `translateY(${calcValues(values.textA_translateY_out, currentYOffset)}%)`
                }

                break;

            case 1:
                break;

            case 2:
                break;

            case 3:
                break;

            default:
                console.log("Error!");
        }
    }

    // Track current scene.
    const setCurrentScene = () => {
        checkSceneChanged = false;  // Scene이 넘어가는 시점 표기
        prevHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevHeight += sceneInfo[i].scrollHeight;
        }

        if (currentY > prevHeight + sceneInfo[currentScene].scrollHeight) {
            checkSceneChanged = true;   // Scene is changed
            currentScene++;
            // body에 현재 활성화된 scene class 지정
            document.body.setAttribute('class', `current-scene-${currentScene}`);
        }
        if (currentY < prevHeight) {
            checkSceneChanged = true;   // Scene is changed
            if (currentY === 0) return; // Safari Mobile 최상단 바운스 시 -1 값 방지
            currentScene--;
            // body에 현재 활성화된 scene class 지정
            document.body.setAttribute('class', `current-scene-${currentScene}`);
        }

        if (checkSceneChanged) return;  // Scene 변경 순간에는 애니메이션 함수 무시
        playAnimation();
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