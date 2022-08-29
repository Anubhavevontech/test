let sceneToRender;
const cam = document.getElementById("move").value;
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);


const createScene = async () => {
    const scene = new BABYLON.Scene(engine);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));


    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.x = 2;
    box.position.y = 1;

    const fish = BABYLON.SceneLoader.ImportMesh(
        "",
        "./assets/",
        "fish.glb",
        scene,
        function (newMeshes) {
            newMeshes[0].scaling = new BABYLON.Vector3(1, 1, 1);
        }
    );
    //    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2,  1, -2, new BABYLON.Vector3(0, 0, 0));
    // const camera1 = new BABYLON.FreeCamera(
    //     "freeCamera",
    //     new BABYLON.Vector3(0, 0, -10),
    //     scene
    // );

    // camera1.attachControl(canvas, true);
    // camera1.lowerRadiusLimit = 8
    // camera1.upperRadiusLimit = 15

    var camera = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(0, 0, -10), scene);

    // Targets the camera to a particular position
    camera.setTarget(new BABYLON.Vector3(0, 0, 0));
    
    // Sets the sensitivity of the camera to movement and rotation
    camera.angularSensibility = 1;
    camera.moveSensibility = 1;
    
    // Attach the camera to the canvas
    camera.attachControl(canvas, true);




    const videoLayer = new BABYLON.Layer('videoLayer', null, scene, true);
    const videoTexture = BABYLON
        .VideoTexture
        .CreateFromWebCam(
            scene, (videoTexture) => {
                videoTexture._invertY = false;
                videoTexture
                videoLayer.texture = videoTexture;
            }, { maxWidth: canvas.width, maxHeight: canvas.height, facingMode: "environment" });

            
    // const xrHelper = await scene.createDefaultXRExperienceAsync({
    //     uiOptions: {
    //         sessionMode: "immersive-ar",
    //         referenceSpaceType: "local-floor"
    //     },
    //     optionalFeatures: true
    // });
    // if (!xrHelper.baseExperience) {
    //     // XR support is unavailable.
    //     console.log("WebXR support is unavailable");
    // } else {
    // //    // XR support is available; proceed.
    // //     const supported = await WebXRSessionManager.IsSessionSupportedAsync('immersive-vr');
    // //     if (supported) {
    // //     // xr available, session supported
    // //     const sessionManager = new WebXRSessionManager(scene);
    // //     const xrCamera = new WebXRCamera("freeCamera", scene, sessionManager);
    //     }

        return scene;
  
};





scene = createScene();
console.log(scene);
scene.then(function (returnedScene) {
    sceneToRender = returnedScene;
});

// Run render loop to render future frames.
engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
    }
});

// Handle browser resize.
// window.addEventListener("resize", function () {
//     engine.resize();
// });



