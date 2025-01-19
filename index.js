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
            canvas: document.querySelector("#canvas__video_0"),
            context: document.querySelector("#canvas__video_0").getContext("2d"),
            videoImages: []
        },
        values: {
            videoImageCount: 50,
            videoSequence: [1, 50],
            video_opacity: [1, 0, { start: 0.7, end: 0.9 }],
            textA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
            textB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
            textC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
            textD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
            textA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
            textB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
            textC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
            textD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
            textA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
            textB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
            textC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
            textD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
            textA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
            textB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
            textC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
            textD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
        }
    }, {
        // 1
        type: 'normal',
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
            container: document.querySelector("#ss__2"),
            textA: document.querySelector("#ss__2 .text_a"),
            textB: document.querySelector("#ss__2 .text_b"),
            textC: document.querySelector("#ss__2 .text_c"),
            pinB: document.querySelector("#ss__2 .text_b .pin"),
            pinC: document.querySelector("#ss__2 .text_c .pin"),
            canvas: document.querySelector("#canvas__video_1"),
            context: document.querySelector("#canvas__video_1").getContext("2d"),
            videoImages: []
        },
        values: {
            videoImageCount: 72,
            videoSequence: [1, 72],
            video_opacity_in: [0, 1, { start: 0.1, end: 0.3 }],
            video_opacity_out: [1, 0, { start: 0.7, end: 0.9 }],
            textA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
            textB_translateY_in: [30, 0, { start: 0.4, end: 0.5 }],
            textC_translateY_in: [30, 0, { start: 0.6, end: 0.7 }],
            textA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
            textB_opacity_in: [0, 1, { start: 0.4, end: 0.5 }],
            textC_opacity_in: [0, 1, { start: 0.6, end: 0.7 }],
            textA_translateY_out: [0, -20, { start: 0.2, end: 0.3 }],
            textB_translateY_out: [0, -20, { start: 0.5, end: 0.6 }],
            textC_translateY_out: [0, -20, { start: 0.7, end: 0.8 }],
            textA_opacity_out: [1, 0, { start: 0.2, end: 0.3 }],
            textB_opacity_out: [1, 0, { start: 0.5, end: 0.6 }],
            textC_opacity_out: [1, 0, { start: 0.7, end: 0.8 }],
            pinB_scaleY: [0.5, 1, { start: 0.4, end: 0.5 }],
            pinC_scaleY: [0.5, 1, { start: 0.6, end: 0.7 }],
            pinB_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
            pinC_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
            pinB_opacity_out: [1, 0, { start: 0.5, end: 0.6 }],
            pinC_opacity_out: [1, 0, { start: 0.7, end: 0.8 }]
        }
    },{
        // 3
        type: 'sticky',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
            container: document.querySelector("#ss__3"),
            canvasCaption: document.querySelector("#ss__3 .canvas__caption"),
            canvas: document.querySelector("#canvas__image_0"),
            context: document.querySelector("#canvas__image_0").getContext("2d"),
            images: [],
        },
        values: {
            imagePath: ["./assets/image/eclipse.jpg", "./assets/image/moon.jpg"],
            rectLeftX: [0, 0, { start: 0, end: 0 }],
            rectRightX: [0, 0, { start: 0, end: 0 }],
            blendHeight: [0 , 0, { start: 0, end: 0 }],
            canvas_scale: [0 , 0, { start: 0, end: 0 }],
            canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
            canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
            rectStartY: 0,
        }
    }];

    // 캔버스
    const setCanvasImages = () => {
        // Video 0 세팅
        let imageElem_0;
        for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
            imageElem_0 = document.createElement("img");
            imageElem_0.src = `./assets/video/particles/${i + 1}.png`;
            sceneInfo[0].objs.videoImages.push(imageElem_0);
        }

        // Video 1 세팅
        let imageElem_1;
        for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
            imageElem_1 = document.createElement("img");
            imageElem_1.src = `./assets/video/spaceship/${i + 1}.png`;
            sceneInfo[2].objs.videoImages.push(imageElem_1);
        }

        // Image 세팅
        let imageElem_2
        for (let i = 0; i < sceneInfo[3].values.imagePath.length; i++) {
            imageElem_2 = document.createElement("img");
            imageElem_2.src = sceneInfo[3].values.imagePath[i];
            sceneInfo[3].objs.images.push(imageElem_2);
        }
    }
    setCanvasImages();

    // 헤더 sticky 핸들러
    const handleHeader = () => {
        if (currentY > 50) {
            document.body.classList.add("header-sticky");
        } else {
            document.body.classList.remove("header-sticky");
        }
    };

    //  레이아웃 초기화
    const setLayout = () => {
        //  각 스크롤 섹션의 높이 세팅
        // type === normal 경우 기본 컨테이너 높이 적용
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

        // Set canvas size
        const widthRatio = window.innerWidth / 1920;
        sceneInfo[0].objs.canvas.style.transform = `translate(-50%, -50%) scale(${widthRatio})`;
        sceneInfo[2].objs.canvas.style.transform = `translate(-50%, -50%) scale(${widthRatio})`;
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
                // Video Animation Play
                let sequence_0 = Math.round(calcValues(values.videoSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence_0], 0, 0);
                // remove canvas
                objs.canvas.style.opacity = calcValues(values.video_opacity, currentYOffset);

                // Text Animation Play
                if (currentScrollRatio <= 0.22) {
                    // in
                    objs.textA.style.opacity = calcValues(values.textA_opacity_in, currentYOffset);
                    objs.textA.style.transform = `translate3d(0, ${calcValues(values.textA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.textA.style.opacity = calcValues(values.textA_opacity_out, currentYOffset);
                    objs.textA.style.transform = `translate3d(0, ${calcValues(values.textA_translateY_out, currentYOffset)}%, 0)`;
                }

                if (currentScrollRatio <= 0.42) {
                    // in
                    objs.textB.style.opacity = calcValues(values.textB_opacity_in, currentYOffset);
                    objs.textB.style.transform = `translate3d(0, ${calcValues(values.textB_translateY_out, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.textB.style.opacity = calcValues(values.textB_opacity_out, currentYOffset);
                    objs.textB.style.transform = `translate3d(0, ${calcValues(values.textB_translateY_out, currentYOffset)}%, 0)`;
                }

                if (currentScrollRatio <= 0.62) {
                    // in
                    objs.textC.style.opacity = calcValues(values.textC_opacity_in, currentYOffset);
                    objs.textC.style.transform = `translate3d(0, ${calcValues(values.textC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.textC.style.opacity = calcValues(values.textC_opacity_out, currentYOffset);
                    objs.textC.style.transform = `translate3d(0, ${calcValues(values.textC_translateY_out, currentYOffset)}%, 0)`;
                }

                if (currentScrollRatio <= 0.82) {
                    // in
                    objs.textD.style.opacity = calcValues(values.textD_opacity_in, currentYOffset);
                    objs.textD.style.transform = `translate3d(0, ${calcValues(values.textD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.textD.style.opacity = calcValues(values.textD_opacity_out, currentYOffset);
                    objs.textD.style.transform = `translate3d(0, ${calcValues(values.textD_translateY_out, currentYOffset)}%, 0)`;
                }
                break;

            case 1:
                break;

            case 2:
                // Video Animation Play
                let sequence_1 = Math.round(calcValues(values.videoSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence_1], 0, 0);
                // remove canvas
                if (currentScrollRatio <= 0.5) {
                    // in
                    objs.canvas.style.opacity = calcValues(values.video_opacity_in, currentYOffset);
                } else {
                    // out
                    objs.canvas.style.opacity = calcValues(values.video_opacity_out, currentYOffset);
                }

                // Text Animation Play
                if (currentScrollRatio <= 0.25) {
                    // in
                    objs.textA.style.opacity = calcValues(values.textA_opacity_in, currentYOffset);
                    objs.textA.style.transform = `translate3d(0, ${calcValues(values.textA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.textA.style.opacity = calcValues(values.textA_opacity_out, currentYOffset);
                    objs.textA.style.transform = `translate3d(0, ${calcValues(values.textA_translateY_out, currentYOffset)}%, 0)`;
                }

                if (currentScrollRatio <= 0.55) {
                    // in
                    objs.textB.style.transform = `translate3d(0, ${calcValues(values.textB_translateY_in, currentYOffset)}%, 0)`;
                    objs.textB.style.opacity = calcValues(values.textB_opacity_in, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.textB.style.transform = `translate3d(0, ${calcValues(values.textB_translateY_out, currentYOffset)}%, 0)`;
                    objs.textB.style.opacity = calcValues(values.textB_opacity_out, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }

                if (currentScrollRatio <= 0.75) {
                    // in
                    objs.textC.style.transform = `translate3d(0, ${calcValues(values.textC_translateY_in, currentYOffset)}%, 0)`;
                    objs.textC.style.opacity = calcValues(values.textC_opacity_in, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.textC.style.transform = `translate3d(0, ${calcValues(values.textC_translateY_out, currentYOffset)}%, 0)`;
                    objs.textC.style.opacity = calcValues(values.textC_opacity_out, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }

                // 캔버스 3 미리 그리기
                if (currentScrollRatio > 0.9) {
                    const objs = sceneInfo[3].objs;
                    const values = sceneInfo[3].values;

                    // Canvas image 가로, 세로 window에 fit 처리
                    const widthRatio = window.innerWidth / objs.canvas.width;
                    const heightRatio = window.innerHeight / objs.canvas.height;

                    // Canvas 사이즈 조정
                    // Canvas 기본 사이즈보다 홀쭉하면 세로 크키를 따르고, 납작하면 가로 크기를 따른다.
                    let canvasScaleRatio = widthRatio <= heightRatio ? heightRatio : widthRatio;
                    objs.canvas.style.transform = `scale(${canvasScaleRatio})`;

                    // Draw image
                    objs.context.drawImage(objs.images[0], 0, 0);
                    objs.context.fillStyle = "rgb(10, 10, 10)";

                    // 캔버스 좌우 여백 계산
                    const originCanvasWidth = document.body.offsetWidth / canvasScaleRatio;
                    const originCanvasHeight = window.innerHeight / canvasScaleRatio;
                    const rectWidth = originCanvasWidth * 0.15;

                    // 왼쪽 사각형 x, y 좌표 초기값 설정
                    values.rectLeftX[0] = (objs.canvas.width - originCanvasWidth) / 2;
                    values.rectLeftX[1] = values.rectLeftX[0] - rectWidth;
                    // 오른쪽 사각형 x, y 좌표 초기값 설정
                    values.rectRightX[0] = values.rectLeftX[0] + originCanvasWidth - rectWidth;
                    values.rectRightX[1] = values.rectRightX[0] + rectWidth;

                    // 사각형 초기값 그리기
                    objs.context.fillRect(
                        parseInt(values.rectLeftX[0]),
                        0,
                        parseInt(rectWidth),
                        objs.canvas.height
                    );
                    objs.context.fillRect(
                        parseInt(values.rectRightX[0]),
                        0,
                        parseInt(rectWidth),
                        objs.canvas.height
                    );
                }

                break;

            case 3:
                // Canvas image 가로, 세로 window에 fit 처리
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;

                // Canvas 사이즈 조정
                // Canvas 기본 사이즈보다 홀쭉하면 세로 크키를 따르고, 납작하면 가로 크기를 따른다.
                let canvasScaleRatio = widthRatio <= heightRatio ? heightRatio : widthRatio;
                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;

                // Draw image
                objs.context.drawImage(objs.images[0], 0, 0);
                objs.context.fillStyle = "rgb(10, 10, 10)";

                // 캔버스 좌우 여백 계산
                const originCanvasWidth = document.body.offsetWidth / canvasScaleRatio;
                const originCanvasHeight = window.innerHeight / canvasScaleRatio;
                const rectWidth = originCanvasWidth * 0.15;

                if (values.rectStartY === 0) {
                    values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
                    values.rectLeftX[2].start = (window.innerHeight / 3) / currentScrollHeight;
                    values.rectRightX[2].start = (window.innerHeight / 3) / currentScrollHeight ;
                    values.rectLeftX[2].end = values.rectStartY / currentScrollHeight;
                    values.rectRightX[2].end = values.rectStartY / currentScrollHeight;
                }

                // 왼쪽 사각형 x, y 좌표 초기값 설정
                values.rectLeftX[0] = (objs.canvas.width - originCanvasWidth) / 2;
                values.rectLeftX[1] = values.rectLeftX[0] - rectWidth;
                // 오른쪽 사각형 x, y 좌표 초기값 설정
                values.rectRightX[0] = values.rectLeftX[0] + originCanvasWidth - rectWidth;
                values.rectRightX[1] = values.rectRightX[0] + rectWidth;

                // 사각형 이동 애니메이션 처리
                objs.context.fillRect(
                    parseInt(calcValues(values.rectLeftX, currentYOffset)),
                    0,
                    parseInt(rectWidth),
                    objs.canvas.height
                );
                objs.context.fillRect(
                    parseInt(calcValues(values.rectRightX, currentYOffset)),
                    0,
                    parseInt(rectWidth),
                    objs.canvas.height
                );

                let step;
                // 캔버스 이미지 1이 상단에 닿기 전
                if (currentScrollRatio < values.rectLeftX[2].end) {
                    step = 1;
                    objs.canvas.classList.remove("sticky-canvas");

                } else {
                    // 캔버스 이미지 1이 상단에 닿은 후
                    step = 2;

                    // 이미지 블랜드 처리
                    values.blendHeight[0] = 0;
                    values.blendHeight[1] = objs.canvas.height;
                    values.blendHeight[2].start = values.rectLeftX[2].end;    // 블렌드 애니메이션 시작 시점
                    values.blendHeight[2].end = values.blendHeight[2].start + 0.2;  // 블렌드 애니메이션 종료 시점

                    const blendHeight = calcValues(values.blendHeight, currentYOffset);

                    objs.context.drawImage(
                        objs.images[1],
                        0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
                        0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight
                    );

                    // 캔버스 이미지 1 sticky 처리
                    objs.canvas.classList.add("sticky-canvas");
                    objs.canvas.style.top = `-${(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;

                    // 캔버스 이미지 2 스케일 축소
                    if (currentScrollRatio > values.blendHeight[2].end) {
                        values.canvas_scale[0] = canvasScaleRatio;
                        values.canvas_scale[1] = document.body.offsetWidth / (objs.canvas.width * 1.5);
                        values.canvas_scale[2].start = values.blendHeight[2].end;
                        values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

                        objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
                        objs.canvas.style.marginTop = 0;
                    }

                    // 캔버스 sticky 처리 제거, martin-top 값 부여
                    if (currentScrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0) {
                        objs.canvas.classList.remove("sticky-canvas");
                        objs.canvas.style.marginTop = `${currentScrollHeight * 0.4}px`;

                        // 캔버스 캡션 초기값 지정
                        values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
                        values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;
                        objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);

                        values.canvasCaption_translateY[2].start = values.canvas_scale[2].end;
                        values.canvasCaption_translateY[2].end = values.canvasCaption_translateY[2].start + 0.1;
                        objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`;
                    }
                }

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
        handleHeader();
    })

    // Update scene height if window is reloaded.
    window.addEventListener('load', () => {
        setLayout();
        // set video first image
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
    });
    // Update scene height if window size is changed.
    window.addEventListener('resize', setLayout);

})();